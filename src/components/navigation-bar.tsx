import { ReactNode } from 'react';
import { BackButton } from './back-button';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './button';

type Props = {
  children?: ReactNode;
  isBackButtonShown?: boolean;
};

export const NavigationBar = ({ children, isBackButtonShown }: Props) => {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <div className="flex justify-between bg-white dark:bg-slate-800 shadow-sm dark:shadow-white p-2 rounded w-full">
      <div className="flex gap-2">
        {isBackButtonShown && <BackButton onClick={() => router.push('/')} />}
        {children}
      </div>
      {status === 'authenticated' && (
        <div className="flex flex-1 w-full justify-end items-center gap-2 dark:text-white">
          <span className="text-right hidden sm:block">{data.user?.name}</span>
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      )}
    </div>
  );
};
