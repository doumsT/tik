export type Privacy = "public" | "friends" | "private";
export type Account = {
  id: string;
  handle: string;
  avatarUrl?: string;
  connected: boolean;
  privacy: Privacy;
  allowComments: boolean;
  allowDuet: boolean;
  allowStitch: boolean;
};
export type JobStatus = "queued" | "uploading" | "publishing" | "succeeded" | "failed" | "throttled";
export type Job = {
  id: string;
  createdAt: number;
  scheduleAt?: number | null;
  status: JobStatus;
  accounts: string[];
  caption: string;
  mediaUrl: string;
  logs: string[];
};

const db = {
  accounts: [] as Account[],
  jobs: [] as Job[],
};

// Seed with a couple of demo accounts
if (db.accounts.length === 0) {
  db.accounts.push(
    { id: "acc_1", handle: "@marie", connected: true, privacy: "public", allowComments: true, allowDuet: false, allowStitch: false, avatarUrl: "" },
    { id: "acc_2", handle: "@paul", connected: true, privacy: "friends", allowComments: true, allowDuet: true, allowStitch: false, avatarUrl: "" },
  );
}

export default db;

// Simple progressive status engine based on elapsed time
export function advanceJobs() {
  const now = Date.now();
  for (const job of db.jobs) {
    const elapsed = now - job.createdAt;
    if (job.scheduleAt && now < job.scheduleAt) {
      job.status = "queued";
      continue;
    }
    if (elapsed < 2000) job.status = "queued";
    else if (elapsed < 5000) job.status = "uploading";
    else if (elapsed < 9000) job.status = "publishing";
    else if (elapsed < 12000) job.status = "succeeded";
    // keep succeeded afterwards
  }
}
