import "@/styles/globals.css";
import { ClientProvider } from "@/client/trpc";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <head>
          <title>Cutecumber</title>
        </head>
        <body>{children}</body>
      </html>
    </ClientProvider>
  );
}
