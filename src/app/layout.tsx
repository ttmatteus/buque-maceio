import type { Metadata } from 'next';
import { Inter, Alegreya_SC, Nunito_Sans } from 'next/font/google';
import './styles/index.css';

const inter = Inter({ subsets: ['latin'] });
const alegreyaSC = Alegreya_SC({ 
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-alegreya-sc'
});
const nunitoSans = Nunito_Sans({ 
  subsets: ['latin'],
  weight: ['400', '600', '700', '800'],
  variable: '--font-nunito-sans'
});

export const metadata: Metadata = {
  title: 'Floral - Loja de Buquês',
  description: 'Compre buquês de flores frescas para todas as ocasiões.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scroll-smooth">
      <body className={`${inter.className} ${alegreyaSC.variable} ${nunitoSans.variable} antialiased`}>
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}