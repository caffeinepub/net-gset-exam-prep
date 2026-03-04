import { Toaster } from "@/components/ui/sonner";
import { useState } from "react";
import HomePage from "./components/HomePage";
import Navbar from "./components/Navbar";
import PaperView from "./components/PaperView";

export type ActiveView = "home" | "paper1" | "paper2";

export default function App() {
  const [activeView, setActiveView] = useState<ActiveView>("home");

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar activeView={activeView} onNavigate={setActiveView} />
      <main className="flex-1">
        {activeView === "home" && <HomePage onNavigate={setActiveView} />}
        {(activeView === "paper1" || activeView === "paper2") && (
          <PaperView paperKey={activeView} onNavigate={setActiveView} />
        )}
      </main>
      <footer className="border-t border-border bg-white py-6 text-center text-sm text-muted-foreground">
        <span>
          &copy; {new Date().getFullYear()}. Built with{" "}
          <span className="text-red-500">♥</span> using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            caffeine.ai
          </a>
        </span>
      </footer>
      <Toaster />
    </div>
  );
}
