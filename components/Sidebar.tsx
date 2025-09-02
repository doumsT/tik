import Link from "next/link";

export default function Sidebar() {
  const items = [
    { href: "/", label: "Dashboard" },
    { href: "/accounts", label: "Comptes" },
    { href: "/schedule", label: "Planifier" },
  ];
  return (
    <aside className="h-screen w-64 shrink-0 border-r border-gray-200 bg-white p-4 hidden md:block">
      <div className="mb-8 flex items-center gap-2">
        <div className="h-8 w-8 rounded-xl bg-black" />
        <div className="text-xl font-semibold">MultiPoster</div>
      </div>
      <nav className="space-y-2">
        {items.map((it) => (
          <Link
            key={it.href}
            href={it.href}
            className="block rounded-2xl px-3 py-2 text-sm hover:bg-gray-100"
          >
            {it.label}
          </Link>
        ))}
      </nav>
      <div className="absolute bottom-4 left-4 right-4 text-xs text-gray-500">
        Démo — backend mocké
      </div>
    </aside>
  );
}
