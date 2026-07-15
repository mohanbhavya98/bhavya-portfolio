import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'Bhavya Mohan — Economics Researcher • Applied Econometrics • Causal Inference',
  description: 'Personal research portfolio of Bhavya Mohan — undergraduate researcher in labour economics, applied econometrics, causal inference and quantitative finance at the University of Delhi.',
  keywords: ['Bhavya Mohan', 'economics', 'researcher', 'labour economics', 'applied econometrics', 'causal inference', 'PLFS', 'Heckman', 'Instrumental Variables', 'University of Delhi'],
  authors: [{ name: 'Bhavya Mohan' }],
  openGraph: {
    title: 'Bhavya Mohan — Economics Researcher',
    description: 'Undergraduate research portfolio in labour economics and applied econometrics.',
    type: 'website',
  },
};

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className="bg-black text-white antialiased">
        {children}
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
