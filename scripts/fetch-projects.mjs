// Build-time GitHub project fetch. Runs via npm's `predev`/`prebuild` hooks
// (see package.json). No auth token required for public repo listing —
// GITHUB_TOKEN is read opportunistically to raise the rate limit if present.
//
// --mode=dev   : offline-first. Copies the committed snapshot straight to the
//                working file; only hits the network if no snapshot exists yet.
// --mode=build : always fetches live. On success, refreshes the committed
//                snapshot too. On failure, falls back to the existing snapshot
//                (build still succeeds, with a loud warning). Only fails the
//                build if there's no snapshot to fall back to.

import { readFileSync, writeFileSync, existsSync, mkdirSync, copyFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const DATA_DIR = path.join(ROOT, 'src', 'data')
const GENERATED_PATH = path.join(DATA_DIR, 'projects.generated.json')
const SNAPSHOT_PATH = path.join(DATA_DIR, 'projects.snapshot.json')

const GITHUB_USER = 'iMohammedArsh'
const PROJECT_COUNT_MAX = 6
const PROJECT_COUNT_MIN = 3

// This site's own repo (read from package.json's `name`) and GitHub's
// special profile-config repo never belong in the "projects" list.
const pkg = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf-8'))
const EXCLUDED_NAMES = new Set([GITHUB_USER.toLowerCase(), pkg.name.toLowerCase(), '.github'])

const mode = (process.argv.find((a) => a.startsWith('--mode=')) ?? '--mode=build').split('=')[1]

function titleCaseSlug(slug) {
  if (!/[-_]/.test(slug)) return slug[0].toUpperCase() + slug.slice(1)
  return slug
    .split(/[-_]/)
    .filter(Boolean)
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(' ')
}

function daysSince(isoDate) {
  return (Date.now() - new Date(isoDate).getTime()) / (1000 * 60 * 60 * 24)
}

function score(repo) {
  const recencyBonus = Math.max(0, 10 - daysSince(repo.pushed_at) / 6)
  return repo.stargazers_count * 5 + recencyBonus
}

function isLowSignal(repo) {
  const noDescription = !repo.description || !repo.description.trim()
  const noTopics = !repo.topics || repo.topics.length === 0
  const noStars = repo.stargazers_count === 0
  const stale = daysSince(repo.pushed_at) > 365
  return noDescription && noTopics && noStars && stale
}

function transform(repo) {
  let homepage = null
  if (repo.homepage && /^https?:\/\//.test(repo.homepage.trim())) {
    homepage = repo.homepage.trim()
  }
  return {
    id: repo.id,
    name: titleCaseSlug(repo.name),
    slug: repo.name,
    description: repo.description?.trim() || 'No description provided — see the repo for details.',
    url: repo.html_url,
    homepage,
    language: repo.language ?? null,
    topics: (repo.topics ?? []).slice(0, 4),
    stars: repo.stargazers_count,
    updatedAt: repo.pushed_at,
  }
}

async function fetchLive() {
  if (typeof fetch !== 'function') {
    throw new Error('Global fetch is unavailable — Node 18+ is required to run this script.')
  }

  const headers = {
    'User-Agent': 'portfolio-build-script',
    Accept: 'application/vnd.github+json',
  }
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`
  }

  const res = await fetch(
    `https://api.github.com/users/${GITHUB_USER}/repos?type=owner&sort=pushed&per_page=100`,
    { headers },
  )
  if (!res.ok) {
    throw new Error(`GitHub API responded ${res.status} ${res.statusText}`)
  }
  const repos = await res.json()

  const filtered = []
  const dropped = []
  for (const repo of repos) {
    if (repo.fork || repo.archived) continue
    if (EXCLUDED_NAMES.has(repo.name.toLowerCase())) continue
    if (isLowSignal(repo)) {
      dropped.push(repo.name)
      continue
    }
    filtered.push(repo)
  }
  if (dropped.length) {
    console.log(`[fetch-projects] filtered out ${dropped.length} low-signal repo(s): ${dropped.join(', ')}`)
  }

  const ranked = filtered.sort((a, b) => {
    const diff = score(b) - score(a)
    if (diff !== 0) return diff
    return new Date(b.pushed_at) - new Date(a.pushed_at)
  })

  const count = Math.min(PROJECT_COUNT_MAX, Math.max(PROJECT_COUNT_MIN, ranked.length))
  return ranked.slice(0, count).map(transform)
}

function ensureDataDir() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true })
}

function useSnapshotFallback(reasonPrefix) {
  if (!existsSync(SNAPSHOT_PATH)) {
    console.error(`[fetch-projects] ${reasonPrefix} and no snapshot exists at ${SNAPSHOT_PATH} — failing.`)
    process.exit(1)
  }
  ensureDataDir()
  copyFileSync(SNAPSHOT_PATH, GENERATED_PATH)
  console.warn(`[fetch-projects] ${reasonPrefix} — using existing snapshot instead.`)
}

async function main() {
  ensureDataDir()

  if (mode === 'dev') {
    if (existsSync(SNAPSHOT_PATH)) {
      copyFileSync(SNAPSHOT_PATH, GENERATED_PATH)
      console.log('[fetch-projects] dev mode — used committed snapshot, no network call.')
      return
    }
    console.log('[fetch-projects] dev mode — no snapshot yet, fetching once from GitHub...')
  }

  try {
    const projects = await fetchLive()
    const json = JSON.stringify(projects, null, 2) + '\n'
    writeFileSync(GENERATED_PATH, json)
    writeFileSync(SNAPSHOT_PATH, json)
    console.log(`[fetch-projects] wrote ${projects.length} project(s) from live GitHub data.`)
  } catch (err) {
    useSnapshotFallback(`live fetch failed (${err.message})`)
  }
}

main()
