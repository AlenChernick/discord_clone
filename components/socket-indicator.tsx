'use client';

import { useSocket } from '@/components/providers/socket-provider';
import { Badge } from '@/components/ui/badge';

import type { FC } from 'react';

const SocketIndicator: FC = () => {
  const { isConnected } = useSocket();

  if (!isConnected) {
    return (
      <Badge variant='outline' className='bg-red-600 text-white border-none'>
        Reconnecting
      </Badge>
    );
  }

  return (
    <Badge variant='outline' className='bg-emerald-600 text-white border-none'>
      Connected
    </Badge>
  );
};

export default SocketIndicator;
