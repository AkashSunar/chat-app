import { useAskQuestion } from "@/hooks/chatQuery";
import supabase from "@/utils/supabase/client";
import { useState } from "react";

export const useChat = () => {
  const [newQuery, setNewQuery] = useState("");
  const [username, setUsername] = useState("");
  const { mutate: askQuery, isPending } = useAskQuestion();

  const handleSubmit = async () => {
    if (!newQuery.trim()) return;
    const { data, error } = await supabase
      .from("messages")
      .insert({
        userId: "657e828e-c1cd-4d72-af0f-7000e1f588fb",
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
    username,
    setUsername,
    isPending,
  };
};
