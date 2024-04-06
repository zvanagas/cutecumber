'use client';
import '@/styles/globals.css';
import { ClientProvider } from '@/client/trpc';
import { ReactNode } from 'react';
import { SessionProvider } from 'next-auth/react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <ClientProvider>
      <SessionProvider>
        <html lang="en">
          <head>
            <title>Cutecumber</title>
          </head>
          <body className="[&:has(dialog[open])]:overflow-hidden dark:bg-slate-900">
            {children}
          </body>
        </html>
      </SessionProvider>
    </ClientProvider>
  );
}
