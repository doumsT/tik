'use client';
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

type Account = {
  id: string; handle: string; connected: boolean; privacy: "public"|"friends"|"private";
  allowComments: boolean; allowDuet: boolean; allowStitch: boolean;
};

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [newHandle, setNewHandle] = useState("");

  const load = async () => {
    const r = await fetch('/api/mock/accounts', { cache: 'no-store' });
    const data = await r.json();
    setAccounts(data.accounts || []);
  };
  useEffect(() => { load(); }, []);

  const add = async () => {
    const r = await fetch('/api/mock/accounts', { method: 'POST', body: JSON.stringify({ handle: newHandle }) });
    if (r.ok) { setNewHandle(""); await load(); }
  };
  const del = async (id: string) => {
    await fetch('/api/mock/accounts?id='+id, { method: 'DELETE' }); await load();
  };
  const update = async (acc: Account, patch: Partial<Account>) => {
    await fetch('/api/mock/accounts', { method: 'PATCH', body: JSON.stringify({ id: acc.id, ...patch }) });
    await load();
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>Connecter un compte (démo)</CardTitle></CardHeader>
        <CardContent className="flex flex-col gap-3 md:flex-row md:items-end">
          <div className="flex-1">
            <label className="mb-1 block text-sm font-medium">Handle TikTok</label>
            <Input value={newHandle} onChange={e=>setNewHandle(e.target.value)} placeholder="@moncompte" />
          </div>
          <Button onClick={add}>Ajouter</Button>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map(acc => (
          <Card key={acc.id}>
            <CardHeader><CardTitle>{acc.handle}</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-36">Confidentialité</span>
                <select
                  className="rounded-2xl border border-gray-200 bg-white px-3 py-2 text-sm"
                  value={acc.privacy}
                  onChange={(e)=>update(acc, { privacy: e.target.value as any })}
                >
                  <option value="public">Public</option>
                  <option value="friends">Amis</option>
                  <option value="private">Privé</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-36">Commentaires</span>
                <Checkbox checked={acc.allowComments} onChange={(v)=>update(acc,{allowComments:v})} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-36">Duet</span>
                <Checkbox checked={acc.allowDuet} onChange={(v)=>update(acc,{allowDuet:v})} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-500 w-36">Stitch</span>
                <Checkbox checked={acc.allowStitch} onChange={(v)=>update(acc,{allowStitch:v})} />
              </div>
              <div className="pt-2">
                <Button className="bg-red-600 hover:opacity-90" onClick={()=>del(acc.id)}>Supprimer</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
