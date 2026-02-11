import { useAskQuestion } from "@/hooks/chatQuery";
import { useAuth } from "@/hooks/useAuth";
import supabase from "@/utils/supabase/client";
import { useState } from "react";

export const useChat = () => {
  const [newQuery, setNewQuery] = useState("");
  const { mutate: askQuery, isPending } = useAskQuestion();
  const { user } = useAuth();
  const handleSubmit = async () => {
    if (!newQuery.trim()) return;
    const { data, error } = await supabase
      .from("messages")
      .insert({
        userId: user?.id,
        content: newQuery,
      })
      .select();
    if (error) {
      console.error("Error sending query:", error);
    }
    // const userMessage = {
    //   query: newQuery,
    //   top_k: 3,
    //   temperature: 0.3,
    //   id: data ? data[0].id : "",
    // };
    setNewQuery("");
    // askQuery({
    //   payload: userMessage,
    // });
  };
  return {
    handleSubmit,
    newQuery,
    setNewQuery,
    isPending,
  };
};
