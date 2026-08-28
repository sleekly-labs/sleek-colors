"use client";

import { Analytics, type BeforeSend } from "@vercel/analytics/react";

const stripQueryParameters: BeforeSend = (event) => {
  const url = new URL(event.url, window.location.origin);
  return {
    ...event,
    url: `${url.origin}${url.pathname}`
  };
};

const analyticsMode =
  process.env.NEXT_PUBLIC_VERCEL_ANALYTICS_MODE === "development"
    ? "development"
    : "auto";

function PrivacyAnalytics() {
  return <Analytics beforeSend={stripQueryParameters} mode={analyticsMode} />;
}

export { PrivacyAnalytics };
