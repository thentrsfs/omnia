'use client';

import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

import Hero from '@/components/sections/Hero';
import Menu from '@/components/sections/Menu';
import ChefGallery from '@/components/sections/ChefGallery';
import Experience from '@/components/sections/Experience';

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
			<main className='grow bg-background bg-[url("/images/noise-2.jpg")] bg-repeat bg-fixed  bg-blend-darken bg-cover'>
				{/* Povezujemo Hero dugmad sa našom novom GSAP skrol funkcijom */}
				<Hero
					onMenuClick={() => scrollToSection('menu')}
					onBookClick={() => scrollToSection('reservations')}
				/>
				<ChefGallery />
				<Menu />
				<Experience />
			</main>
		</>
	);
}
