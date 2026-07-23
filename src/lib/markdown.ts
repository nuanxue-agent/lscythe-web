export function markdownToHtml(markdown: string): string {
  return markdown
    // headings
    .replace(/^### (.+)$/gm, '<h3>$1</h3>')
    .replace(/^## (.+)$/gm, '<h2>$1</h2>')
    .replace(/^# (.+)$/gm, '<h1>$1</h1>')
    // bold
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // italic
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // inline code
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // code blocks
    .replace(/```[\w]*\n([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
    // paragraphs - wrap lines that aren't already HTML tags
    .split('\n\n')
    .map(block => {
      block = block.trim()
      if (!block) return ''
      if (block.startsWith('<')) return block
      return `<p>${block.replace(/\n/g, '<br>')}</p>`
    })
    .join('\n')
}
