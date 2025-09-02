import db, { advanceJobs } from "@/lib/mockdb";

export async function GET() {
  advanceJobs();
  return Response.json({ jobs: db.jobs.slice().reverse() });
}
