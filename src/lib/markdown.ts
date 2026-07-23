export function markdownToHtml(markdown: string): string {
  // 1. normalize line endings
  let text = markdown.replace(/\r\n/g, '\n').trim()

  // 2. fenced code blocks (must go first, before any inline processing)
  text = text.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    const cls = lang ? ` class="language-${lang}"` : ''
    return `<pre><code${cls}>${escaped}</code></pre>`
  })

  // 3. split into blocks (double newline = block boundary, but preserve <pre> blocks)
  const blocks = splitBlocks(text)

  const html = blocks.map(block => {
    block = block.trim()
    if (!block) return ''

    // already an HTML block (pre, etc.)
    if (block.startsWith('<pre')) return block

    // headings
    if (/^#{1,6} /.test(block)) {
      return block.replace(/^(#{1,6}) (.+)$/gm, (_, hashes, content) => {
        const level = hashes.length
        return `<h${level}>${inlineMarkdown(content)}</h${level}>`
      })
    }

    // unordered list
    if (/^[-*+] /.test(block)) {
      const items = block
        .split('\n')
        .filter(l => /^[-*+] /.test(l))
        .map(l => `<li>${inlineMarkdown(l.replace(/^[-*+] /, ''))}</li>`)
        .join('')
      return `<ul>${items}</ul>`
    }

    // ordered list
    if (/^\d+\. /.test(block)) {
      const items = block
        .split('\n')
        .filter(l => /^\d+\. /.test(l))
        .map(l => `<li>${inlineMarkdown(l.replace(/^\d+\. /, ''))}</li>`)
        .join('')
      return `<ol>${items}</ol>`
    }

    // blockquote
    if (/^> /.test(block)) {
      const inner = block
        .split('\n')
        .map(l => l.replace(/^> ?/, ''))
        .join('\n')
      return `<blockquote>${inlineMarkdown(inner)}</blockquote>`
    }

    // horizontal rule
    if (/^(-{3,}|\*{3,}|_{3,})$/.test(block)) {
      return '<hr>'
    }

    // paragraph
    const lines = block.split('\n').map(l => inlineMarkdown(l)).join('<br>')
    return `<p>${lines}</p>`
  })

  return html.filter(Boolean).join('\n')
}

function inlineMarkdown(text: string): string {
  return text
    // bold + italic
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/_(.+?)_/g, '<em>$1</em>')
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // links with title
    .replace(/\[([^\]]+)\]\(([^)]+)\s+"([^"]+)"\)/g, '<a href="$2" title="$3">$1</a>')
    // links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // strikethrough
    .replace(/~~(.+?)~~/g, '<del>$1</del>')
}

// Split text into blocks, preserving <pre> blocks from being split
function splitBlocks(text: string): string[] {
  const blocks: string[] = []
  const preRegex = /(<pre[\s\S]*?<\/pre>)/g
  const parts = text.split(preRegex)

  for (const part of parts) {
    if (part.startsWith('<pre')) {
      blocks.push(part)
    } else {
      blocks.push(...part.split(/\n\n+/))
    }
  }

  return blocks
}
