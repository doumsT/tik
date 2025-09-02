import db, { Account, Privacy } from "@/lib/mockdb";

export async function GET() {
  return Response.json({ accounts: db.accounts });
}

export async function POST(req: Request) {
  const body = await req.json();
  const handle = (body?.handle || "").toString().trim();
  if (!/^@?\w{2,}$/.test(handle)) {
    return new Response(JSON.stringify({ error: "handle invalide" }), { status: 400 });
  }
  const id = "acc_" + Math.random().toString(36).slice(2, 10);
  const account: Account = {
    id, handle: handle.startsWith("@") ? handle : "@"+handle,
    connected: true,
    avatarUrl: "",
    privacy: "public",
    allowComments: true,
    allowDuet: false,
    allowStitch: false,
  };
  db.accounts.push(account);
  return Response.json({ account });
}

export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const idx = db.accounts.findIndex(a => a.id === id);
  if (idx === -1) return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  db.accounts.splice(idx, 1);
  return Response.json({ ok: true });
}

export async function PATCH(req: Request) {
  const body = await req.json();
  const a = db.accounts.find(x => x.id === body?.id);
  if (!a) return new Response(JSON.stringify({ error: "not found" }), { status: 404 });
  if (body.privacy) a.privacy = body.privacy as Privacy;
  if (typeof body.allowComments === "boolean") a.allowComments = body.allowComments;
  if (typeof body.allowDuet === "boolean") a.allowDuet = body.allowDuet;
  if (typeof body.allowStitch === "boolean") a.allowStitch = body.allowStitch;
  return Response.json({ account: a });
}
