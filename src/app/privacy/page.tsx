import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Privacy",
  description: "How Sleek Colors handles analytics and browsing data.",
  path: "/privacy"
});

export default function PrivacyPage() {
  return (
    <PageSection spacing="loose">
      <PageContainer className="max-w-3xl space-y-8">
        <SectionHeader
          eyebrow="Privacy"
          title="A small, privacy-conscious library."
          description="Sleek Colors does not require an account or collect palette submissions."
        />
        <div className="bg-card rounded-card border-border space-y-6 border p-6 text-sm leading-7">
          <section>
            <h2 className="text-lg font-semibold">Analytics</h2>
            <p className="text-muted-foreground mt-2">
              We use Vercel Web Analytics to understand aggregate page usage.
              Query parameters are removed before pageviews are sent, so search
              terms are not collected.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Clipboard</h2>
            <p className="text-muted-foreground mt-2">
              Copy actions stay in your browser. Sleek Colors does not receive
              the HEX values you copy.
            </p>
          </section>
          <section>
            <h2 className="text-lg font-semibold">Changes</h2>
            <p className="text-muted-foreground mt-2">
              This page will be updated if the product or its data practices
              change materially.
            </p>
          </section>
        </div>
      </PageContainer>
    </PageSection>
  );
}
