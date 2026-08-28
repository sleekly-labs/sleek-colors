import Link from "next/link";

import { PageContainer, PageSection, SectionHeader } from "@/components/layout";
import { buttonLinkClassName } from "@/components/ui/button";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({
  title: "Contact",
  description:
    "Contact the Sleek Colors project through its verified GitHub repository.",
  path: "/contact"
});

export default function ContactPage() {
  return (
    <PageSection spacing="loose">
      <PageContainer className="max-w-3xl">
        <div className="bg-card rounded-card border-border border p-6 sm:p-8">
          <SectionHeader
            eyebrow="Contact"
            title="Talk to the team behind Sleek Colors."
            description="Open an issue or discussion in the project repository for product feedback, content corrections, and questions."
            actions={
              <a
                href="https://github.com/sleekly-labs/sleek-colors"
                target="_blank"
                rel="noreferrer"
                className={buttonLinkClassName({ size: "lg" })}
              >
                Open GitHub
              </a>
            }
          />
          <Link
            href="/about"
            className="text-muted-foreground mt-8 inline-block text-sm underline underline-offset-4"
          >
            Learn more about Sleek Colors
          </Link>
        </div>
      </PageContainer>
    </PageSection>
  );
}
