import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Fatima',
  description: 'Invitacion',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`text-[#406086] font-semibold`}>{children}</body>
    </html>
  );
}
