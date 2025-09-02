import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MultiPoster · TikTok (démo)",
  description: "Publiez sur plusieurs comptes TikTok simultanément — démo UI avec backend mocké.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <body className="min-h-screen">
        <Topbar />
        <div className="mx-auto flex max-w-screen-2xl">
          <Sidebar />
          <main className="flex-1 p-4 md:p-8">{children}</main>
        </div>
      </body>
    </html>
  );
}
