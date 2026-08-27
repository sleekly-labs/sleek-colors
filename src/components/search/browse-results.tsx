import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ResultsSummaryProps = {
  className?: string;
  label: string;
  totalCount: number;
  visibleCount: number;
};

type EmptyStateProps = {
  className?: string;
  description: string;
  onReset?: () => void;
  title: string;
};

type LoadMoreControlProps = {
  className?: string;
  onLoadMore: () => void;
  remainingCount: number;
};

function ResultsSummary({
  className,
  label,
  totalCount,
  visibleCount
}: ResultsSummaryProps) {
  return (
    <div
      className={cn(
        "text-muted-foreground flex items-center justify-between gap-3 text-sm",
        className
      )}
    >
      <span>
        Showing {visibleCount} of {totalCount} {label}
      </span>
    </div>
  );
}

function EmptyState({
  className,
  description,
  onReset,
  title
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        "bg-card rounded-card border-border flex flex-col items-center gap-3 border px-6 py-12 text-center",
        className
      )}
    >
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground max-w-md text-sm">{description}</p>
      {onReset ? (
        <Button variant="outline" size="sm" onClick={onReset}>
          Reset filters
        </Button>
      ) : null}
    </div>
  );
}

function LoadMoreControl({
  className,
  onLoadMore,
  remainingCount
}: LoadMoreControlProps) {
  if (remainingCount <= 0) {
    return null;
  }

  return (
    <div className={cn("flex justify-center", className)}>
      <Button variant="outline" onClick={onLoadMore}>
        Load more
        <span className="text-muted-foreground">({remainingCount} left)</span>
      </Button>
    </div>
  );
}

export { EmptyState, LoadMoreControl, ResultsSummary };
