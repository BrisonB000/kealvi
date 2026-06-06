import { supabase } from "@/lib/supabase";

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id: optionId } = await params;
    const { voterId } = await req.json();

    const { error } = await supabase
        .from("poll_votes")
        .insert({
            option_id: optionId,
            voter_id: voterId,
        });

    if (error) {
        if (error.code === "23505") {
            return Response.json(
                { error: "already voted" },
                { status: 409 }
            );
        }

        return Response.json(
            { error: error.message },
            { status: 500 }
        );
    }

    return Response.json({ ok: true });
}