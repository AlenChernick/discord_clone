import type { NextPage } from 'next';
import { initialProfile } from '@/lib/initial-profile';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';
import dynamic from 'next/dynamic';
const InitialModal = dynamic(() => import('@/components/modals/initial-modal'), { ssr: false });

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

  return <InitialModal />;
};

export default SetupPage;
