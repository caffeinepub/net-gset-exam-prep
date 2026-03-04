import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, ChevronRight, FileDown } from "lucide-react";
import type { Paper, Unit } from "../backend.d";

interface UnitSidebarProps {
  paper: Paper | undefined;
  units: Unit[];
  selectedUnitId: bigint | null;
  isLoading: boolean;
  onSelectUnit: (id: bigint) => void;
  onPYQLink: () => void;
}

export default function UnitSidebar({
  paper,
  units,
  selectedUnitId,
  isLoading,
  onSelectUnit,
  onPYQLink,
}: UnitSidebarProps) {
  return (
    <div className="flex flex-col h-full bg-sidebar rounded-xl border border-sidebar-border overflow-hidden shadow-card">
      {/* Sidebar header */}
      <div className="bg-primary px-4 py-4">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-4 h-4 text-primary-foreground/80" />
          <span className="text-xs font-semibold text-primary-foreground/70 uppercase tracking-wider">
            Study Units
          </span>
        </div>
        <h2 className="font-display text-sm font-bold text-primary-foreground leading-tight line-clamp-2">
          {paper?.title || "Loading..."}
        </h2>
      </div>

      {/* Units list */}
      <ScrollArea className="flex-1 max-h-[480px] md:max-h-none">
        <div className="py-2">
          {isLoading ? (
            <div className="space-y-2 px-3 py-2">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-10 w-full rounded-lg" />
              ))}
            </div>
          ) : units.length === 0 ? (
            <div className="px-4 py-6 text-center text-sm text-muted-foreground">
              No units available
            </div>
          ) : (
            <nav aria-label="Units navigation">
              {units.map((unit, index) => {
                const isActive = unit.id === selectedUnitId;
                const ocid = `sidebar.unit.item.${index + 1}`;
                return (
                  <button
                    type="button"
                    key={unit.id.toString()}
                    data-ocid={ocid}
                    onClick={() => onSelectUnit(unit.id)}
                    className={`w-full text-left flex items-center gap-3 px-4 py-3 text-sm transition-all group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring ${
                      isActive
                        ? "bg-primary/10 text-primary font-semibold border-l-[3px] border-primary pl-[calc(1rem-3px)]"
                        : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-accent-foreground"
                    }`}
                    aria-current={isActive ? "true" : undefined}
                  >
                    <span
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-sidebar-accent text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                      }`}
                    >
                      {index + 1}
                    </span>
                    <span className="line-clamp-2 leading-snug">
                      {unit.title}
                    </span>
                    {isActive && (
                      <ChevronRight className="w-4 h-4 ml-auto flex-shrink-0 text-primary" />
                    )}
                  </button>
                );
              })}
            </nav>
          )}
        </div>
      </ScrollArea>

      {/* PYQ downloads link */}
      <div className="mt-auto">
        <Separator className="bg-sidebar-border" />
        <div className="p-3">
          <button
            type="button"
            data-ocid="sidebar.pyq_link"
            onClick={onPYQLink}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-accent hover:bg-primary/15 text-accent-foreground hover:text-primary transition-colors group text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 group-hover:bg-primary/20 flex items-center justify-center flex-shrink-0 transition-colors">
              <FileDown className="w-4 h-4 text-primary" />
            </div>
            <div className="text-left">
              <div className="leading-tight">PYQ Downloads</div>
              <div className="text-xs text-muted-foreground font-normal">
                Previous Year Papers
              </div>
            </div>
            <ChevronRight className="w-4 h-4 ml-auto text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>
      </div>
    </div>
  );
}
