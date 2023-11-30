import type { NextPage } from 'next';
import { redirect } from 'next/navigation';
import { db } from '@/lib/db';
import { redirectToSignIn } from '@clerk/nextjs';
import { currentProfile } from '@/lib/current-profile';
import ChatHeader from '@/components/chat/chat-header';
import ChatInput from '@/components/chat/chat-input';

type ChannelIdPageProps = {
  params: {
    serverId: string;
    channelId: string;
  };
};

const ChannelIdPage: NextPage<ChannelIdPageProps> = async ({ params }) => {
  const profile = await currentProfile();

  if (!profile) {
    return redirectToSignIn();
  }

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  });

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      profileId: profile.id,
    },
  });

  if (!channel || !member) {
    redirect('/');
  }

  return (
    <div className='bg-white dark:bg-[#313338] flex flex-col h-screen'>
      <ChatHeader name={channel.name} serverId={channel.serverId} type='channel' />
      <div className='flex-1'>Future messages</div>
      <ChatInput
        name={channel.name}
        type='channel'
        apiUrl='/api/socket/messages'
        query={{
          channelId: channel.id,
          serverId: channel.serverId,
        }}
      />
    </div>
  );
};

export default ChannelIdPage;
