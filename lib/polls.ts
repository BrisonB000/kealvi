import { supabase } from "@/lib/supabase";

export async function getPolls() {
    const { data: polls, error } = await supabase
        .from("polls")
        .select(`
      id,
      question,
      poll_options (
        id,
        option_text,
        poll_votes(count)
      )
    `);

    if (error) throw new Error(error.message);

    return polls ?? [];
}