#!/usr/bin/env node
/**
 * deploy.mjs — build and deploy to Cloudflare Pages
 * usage: node scripts/deploy.mjs
 */

import { execSync } from 'child_process'

const c = {
  blue:  '\x1b[38;2;23;69;138m',
  ochre: '\x1b[38;2;213;165;20m',
  red:   '\x1b[38;2;166;46;36m',
  reset: '\x1b[0m',
  bold:  '\x1b[1m',
  dim:   '\x1b[2m',
}

function run(cmd, label) {
  process.stdout.write(`${c.ochre}→${c.reset} ${label}\n`)
  execSync(cmd, { stdio: 'inherit' })
}

function ok(msg) { process.stdout.write(`${c.blue}✓${c.reset} ${msg}\n`) }

try {
  run('npm run build', 'building static site')
  ok('build complete')

  run('npx wrangler pages deploy out/ --project-name lscythe-web --commit-dirty=true', 'deploying to cloudflare pages')
  ok('deployed → https://lscythe-web.pages.dev')
} catch (e) {
  process.stdout.write(`\n${c.red}✗${c.reset} deploy failed\n`)
  process.exit(1)
}
