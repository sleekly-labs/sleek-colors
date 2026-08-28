import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Terms",
  description: "Terms for using the Sleek Colors palette library.",
  path: "/terms"
});

export default function TermsPage() {
  return (
    <PageSection spacing="loose">
      <PageContainer className="max-w-3xl space-y-8">
        <SectionHeader
          eyebrow="Terms"
          title="Use the library thoughtfully."
          description="These simple terms keep the free, frontend-only catalog useful for everyone."
        />
        <div className="bg-card rounded-card border-border space-y-6 border p-6 text-sm leading-7">
          <section>
            <h2 className="text-lg font-semibold">Use of the site</h2>
            <p className="text-muted-foreground mt-2">
              You may browse, copy, and use the published palettes in your own
              design work. Do not use the site to distribute harmful, unlawful,
              or abusive content.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Availability</h2>
            <p className="text-muted-foreground mt-2">
              The catalog is provided as-is. Palette availability, descriptions,
              and preview behavior may change as the library evolves.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Questions</h2>
            <p className="text-muted-foreground mt-2">
              For questions about the project, use the verified GitHub contact
              link on the Contact page.
            </p>
          </section>
        </div>
      </PageContainer>
    </PageSection>
  );
}
