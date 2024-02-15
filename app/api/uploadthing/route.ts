import { createRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from '@/app/api/uploadthing/core';

const uploadthingAppId = process.env.UPLOADTHING_APP_ID;
const uploadthingSecret = process.env.UPLOADTHING_SECRET;
const uploadthingCallbackURL =
  process.env.NODE_ENV === 'production'
    ? process.env.UPLOADTHING_CALLBACK_URL
    : 'http://localhost:3000/api/uploadthing';

// Export routes for Next App Router
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: uploadthingAppId,
    uploadthingSecret: uploadthingSecret,
    callbackUrl: uploadthingCallbackURL,
  },
});
