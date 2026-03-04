import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { BookOpen, GraduationCap, Menu, X } from "lucide-react";
import { useState } from "react";
import type { ActiveView } from "../App";

interface NavbarProps {
  activeView: ActiveView;
  onNavigate: (view: ActiveView) => void;
}

const navLinks: { label: string; view: ActiveView; ocid: string }[] = [
  { label: "Home", view: "home", ocid: "nav.home_link" },
  { label: "Paper 1", view: "paper1", ocid: "nav.paper1_link" },
  { label: "Paper 2", view: "paper2", ocid: "nav.paper2_link" },
];

export default function Navbar({ activeView, onNavigate }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  function handleNav(view: ActiveView) {
    onNavigate(view);
    setMobileOpen(false);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-border shadow-nav">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <button
          type="button"
          onClick={() => handleNav("home")}
          className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-md"
          aria-label="NET·GSET Prep Home"
        >
          <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
            <GraduationCap className="w-5 h-5 text-primary-foreground" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display font-bold text-lg text-primary tracking-tight">
              NET·GSET
            </span>
            <span className="text-xs text-muted-foreground font-medium tracking-wider uppercase">
              Prep
            </span>
          </div>
        </button>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, view, ocid }) => (
            <button
              key={view}
              type="button"
              data-ocid={ocid}
              onClick={() => handleNav(view)}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                activeView === view
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-foreground/70 hover:text-foreground hover:bg-muted"
              }`}
              aria-current={activeView === view ? "page" : undefined}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            type="button"
            size="sm"
            onClick={() => handleNav("paper1")}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-sm"
          >
            <BookOpen className="w-4 h-4 mr-1.5" />
            Start Preparing
          </Button>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          data-ocid="nav.hamburger_button"
          onClick={() => setMobileOpen(true)}
          className="md:hidden p-2 rounded-md hover:bg-muted transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          aria-label="Open menu"
          aria-expanded={mobileOpen}
        >
          <Menu className="w-5 h-5 text-foreground" />
        </button>
      </div>

      {/* Mobile drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="right" className="w-72 p-0" data-ocid="nav.sheet">
          <SheetHeader className="px-5 py-4 border-b border-border bg-ice-blue">
            <div className="flex items-center justify-between">
              <SheetTitle className="font-display text-primary text-lg">
                NET·GSET Prep
              </SheetTitle>
              <SheetClose asChild>
                <button
                  type="button"
                  className="p-1.5 rounded-md hover:bg-muted transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </SheetClose>
            </div>
          </SheetHeader>
          <nav
            className="px-4 py-4 flex flex-col gap-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map(({ label, view, ocid }) => (
              <button
                key={view}
                type="button"
                data-ocid={ocid}
                onClick={() => handleNav(view)}
                className={`w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
                  activeView === view
                    ? "bg-primary/10 text-primary font-semibold border-l-[3px] border-primary pl-[calc(1rem-3px)]"
                    : "text-foreground/70 hover:text-foreground hover:bg-muted"
                }`}
                aria-current={activeView === view ? "page" : undefined}
              >
                {label}
              </button>
            ))}
            <div className="mt-4 pt-4 border-t border-border">
              <Button
                type="button"
                className="w-full bg-primary text-primary-foreground font-semibold"
                onClick={() => handleNav("paper1")}
              >
                <BookOpen className="w-4 h-4 mr-1.5" />
                Start Preparing
              </Button>
            </div>
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  );
}
