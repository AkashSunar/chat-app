export type QueryPayload = {
  query: string;
  collections?: string[];
  top_k?: number;
  temperature?: number;
  role?: string;
  id: string;
};
export type QueryResponse = {
  query: string;
  response: string;
  collections_searched: string[];
  response_id: string;
};
