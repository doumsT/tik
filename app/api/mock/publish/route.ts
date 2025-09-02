import db, { Job } from "@/lib/mockdb";

export async function POST(req: Request) {
  const body = await req.json();
  const { accountIds, caption, mediaUrl, scheduleAt } = body || {};
  if (!Array.isArray(accountIds) || accountIds.length === 0) {
    return new Response(JSON.stringify({ error: "Sélectionne au moins un compte." }), { status: 400 });
  }
  if (!mediaUrl || typeof mediaUrl !== "string") {
    return new Response(JSON.stringify({ error: "Media URL manquant." }), { status: 400 });
  }
  const now = Date.now();
  const id = "job_" + Math.random().toString(36).slice(2, 10);
  const job: Job = {
    id,
    createdAt: now,
    scheduleAt: scheduleAt ? Number(scheduleAt) : null,
    status: "queued",
    accounts: accountIds,
    caption: caption || "",
    mediaUrl,
    logs: [
      `Job créé pour ${accountIds.length} compte(s).`,
      scheduleAt ? `Planifié pour ${new Date(Number(scheduleAt)).toLocaleString()}` : "Publication immédiate."
    ],
  };
  db.jobs.push(job);
  return Response.json({ job });
}
