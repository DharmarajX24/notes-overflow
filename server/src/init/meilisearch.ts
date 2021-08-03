import {MeiliSearch} from "meilisearch"

const meilisearch = new MeiliSearch({
  host: "http://127.0.0.1",
  apiKey: process.env.MEILISEARCH_API_KEY
})

export default meilisearch

