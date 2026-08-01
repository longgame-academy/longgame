// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "https://2f74360c0d02a3e2d2de79da0149c164@o4511771279425536.ingest.us.sentry.io/4511771283554304",

  // This app handles payment, auth and PII. Do not ship request bodies or
  // user identity to a third-party error tracker by default.
  sendDefaultPii: false,

  dataCollection: {
    userInfo: false,
    httpBodies: [],
  },

  tracesSampleRate: 0.1,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;

