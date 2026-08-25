export interface ProjectData {
  id: number
  /** Display name, title-cased from the repo slug when the slug isn't already readable. */
  name: string
  /** Raw repo name, used to build/verify the URL. */
  slug: string
  description: string
  url: string
  homepage: string | null
  language: string | null
  /** Capped to 4. */
  topics: string[]
  stars: number
  /** ISO timestamp of the last push. */
  updatedAt: string
}
