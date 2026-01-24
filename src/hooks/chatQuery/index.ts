import api from "@/utils/axiosInstance";
import supabase from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
import { QueryPayload, QueryResponse } from "./types";

const postQueryCollection = async (
  payload: QueryPayload,
): Promise<QueryResponse> => {
  const response = await api.post("/query/query_collection", { ...payload });
  if (response.status === 200) {
    await supabase
      .from("messages")
      .insert({
        userId: "657e828e-c1cd-4d72-af0f-7000e1f588fb",
        content: response?.data.response,
      })
      // .eq("id", payload.id)
      .select();
  }
  return response.data;
};

export const useAskQuestion = () => {
  return useMutation<QueryResponse, Error, { payload: QueryPayload }>({
    mutationFn: ({ payload }) => postQueryCollection(payload),
  });
};
