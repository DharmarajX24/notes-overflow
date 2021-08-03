import meilisearch from "../init/meilisearch";

interface ImageDoc {
  id: string,
  name: string,
  text: string,
  user_id: string,
  added_at: number
}

interface QueryPayload {
  query: string,
  user_id: string,
  offset: number
}

export default class MeilisearchDAO {
  static addDocuments = async (docs: Array<ImageDoc>) => {
    return meilisearch.index("images").addDocuments(docs)
  }

  static queryDocuments = async ({query, user_id, offset}: QueryPayload) => {
    return meilisearch.index("images").search(query, {
      facetFilters: [`user_id:${user_id}`],
      offset: offset * 20
    })
  }
}
