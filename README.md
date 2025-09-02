# MultiPoster · TikTok (démo)

Un mini-SaaS Next.js (App Router) pour **planifier et publier (mock)** sur plusieurs comptes TikTok en même temps.

> ⚠️ Cette démo n'appelle pas l'API TikTok. Le backend est **mocké** pour simuler la file de jobs. Vous pouvez l'utiliser comme base UI, puis brancher l'API officielle (Direct Post / Upload) dans `app/api` et `lib/`.

## Lancer en local

```bash
pnpm install   # ou npm install / yarn
pnpm dev       # http://localhost:3000
```

## Dossiers clés
- `app/` : pages (Dashboard, Comptes, Planifier) + API routes mock.
- `components/` : UI (Sidebar, Topbar, composants).
- `lib/mockdb.ts` : pseudo base de données en mémoire + progression des statuts.
- `app/api/mock/*` : endpoints simulés (comptes, publish, jobs).

## Pour connecter la vraie API TikTok (pistes)
- Créez `lib/tiktok.ts` avec les appels OAuth et endpoints `post.publish.*` (Direct Post) ou `inbox.video.*` (Upload en brouillon).
- Remplacez `app/api/mock/*` par de vraies routes (ex: `app/api/tiktok/publish/route.ts`) qui :
  1. Valident les quotas/rate-limits,
  2. Envoient `init` + upload (ou `PULL_FROM_URL`),
  3. Pollent le statut ou consomment les webhooks,
  4. Persistant en DB (Postgres/Prisma), pas en mémoire.

Bonne construction !
