import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

const containerWidths = {
  narrow: "max-w-3xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "max-w-none"
} as const;

const sectionSpacing = {
  compact: "py-10 md:py-12",
  default: "py-section",
  loose: "py-16 md:py-24"
} as const;

type ContainerWidth = keyof typeof containerWidths;
type SectionSpacing = keyof typeof sectionSpacing;

type PageShellProps = ComponentPropsWithoutRef<"div">;

function PageShell({ className, ...props }: PageShellProps) {
  return (
    <div
      className={cn(
        "bg-background text-foreground flex min-h-svh min-w-0 flex-col overflow-x-clip",
        className
      )}
      {...props}
    />
  );
}

type MainRegionProps = ComponentPropsWithoutRef<"main">;

function MainRegion({ className, ...props }: MainRegionProps) {
  return <main className={cn("min-w-0 flex-1", className)} {...props} />;
}

type PageContainerProps = ComponentPropsWithoutRef<"div"> & {
  width?: ContainerWidth;
};

function PageContainer({
  className,
  width = "default",
  ...props
}: PageContainerProps) {
  return (
    <div
      className={cn(
        "px-page mx-auto w-full",
        containerWidths[width],
        className
      )}
      {...props}
    />
  );
}

type PageSectionProps = ComponentPropsWithoutRef<"section"> & {
  spacing?: SectionSpacing;
};

function PageSection({
  className,
  spacing = "default",
  ...props
}: PageSectionProps) {
  return (
    <section
      className={cn("w-full", sectionSpacing[spacing], className)}
      {...props}
    />
  );
}

type SectionHeaderProps = ComponentPropsWithoutRef<"div"> & {
  actions?: ReactNode;
  align?: "start" | "center";
  description?: ReactNode;
  eyebrow?: ReactNode;
  title: ReactNode;
};

function SectionHeader({
  actions,
  align = "start",
  className,
  description,
  eyebrow,
  title,
  ...props
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        actions &&
          align === "start" &&
          "sm:flex-row sm:items-end sm:justify-between",
        className
      )}
      {...props}
    >
      <div className={cn("max-w-2xl", align === "center" && "mx-auto")}>
        {eyebrow ? (
          <p className="text-muted-foreground mb-3 text-sm font-medium">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-2xl font-semibold tracking-normal md:text-3xl">
          {title}
        </h2>
        {description ? (
          <p className="text-muted-foreground mt-3 text-base text-pretty">
            {description}
          </p>
        ) : null}
      </div>
      {actions ? <div className="shrink-0">{actions}</div> : null}
    </div>
  );
}

export {
  MainRegion,
  PageContainer,
  PageSection,
  PageShell,
  SectionHeader,
  containerWidths,
  sectionSpacing
};
export type { ContainerWidth, SectionSpacing };
