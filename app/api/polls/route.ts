import { getPolls } from "@/lib/polls";

export async function GET() {
    try {
        const polls = await getPolls();
        return Response.json({ polls });
    } catch (error) {
        return Response.json(
            {
                error:
                    error instanceof Error ? error.message : "Unknown error",
            },
            { status: 500 }
        );
    }
}