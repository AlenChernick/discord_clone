import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { FC } from 'react';

type UserAvatarProps = {
  src?: string;
  className?: string;
};

const UserAvatar: FC<UserAvatarProps> = ({ src, className }) => {
  return (
    <Avatar>
      <AvatarImage src={src} className={cn('h-7 w-7 md:h-10 md:w-10', className)} />
    </Avatar>
  );
};

export default UserAvatar;
