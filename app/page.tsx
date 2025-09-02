'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type Job = {
  id: string; status: string; caption: string; mediaUrl: string;
  accounts: string[]; createdAt: number; scheduleAt?: number | null; logs: string[];
};

export default function Page() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const refresh = async () => {
    const r = await fetch('/api/mock/jobs', { cache: 'no-store' });
    const data = await r.json();
    setJobs(data.jobs || []);
  };
  useEffect(() => {
    refresh();
    const t = setInterval(refresh, 1500);
    return () => clearInterval(t);
  }, []);

  const statusColor = (s: string) => ({
    queued: "bg-gray-200 text-gray-700",
    uploading: "bg-blue-100 text-blue-900",
    publishing: "bg-yellow-100 text-yellow-900",
    succeeded: "bg-green-100 text-green-900",
    failed: "bg-red-100 text-red-900",
    throttled: "bg-orange-100 text-orange-900",
  } as any)[s] || "bg-gray-100";

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card><CardHeader><CardTitle>Derniers jobs</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{jobs.length}</div>
            <div className="text-sm text-gray-500">Total (session)</div>
          </CardContent></Card>
        <Card><CardHeader><CardTitle>Succès</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{jobs.filter(j=>j.status==='succeeded').length}</div>
            <div className="text-sm text-gray-500">Publications réussies</div>
          </CardContent></Card>
        <Card><CardHeader><CardTitle>En cours</CardTitle></CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{jobs.filter(j=>['queued','uploading','publishing'].includes(j.status)).length}</div>
            <div className="text-sm text-gray-500">File d'attente + traitement</div>
          </CardContent></Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Historique des publications</CardTitle></CardHeader>
        <CardContent>
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm text-gray-500">Actualisé automatiquement</div>
            <Button onClick={refresh}>Rafraîchir</Button>
          </div>
          <div className="space-y-3">
            {jobs.map(job => (
              <div key={job.id} className="rounded-2xl border border-gray-200 p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={"rounded-full px-3 py-1 text-xs " + statusColor(job.status)}>
                      {job.status}
                    </div>
                    <div className="text-sm text-gray-500">{new Date(job.createdAt).toLocaleString()}</div>
                    {job.scheduleAt && <div className="text-xs text-gray-500">· planifié {new Date(job.scheduleAt).toLocaleString()}</div>}
                  </div>
                  <div className="text-xs text-gray-500">{job.accounts.length} compte(s)</div>
                </div>
                <div className="mt-2 text-sm">
                  <div className="font-medium">Caption</div>
                  <div className="text-gray-700">{job.caption || <span className="italic text-gray-400">—</span>}</div>
                </div>
                <div className="mt-2 text-xs text-gray-500 break-all">Media: {job.mediaUrl}</div>
                {job.logs?.length > 0 && (
                  <ul className="mt-2 list-disc pl-5 text-xs text-gray-500">
                    {job.logs.map((l, i) => <li key={i}>{l}</li>)}
                  </ul>
                )}
              </div>
            ))}
            {jobs.length === 0 && <div className="text-sm text-gray-500">Aucun job pour l'instant.</div>}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
