import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UNOX — Personal Operating System',
  description: 'Sovereign personal OS — merger portal between Bruno & Una',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex bg-black relative h-dvh overflow-hidden antialiased">
        {children}
      </body>
    </html>
  );
}
