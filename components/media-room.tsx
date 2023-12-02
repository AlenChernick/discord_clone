'use client';
import { useEffect, useState, type FC } from 'react';
import '@livekit/components-styles';
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import { useUser } from '@clerk/nextjs';
import { Loader2 } from 'lucide-react';

type MediaRoomProps = {
  chatId: string;
  video: boolean;
  audio: boolean;
};

const MediaRoom: FC<MediaRoomProps> = ({ chatId, video, audio }) => {
  const { user } = useUser();
  const [token, setToken] = useState('');
  useEffect(() => {
    if (!user?.firstName) return;
    const isUserLastNameUndefined = user.lastName?.toString() === undefined;
    let userLastName: string | null = '';
    if (!isUserLastNameUndefined) {
      userLastName = user.lastName;
    }
    const name = `${user.firstName} ${userLastName}`;

    (async () => {
      try {
        const response = await fetch(`/api/livekit?room=${chatId}&username=${name}`);
        const data = await response.json();
        setToken(data.token);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [user?.firstName, user?.lastName, chatId]);

  if (token === '') {
    return (
      <div className='flex flex-col flex-1 justify-center items-center'>
        <Loader2 className='h-12 w-12 text-zinc-500 animate-spin my-4' />
        <p className='text-xs text-zinc-500 dark:text-zinc-400'>Loading...</p>
      </div>
    );
  }

  return (
    <LiveKitRoom
      data-lk-theme='default'
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      token={token}
      connect={true}
      video={video}
      audio={audio}>
      <VideoConference />
    </LiveKitRoom>
  );
};

export default MediaRoom;
