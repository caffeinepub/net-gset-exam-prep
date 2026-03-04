import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BookOpen, Calendar, Download, FileText } from "lucide-react";
import { useState } from "react";
import type { PYQ } from "../backend.d";

interface PYQTabProps {
  pyqs: PYQ[];
  isLoading: boolean;
  paperTitle: string;
}

const YEAR_RANGE = [2024, 2023, 2022, 2021, 2020, 2019];

export default function PYQTab({ pyqs, isLoading, paperTitle }: PYQTabProps) {
  const [selectedYear, setSelectedYear] = useState<number | "all">("all");

  const filteredPYQs =
    selectedYear === "all"
      ? pyqs
      : pyqs.filter((p) => Number(p.year) === selectedYear);

  if (isLoading) {
    return (
      <div data-ocid="pyq.loading_state" className="space-y-4">
        <div className="flex gap-2 flex-wrap mb-4">
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <Skeleton key={i} className="h-9 w-20 rounded-lg" />
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-40 w-full rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Section header */}
      <div className="bg-white rounded-xl border border-border shadow-card overflow-hidden mb-6">
        <div className="bg-primary/5 border-b border-border px-6 py-5">
          <div className="flex items-center gap-2 mb-2">
            <FileText className="w-4 h-4 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              PYQ Downloads
            </span>
          </div>
          <h2 className="font-display text-xl font-bold text-foreground">
            Previous Year Questions
          </h2>
          <p className="text-muted-foreground text-sm mt-1">
            Download past papers for {paperTitle || "this paper"}. Practice with
            real exam questions.
          </p>
        </div>

        {/* Year filter */}
        <div className="px-6 py-4 bg-muted/20 border-b border-border">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mr-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              Filter by Year:
            </span>
            <button
              type="button"
              data-ocid="pyq.year_filter.tab"
              onClick={() => setSelectedYear("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                selectedYear === "all"
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-white border border-border text-foreground/70 hover:border-primary/40 hover:text-primary"
              }`}
            >
              All Years
            </button>
            {YEAR_RANGE.map((year) => (
              <button
                key={year}
                type="button"
                data-ocid="pyq.year_filter.tab"
                onClick={() => setSelectedYear(year)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                  selectedYear === year
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-white border border-border text-foreground/70 hover:border-primary/40 hover:text-primary"
                }`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* PYQ grid */}
      {filteredPYQs.length === 0 ? (
        <div
          data-ocid="pyq.empty_state"
          className="flex flex-col items-center justify-center min-h-48 py-12 text-center bg-white rounded-xl border border-border"
        >
          <div className="w-14 h-14 rounded-2xl bg-primary/8 flex items-center justify-center mb-4">
            <BookOpen className="w-7 h-7 text-primary/40" />
          </div>
          <h3 className="font-display font-bold text-foreground mb-1">
            No Papers Found
          </h3>
          <p className="text-muted-foreground text-sm">
            No PYQs available for{" "}
            {selectedYear === "all" ? "this paper" : `year ${selectedYear}`}.
          </p>
          {selectedYear !== "all" && (
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              onClick={() => setSelectedYear("all")}
            >
              Show All Years
            </Button>
          )}
        </div>
      ) : (
        <div
          data-ocid="pyq.list"
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {filteredPYQs.map((pyq, index) => (
            <PYQCard key={pyq.id.toString()} pyq={pyq} index={index + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

function PYQCard({ pyq, index }: { pyq: PYQ; index: number }) {
  function handleDownload() {
    if (pyq.downloadUrl && pyq.downloadUrl !== "#") {
      window.open(pyq.downloadUrl, "_blank", "noopener,noreferrer");
    } else {
      // In demo mode, show a friendly message
      alert("PDF download will be available soon. Check back later!");
    }
  }

  const yearColors: Record<number, string> = {
    2024: "bg-emerald-50 text-emerald-700 border-emerald-200",
    2023: "bg-blue-50 text-blue-700 border-blue-200",
    2022: "bg-indigo-50 text-indigo-700 border-indigo-200",
    2021: "bg-violet-50 text-violet-700 border-violet-200",
    2020: "bg-amber-50 text-amber-700 border-amber-200",
    2019: "bg-rose-50 text-rose-700 border-rose-200",
  };

  const yearColor =
    yearColors[Number(pyq.year)] || "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <Card
      data-ocid={`pyq.item.${index}`}
      className="card-accent-top border border-border shadow-card hover:shadow-card-hover transition-all duration-300 group"
    >
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="w-10 h-10 rounded-xl bg-primary/8 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/15 transition-colors">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <Badge
            className={`text-xs font-semibold border px-2.5 py-1 ${yearColor}`}
            variant="outline"
          >
            {Number(pyq.year)}
          </Badge>
        </div>

        <h3 className="font-display font-bold text-sm text-foreground mb-1 leading-snug group-hover:text-primary transition-colors">
          {pyq.title}
        </h3>

        <p className="text-xs text-muted-foreground mb-4">
          UGC-NET / GSET · PDF Format
        </p>

        <Button
          data-ocid={`pyq.download_button.${index}`}
          onClick={handleDownload}
          size="sm"
          className="w-full bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all font-semibold group-hover:shadow-sm"
        >
          <Download className="w-3.5 h-3.5 mr-2" />
          Download PDF
        </Button>
      </CardContent>
    </Card>
  );
}
