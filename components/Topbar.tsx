export default function Topbar() {
  return (
    <header className="sticky top-0 z-20 border-b border-gray-200 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-screen-2xl items-center justify-between px-4 py-3">
        <div className="md:hidden flex items-center gap-2">
          <div className="h-7 w-7 rounded-xl bg-black" />
          <div className="text-lg font-semibold">MultiPoster</div>
        </div>
        <div className="text-sm text-gray-500">
          Exemple SaaS · TikTok multi-compte (mock)
        </div>
      </div>
    </header>
  );
}
