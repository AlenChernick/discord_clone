import { createNextRouteHandler } from 'uploadthing/next';

import { ourFileRouter } from '@/app/api/uploadthing/core';

const uploadthingAppId = process.env.UPLOADTHING_APP_ID;
const uploadthingSecret = process.env.UPLOADTHING_SECRET;
const uploadthingCallbackURL = process.env.UPLOADTHING_CALLBACK_URL;

// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
  config: {
    uploadthingId: uploadthingAppId,
    uploadthingSecret: uploadthingSecret,
    callbackUrl: uploadthingCallbackURL,
  },
});
