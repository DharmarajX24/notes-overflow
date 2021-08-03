import { MeiliSearch } from 'meilisearch'

export const client = new MeiliSearch({
  host: 'http://127.0.0.1:7700',
  apiKey: process.env.MEILIKEY,
})