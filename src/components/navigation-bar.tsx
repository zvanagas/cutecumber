import { ReactNode } from 'react';
import BackButton from './back-button';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';
import Button from './button';

type Props = {
  children?: ReactNode;
  isBackButtonShown?: boolean;
};

const NavigationBar = ({ children, isBackButtonShown }: Props) => {
  const router = useRouter();
  const { data, status } = useSession();

  return (
    <div className="flex justify-between bg-white shadow-md border p-2 rounded w-full">
      <div className="flex gap-2">
        {isBackButtonShown && <BackButton onClick={() => router.push('/')} />}
        {children}
      </div>
      {status === 'authenticated' && (
        <div className="flex flex-1 w-full justify-end items-center gap-1">
          <span>{data.user?.name}</span>
          <Button onClick={() => signOut()}>Logout</Button>
        </div>
      )}
    </div>
  );
};

export default NavigationBar;
