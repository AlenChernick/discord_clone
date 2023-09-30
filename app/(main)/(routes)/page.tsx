import { ModeToggle } from '@/components/mode-toggle';
import { UserButton } from '@clerk/nextjs';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <UserButton afterSignOutUrl='/' />
      <ModeToggle />
    </div>
  );
};

export default Home;
