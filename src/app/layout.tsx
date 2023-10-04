import '@/styles/globals.css';
import { ClientProvider } from '@/client/trpc';
import { ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <ClientProvider>
      <html lang="en">
        <head>
          <title>Cutecumber</title>
        </head>
        <body className="[&:has(dialog[open])]:overflow-hidden">
          {children}
        </body>
      </html>
    </ClientProvider>
  );
}
