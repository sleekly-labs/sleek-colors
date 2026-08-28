"use client";

import { Analytics, type BeforeSend } from "@vercel/analytics/react";

const stripQueryParameters: BeforeSend = (event) => {
  const url = new URL(event.url, window.location.origin);
  return {
    ...event,
    url: `${url.origin}${url.pathname}`
  };
};

function PrivacyAnalytics() {
  return <Analytics beforeSend={stripQueryParameters} />;
}

export { PrivacyAnalytics };
