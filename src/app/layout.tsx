import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from 'sonner';
import Footer from '@/components/Footer';
import { ProductCardProvider } from '@/contexts/ProductCardContext';
import '@/styles/globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Loja - Checkout Unificado',
  description: 'Sistema de checkout unificado para servidores',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <head>
        {/* Preload critical assets for instant loading */}
        <link
          rel="preload"
          href="/assets/images/background_destinyShop.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/assets/icons/cursor.svg"
          as="image"
          type="image/svg+xml"
        />
        <link
          rel="preload"
          href="/assets/icons/logo.svg"
          as="image"
          type="image/svg+xml"
        />
      </head>
      <body className={poppins.className}>
        <ProductCardProvider>
          {children}
          <Footer />
          <Toaster
            position="top-right"
            expand={true}
            richColors
            duration={3000}
          />
        </ProductCardProvider>
      </body>
    </html>
  );
}
