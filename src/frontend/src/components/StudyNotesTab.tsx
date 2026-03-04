import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { AlignLeft, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import type { Unit } from "../backend.d";

interface StudyNotesTabProps {
  unit: Unit | null;
  isLoading: boolean;
  hasPrev: boolean;
  hasNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  prevTitle?: string;
  nextTitle?: string;
}

/** Parse **bold** segments into React spans */
function parseBold(text: string): React.ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  let boldCount = 0;
  return parts.map((part) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      boldCount++;
      const innerText = part.slice(2, -2);
      const stableKey = `bold-${boldCount}-${innerText.slice(0, 12)}`;
      return (
        <strong key={stableKey} className="font-semibold text-foreground">
          {innerText}
        </strong>
      );
    }
    return part;
  });
}

/** Minimal markdown-like renderer — handles ## headings, **bold**, - lists, numbered lists */
function renderContent(content: string): React.ReactNode[] {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;
  let blockIdx = 0;

  while (i < lines.length) {
    const line = lines[i];
    const key = `block-${blockIdx}`;
    blockIdx++;

    if (line.startsWith("## ")) {
      elements.push(
        <h2
          key={key}
          className="font-display text-xl font-bold text-foreground mt-7 mb-3 pb-2 border-b border-border"
        >
          {parseBold(line.slice(3))}
        </h2>,
      );
    } else if (line.startsWith("### ")) {
      elements.push(
        <h3
          key={key}
          className="font-display text-base font-bold text-foreground mt-5 mb-2"
        >
          {parseBold(line.slice(4))}
        </h3>,
      );
    } else if (line.startsWith("- ")) {
      // Collect consecutive list items
      const items: string[] = [];
      let j = i;
      while (j < lines.length && lines[j].startsWith("- ")) {
        items.push(lines[j].slice(2));
        j++;
      }
      elements.push(
        <ul key={key} className="list-none space-y-1.5 ml-1 mb-3">
          {items.map((item) => (
            <li
              key={item.slice(0, 40)}
              className="flex items-start gap-2 text-foreground/80 text-sm leading-relaxed"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ul>,
      );
      i = j;
      continue;
    } else if (/^\d+\.\s/.test(line)) {
      // Collect numbered list
      const items: string[] = [];
      let j = i;
      while (j < lines.length && /^\d+\.\s/.test(lines[j])) {
        items.push(lines[j].replace(/^\d+\.\s/, ""));
        j++;
      }
      elements.push(
        <ol key={key} className="list-none space-y-1.5 ml-1 mb-3">
          {items.map((item, listIdx) => (
            <li
              key={item.slice(0, 40)}
              className="flex items-start gap-3 text-foreground/80 text-sm leading-relaxed"
            >
              <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {listIdx + 1}
              </span>
              <span>{parseBold(item)}</span>
            </li>
          ))}
        </ol>,
      );
      i = j;
      continue;
    } else if (line.trim() === "") {
      // skip blank lines
    } else {
      elements.push(
        <p
          key={key}
          className="text-foreground/80 text-sm leading-relaxed mb-3"
        >
          {parseBold(line)}
        </p>,
      );
    }

    i++;
  }

  return elements;
}

export default function StudyNotesTab({
  unit,
  isLoading,
  hasPrev,
  hasNext,
  onPrev,
  onNext,
  prevTitle,
  nextTitle,
}: StudyNotesTabProps) {
  if (isLoading) {
    return (
      <div data-ocid="notes.loading_state" className="space-y-4">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-4/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-3/6" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </div>
    );
  }

  if (!unit) {
    return (
      <div
        data-ocid="notes.empty_state"
        className="flex flex-col items-center justify-center min-h-64 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-2xl bg-primary/8 flex items-center justify-center mb-5">
          <AlignLeft className="w-8 h-8 text-primary/50" />
        </div>
        <h3 className="font-display text-lg font-bold text-foreground mb-2">
          Select a Unit
        </h3>
        <p className="text-muted-foreground text-sm max-w-xs">
          Choose a unit from the sidebar to start reading the study notes.
        </p>
      </div>
    );
  }

  return (
    <article
      data-ocid="notes.content_panel"
      className="bg-white rounded-xl border border-border shadow-card overflow-hidden"
    >
      {/* Article header */}
      <div className="bg-primary/5 border-b border-border px-6 py-5">
        <div className="flex items-center gap-2 mb-3">
          <BookOpen className="w-4 h-4 text-primary" />
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            Study Notes
          </span>
        </div>
        <h1 className="font-display text-2xl font-bold text-foreground">
          {unit.title}
        </h1>
        <div className="mt-2 flex items-center gap-2">
          <Badge
            variant="secondary"
            className="text-xs bg-primary/10 text-primary border-0"
          >
            Unit {Number(unit.order)}
          </Badge>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6">{renderContent(unit.content)}</div>

      {/* Navigation */}
      <div className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          data-ocid="notes.prev_button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="flex items-center gap-2 text-sm border-border disabled:opacity-40"
        >
          <ChevronLeft className="w-4 h-4" />
          <span className="hidden sm:inline">
            {prevTitle
              ? `${prevTitle.slice(0, 20)}${prevTitle.length > 20 ? "…" : ""}`
              : "Previous"}
          </span>
          <span className="sm:hidden">Prev</span>
        </Button>

        <span className="text-xs text-muted-foreground font-medium text-center hidden sm:block">
          Use ← → to navigate units
        </span>

        <Button
          type="button"
          variant="outline"
          size="sm"
          data-ocid="notes.next_button"
          onClick={onNext}
          disabled={!hasNext}
          className="flex items-center gap-2 text-sm border-border disabled:opacity-40"
        >
          <span className="hidden sm:inline">
            {nextTitle
              ? `${nextTitle.slice(0, 20)}${nextTitle.length > 20 ? "…" : ""}`
              : "Next"}
          </span>
          <span className="sm:hidden">Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>
    </article>
  );
}
