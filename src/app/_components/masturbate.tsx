"use client";

import { useState } from "react";

import { api } from "~/trpc/react";

export function LatestPost() {
  const [latestMasturbate] = api.masturbate.getAll.useSuspenseQuery();

  const utils = api.useUtils();
  const [name, setName] = useState("");
  const createMasturbate = api.masturbate.create.useMutation({
    onSuccess: async () => {
      await utils.masturbate.invalidate();
      setName("");
    },
  });

  return (
    <div className="w-full max-w-xs">
      {latestMasturbate ? (
        <p className="truncate">
          Your most recent post: {latestMasturbate.userId}
        </p>
      ) : (
        <p>You have no posts yet.</p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createMasturbate.mutate({ name });
        }}
        className="flex flex-col gap-2"
      >
        <input
          type="text"
          placeholder="Title"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-full px-4 py-2 text-black"
        />
        <button
          type="submit"
          className="rounded-full bg-white/10 px-10 py-3 font-semibold transition hover:bg-white/20"
          disabled={createMasturbate.isPending}
        >
          {createMasturbate.isPending ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
