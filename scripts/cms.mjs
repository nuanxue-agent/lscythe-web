#!/usr/bin/env node
/**
 * lscythe cms — file-based content management cli
 * usage:
 *   node scripts/cms.mjs new post "my post title"
 *   node scripts/cms.mjs new project "my project name"
 *   node scripts/cms.mjs list posts
 *   node scripts/cms.mjs list projects
 *   node scripts/cms.mjs publish <slug>
 *   node scripts/cms.mjs unpublish <slug>
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const contentDir = path.join(root, 'content')

// ── colours ──────────────────────────────────────────────────────────────────
const c = {
  bone:  '\x1b[38;2;238;233;220m',
  ink:   '\x1b[38;2;24;24;21m',
  red:   '\x1b[38;2;166;46;36m',
  blue:  '\x1b[38;2;23;69;138m',
  ochre: '\x1b[38;2;213;165;20m',
  reset: '\x1b[0m',
  bold:  '\x1b[1m',
  dim:   '\x1b[2m',
}

function print(msg) { process.stdout.write(msg + '\n') }
function ok(msg)    { print(`${c.blue}✓${c.reset} ${msg}`) }
function err(msg)   { print(`${c.red}✗${c.reset} ${msg}`); process.exit(1) }
function label(msg) { print(`\n${c.bold}${c.ochre}${msg}${c.reset}`) }
function dim(msg)   { print(`${c.dim}${msg}${c.reset}`) }

// ── helpers ───────────────────────────────────────────────────────────────────
function slugify(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function today() {
  return new Date().toISOString().split('T')[0]
}

function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function readFrontmatter(filepath) {
  const raw = fs.readFileSync(filepath, 'utf8')
  const match = raw.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return {}
  const fm = {}
  for (const line of match[1].split('\n')) {
    const [key, ...rest] = line.split(':')
    if (key && rest.length) fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '')
  }
  return fm
}

// ── templates ─────────────────────────────────────────────────────────────────
function postTemplate(title, slug) {
  return `---
title: ${title}
date: ${today()}
description: 
tags: []
draft: true
---

write your post here.

## section heading

paragraph text.
`
}

function projectTemplate(title, slug) {
  return `---
title: ${title}
description: 
longDescription: 
tags: []
repo: 
url: 
status: active
year: "${new Date().getFullYear()}"
featured: false
---

## the problem

describe the problem this project solves.

## how it works

describe the solution.

## technical decisions

explain the key technical choices.
`
}

// ── commands ──────────────────────────────────────────────────────────────────
function cmdNew(type, title) {
  if (!title) err(`title required: cms new ${type} "my title"`)

  const slug = slugify(title)
  let dir, template, filepath

  if (type === 'post') {
    dir = path.join(contentDir, 'blog')
    template = postTemplate(title, slug)
    filepath = path.join(dir, `${slug}.md`)
  } else if (type === 'project') {
    dir = path.join(contentDir, 'projects')
    template = projectTemplate(title, slug)
    filepath = path.join(dir, `${slug}.md`)
  } else {
    err(`unknown type "${type}". use: post | project`)
  }

  ensureDir(dir)

  if (fs.existsSync(filepath)) {
    err(`already exists: content/${type === 'post' ? 'blog' : 'projects'}/${slug}.md`)
  }

  fs.writeFileSync(filepath, template)
  ok(`created ${c.bold}content/${type === 'post' ? 'blog' : 'projects'}/${slug}.md${c.reset}`)
  dim(`  edit the file, then run: node scripts/cms.mjs publish ${slug}`)
}

function cmdList(type) {
  if (type === 'posts' || type === 'post') {
    const dir = path.join(contentDir, 'blog')
    ensureDir(dir)
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
    if (!files.length) { dim('  no posts yet'); return }

    label('blog posts')
    for (const file of files) {
      const fm = readFrontmatter(path.join(dir, file))
      const slug = file.replace('.md', '')
      const status = fm.draft === 'true' || fm.draft === true
        ? `${c.ochre}draft${c.reset}`
        : `${c.blue}published${c.reset}`
      print(`  ${c.bold}${slug}${c.reset}  ${status}  ${c.dim}${fm.date || ''}${c.reset}`)
      if (fm.title) print(`    ${fm.title}`)
    }
  } else if (type === 'projects' || type === 'project') {
    const dir = path.join(contentDir, 'projects')
    ensureDir(dir)
    const files = fs.readdirSync(dir).filter(f => f.endsWith('.md'))
    if (!files.length) { dim('  no projects yet'); return }

    label('projects')
    for (const file of files) {
      const fm = readFrontmatter(path.join(dir, file))
      const slug = file.replace('.md', '')
      const featured = fm.featured === 'true' ? `${c.ochre}★ featured${c.reset}` : ''
      const status = fm.status ? `${c.dim}[${fm.status}]${c.reset}` : ''
      print(`  ${c.bold}${slug}${c.reset}  ${status} ${featured}  ${c.dim}${fm.year || ''}${c.reset}`)
      if (fm.title) print(`    ${fm.title}`)
    }
  } else {
    err(`unknown type "${type}". use: posts | projects`)
  }
}

function cmdPublish(slug) {
  if (!slug) err('slug required: cms publish <slug>')

  // search both dirs
  const postPath    = path.join(contentDir, 'blog', `${slug}.md`)
  const projectPath = path.join(contentDir, 'projects', `${slug}.md`)

  let filepath
  if (fs.existsSync(postPath)) filepath = postPath
  else if (fs.existsSync(projectPath)) filepath = projectPath
  else err(`not found: ${slug}`)

  let raw = fs.readFileSync(filepath, 'utf8')
  if (!raw.includes('draft: true')) {
    ok(`${slug} is already published`)
    return
  }
  raw = raw.replace('draft: true', 'draft: false')
  fs.writeFileSync(filepath, raw)
  ok(`published ${c.bold}${slug}${c.reset}`)
}

function cmdUnpublish(slug) {
  if (!slug) err('slug required: cms unpublish <slug>')

  const postPath    = path.join(contentDir, 'blog', `${slug}.md`)
  const projectPath = path.join(contentDir, 'projects', `${slug}.md`)

  let filepath
  if (fs.existsSync(postPath)) filepath = postPath
  else if (fs.existsSync(projectPath)) filepath = projectPath
  else err(`not found: ${slug}`)

  let raw = fs.readFileSync(filepath, 'utf8')
  if (raw.includes('draft: true')) {
    ok(`${slug} is already a draft`)
    return
  }
  raw = raw.replace('draft: false', 'draft: true')
  fs.writeFileSync(filepath, raw)
  ok(`unpublished ${c.bold}${slug}${c.reset} — set to draft`)
}

function cmdHelp() {
  label('lscythe cms')
  print('')
  print(`  ${c.bold}new${c.reset}        create a new post or project`)
  print(`    ${c.dim}node scripts/cms.mjs new post "my post title"${c.reset}`)
  print(`    ${c.dim}node scripts/cms.mjs new project "my project"${c.reset}`)
  print('')
  print(`  ${c.bold}list${c.reset}       list all posts or projects`)
  print(`    ${c.dim}node scripts/cms.mjs list posts${c.reset}`)
  print(`    ${c.dim}node scripts/cms.mjs list projects${c.reset}`)
  print('')
  print(`  ${c.bold}publish${c.reset}    mark a draft as published`)
  print(`    ${c.dim}node scripts/cms.mjs publish <slug>${c.reset}`)
  print('')
  print(`  ${c.bold}unpublish${c.reset}  revert a post to draft`)
  print(`    ${c.dim}node scripts/cms.mjs unpublish <slug>${c.reset}`)
  print('')
}

// ── router ────────────────────────────────────────────────────────────────────
const [,, cmd, ...args] = process.argv

switch (cmd) {
  case 'new':       cmdNew(args[0], args.slice(1).join(' ')); break
  case 'list':      cmdList(args[0]); break
  case 'publish':   cmdPublish(args[0]); break
  case 'unpublish': cmdUnpublish(args[0]); break
  case 'help':
  case '--help':
  case '-h':
  case undefined:   cmdHelp(); break
  default:          err(`unknown command "${cmd}". run: node scripts/cms.mjs --help`)
}
