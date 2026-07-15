import './globals.css';
import { Toaster } from '@/components/ui/sonner';

export const metadata = {
  title: 'Portfolio — Economics Researcher • Data Analyst • AI Workflow Developer',
  description: 'Personal portfolio of an economics researcher, data analyst, and AI workflow developer. Research papers, projects, publications, and technical experience.',
  keywords: ['portfolio', 'economics', 'researcher', 'data analyst', 'AI', 'workflow', 'developer', 'research', 'publications'],
  authors: [{ name: 'Your Name' }],
  openGraph: {
    title: 'Portfolio — Economics Researcher & Data Analyst',
    description: 'Research, data analysis, and AI workflow projects.',
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
