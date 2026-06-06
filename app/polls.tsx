"use client";

import { useEffect, useState } from "react";
import { getVoterId } from "@/lib/voter";

type PollOption = {
    id: string;
    option_text: string;
    poll_votes: { count: number }[];
};

type Poll = {
    id: string;
    question: string;
    poll_options: PollOption[];
};

export default function Polls() {
    const [polls, setPolls] = useState<Poll[]>([]);

    useEffect(() => {
        fetch("/api/polls")
            .then((r) => r.json())
            .then((data) => setPolls(data.polls ?? []));
    }, []);

    async function vote(optionId: string) {
        await fetch(`/api/polls/${optionId}/vote`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                voterId: getVoterId(),
            }),
        });

        const res = await fetch("/api/polls");
        const data = await res.json();
        setPolls(data.polls ?? []);
    }

    return (
        <div className="mb-8 rounded-lg border p-4">
            <h2 className="mb-4 text-xl font-semibold">Active Polls</h2>

            {polls.map((poll) => (
                <div key={poll.id} className="mb-6">
                    <p className="mb-3 font-medium">{poll.question}</p>

                    {poll.poll_options.map((option) => (
                        <button
                            key={option.id}
                            onClick={() => vote(option.id)}
                            className="mb-2 block w-full rounded border p-2 text-left"
                        >
                            {option.option_text} (
                            {option.poll_votes?.[0]?.count ?? 0} votes)
                        </button>
                    ))}
                </div>
            ))}
        </div>
    );
}