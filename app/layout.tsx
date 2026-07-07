import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

import Navbar from '@/components/Navbar';

// Glavni font za tekst i meni
const inter = Inter({
	variable: '--font-sans',
	subsets: ['latin'],
	weight: ['300', '400', '500', '600'],
});

// Luksuzni font za naslove
const playfair = Playfair_Display({
	variable: '--font-serif',
	subsets: ['latin'],
	weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
	title: 'Gusto | Premium Dining & Experience',
	description:
		'Experience fine dining, modern smart menu, and seamless table reservations in one place.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='en'
			className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
			<body className='min-h-full flex flex-col bg-background text-text-primary'>
				<Navbar />
				{children}
			</body>
		</html>
	);
}
