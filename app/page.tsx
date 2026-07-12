'use client';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Hero from '@/components/sections/Hero';
import Menu from '@/components/sections/Menu';
import ChefGallery from '@/components/sections/ChefGallery';

// Registrujemo ScrollToPlugin
gsap.registerPlugin(ScrollToPlugin);

export default function Home() {
	// Premium GSAP funkcija za skrolovanje
	const scrollToSection = (id: string) => {
		gsap.to(window, {
			duration: 1.5,
			scrollTo: {
				y: `#${id}`,
				offsetY: 0, // Možeš staviti npr. 80 ako želiš da uračunaš visinu fiksnog Navbar-a
			},
			ease: 'power4.inOut', // Ultra glatko ubrzanje i usporenje
		});
	};

	return (
		<>
			<main className='grow'>
				{/* Povezujemo Hero dugmad sa našom novom GSAP skrol funkcijom */}
				<Hero
					onMenuClick={() => scrollToSection('menu')}
					onBookClick={() => scrollToSection('reservations')}
				/>

				{/* PRIVREMENI PLACEHOLDERI SEKCIJA (Zamenićemo ih pravim komponentama) */}
				<ChefGallery />
				<Menu />

				<section
					id='reservations'
					className='h-screen bg-surface border-t border-border flex items-center justify-center'>
					<h2 className='text-3xl font-serif text-text-secondary'>
						Reservation System Section
					</h2>
				</section>
			</main>
		</>
	);
}
