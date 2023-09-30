import type { NextPage } from 'next';
import { initialProfile } from '@/lib/initial-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const SetupPage: NextPage = async () => {
  const profile = await initialProfile();

  const server = await db.server.findFirst({
    where: {
      members: {
        some: {
          profileId: profile.id,
        },
      },
    },
  });

  if (server) {
    return redirect(`/servers/${server.id}`);
  }

  return <div>Create a Server</div>;
};

export default SetupPage;
