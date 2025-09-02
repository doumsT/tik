'use client';
import { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

type Account = {
  id: string; handle: string; connected: boolean; privacy: "public"|"friends"|"private";
  allowComments: boolean; allowDuet: boolean; allowStitch: boolean;
};

export default function SchedulePage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selected, setSelected] = useState<Record<string, boolean>>({});
  const [caption, setCaption] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [scheduleAt, setScheduleAt] = useState<string>("");

  const load = async () => {
    const r = await fetch('/api/mock/accounts', { cache: 'no-store' });
    const data = await r.json();
    setAccounts(data.accounts || []);
  };
  useEffect(() => { load(); }, []);

  const allSelected = useMemo(()=>accounts.length>0 && accounts.every(a => selected[a.id]), [accounts, selected]);
  const toggleAll = (v: boolean) => {
    const s: Record<string, boolean> = {};
    for (const a of accounts) s[a.id] = v;
    setSelected(s);
  };

  const publish = async () => {
    const accountIds = Object.entries(selected).filter(([,v])=>v).map(([k])=>k);
    const payload: any = { accountIds, caption, mediaUrl };
    if (scheduleAt) payload.scheduleAt = new Date(scheduleAt).getTime();
    const r = await fetch('/api/mock/publish', { method: 'POST', body: JSON.stringify(payload) });
    if (r.ok) {
      setCaption(""); setMediaUrl(""); setScheduleAt(""); setSelected({});
      alert("Créé ! Va voir le Dashboard.");
    } else {
      const j = await r.json(); alert(j?.error || "Erreur");
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader><CardTitle>Paramètres du post</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Légende</label>
            <Textarea value={caption} onChange={e=>setCaption(e.target.value)} rows={4} placeholder="Votre texte, hashtags, mentions…" />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Media URL (MP4 / MOV / Image)</label>
            <Input value={mediaUrl} onChange={e=>setMediaUrl(e.target.value)} placeholder="https://exemple.com/video.mp4" />
            <div className="mt-1 text-xs text-gray-500">Démo : on simule un PULL_FROM_URL. (Pas d'upload local dans ce mock.)</div>
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Planifier (optionnel)</label>
            <Input type="datetime-local" value={scheduleAt} onChange={e=>setScheduleAt(e.target.value)} />
          </div>
          <Button onClick={publish}>Créer le job</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Choisir les comptes</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox checked={allSelected} onChange={toggleAll} />
            <span className="text-sm">Tout sélectionner</span>
          </div>
          <div className="divide-y rounded-2xl border">
            {accounts.map(a => (
              <label key={a.id} className="flex cursor-pointer items-center justify-between gap-3 p-3">
                <div className="flex items-center gap-3">
                  <Checkbox checked={!!selected[a.id]} onChange={(v)=>setSelected({...selected, [a.id]: v})} />
                  <div className="text-sm font-medium">{a.handle}</div>
                </div>
                <div className="text-xs text-gray-500">{a.privacy}</div>
              </label>
            ))}
            {accounts.length===0 && <div className="p-3 text-sm text-gray-500">Aucun compte connecté.</div>}
          </div>
          <div className="text-xs text-gray-500">Les options (commentaires/duet/stitch) se règlent par compte dans l’onglet Comptes.</div>
        </CardContent>
      </Card>
    </div>
  );
}
