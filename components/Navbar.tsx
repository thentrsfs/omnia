'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import gsap from 'gsap';

export default function Navbar() {
	const pathname = usePathname();

	const [isOpen, setIsOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);
	const cartCount = 1;

	const handleLogoClick = (e: React.MouseEvent) => {
		// Ako smo na home page-u ('/'), spreči podrazumevano osvežavanje i skroluj glatko na vrh
		if (pathname === '/') {
			e.preventDefault();
			window.scrollTo({
				top: 0,
				behavior: 'smooth', // Glatki prelaz
			});
		}
	};

	// Prati skrol stranice da bi dinamički promenio stil Navbara
	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	// Funkcija za glatko skrolovanje sa zadrškom zbog animacije zatvaranja
	const scrollToSection = (id: string) => {
		if (isOpen) setIsOpen(false);

		setTimeout(() => {
			gsap.to(window, {
				duration: 1.2,
				scrollTo: { y: `#${id}` },
				ease: 'power4.inOut',
			});
		}, 200); // Čeka da se zatvori mobilni meni, pa onda glatko skroluje
	};

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}
	}, [isOpen]);

	return (
		<>
			{/* GLAVNI NAVBAR (Fiksiran na vrhu) */}
			<nav
				className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
					isScrolled
						? 'bg-linear-to-b from-background via-background/80 to-transparent '
						: 'bg-transparent'
				}`}>
				{/* Top Bar - Smanjujemo mu vidljivost ili ga činimo providnijim na vrhu */}
				<div
					className={`text-center text-[8px] lg:text-[10px] tracking-[0.2em] uppercase text-text-secondary flex items-center justify-center gap-2 px-4 py-1.5 ${
						isScrolled
							? 'border-b border-border/40 bg-surface/30'
							: 'bg-transparent'
					}`}>
					<span className='h-1.5 w-1.5 rounded-full bg-success animate-pulse' />
					Accepting Online Orders & Reservations Today
				</div>

				<div className='mx-auto max-w-7xl px-6 lg:px-12'>
					{/* Smanjili smo h-24 na h-20 da bude elegantniji i manje glomazan */}
					<div className='flex lg:h-20 h-16 items-center justify-between md:grid md:grid-cols-3'>
						{/* DESKTOP LINKS */}
						<div className='hidden md:flex items-center space-x-10 font-medium text-[11px] tracking-[0.2em] uppercase text-text-secondary'>
							<button
								onClick={() => scrollToSection('menu')}
								className='hover:text-accent transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300 cursor-pointer'>
								MENU
							</button>
							<button
								onClick={() => scrollToSection('experience')}
								className='hover:text-accent transition-colors duration-300 relative py-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-accent hover:after:w-full after:transition-all after:duration-300 cursor-pointer'>
								ABOUT
							</button>
						</div>

						{/* CENTER LOGO */}
						<div className='flex justify-start md:justify-center'>
							<Link
								href='/'
								onClick={handleLogoClick}
								className='font-serif text-3xl font-light tracking-[0.15em] text-text-primary'>
								GUSTO<span className='text-accent font-sans font-bold'>.</span>
							</Link>
						</div>

						{/* DESKTOP RIGHT */}
						<div className='hidden md:flex items-center font-medium justify-end space-x-8'>
							<button className='group relative p-2 text-text-secondary hover:text-text-primary transition-colors duration-300 cursor-pointer'>
								<span className='text-[11px] tracking-[0.2em] uppercase mr-2 group-hover:text-accent transition-colors'>
									Cart
								</span>
								<span className='inline-flex h-5 w-5 items-center justify-center rounded-full bg-surface border border-border text-[10px] font-semibold text-accent group-hover:border-accent/40 transition-colors'>
									{cartCount}
								</span>
							</button>

							{/* Ako je na vrhu, dugme ima transparentniju ivicu da ne vrišti */}
							<button
								onClick={() => scrollToSection('reservations')}
								className={`relative inline-flex items-center justify-center px-6 py-2.5 text-[10px] tracking-[0.2em] uppercase text-text-primary border transition-all duration-500 group overflow-hidden cursor-pointer ${
									isScrolled
										? 'border-border hover:border-accent'
										: 'border-text-primary/30 hover:border-accent'
								}`}>
								<span className='absolute inset-0 bg-accent scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out' />
								<span className='relative z-10 group-hover:text-background transition-colors duration-500'>
									Book A Table
								</span>
							</button>
						</div>

						{/* MOBILE CONTROLS */}
						<div className='flex items-center space-x-6 md:hidden ml-auto'>
							<button className='group relative p-3 text-text-secondary hover:text-text-primary transition-colors duration-300'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									fill='none'
									viewBox='0 0 24 24'
									strokeWidth={1.2}
									stroke='currentColor'
									className='w-5 h-5 group-hover:text-accent transition-colors'>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
									/>
								</svg>
								{cartCount > 0 && (
									<span className='absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[9px] font-bold text-background font-sans'>
										{cartCount}
									</span>
								)}
							</button>

							<button
								onClick={() => setIsOpen(!isOpen)}
								className='group p-2 text-text-secondary focus:outline-none relative'
								aria-label='Toggle Menu'>
								<div className='w-6 flex flex-col gap-1.5 items-end'>
									<span className='h-px bg-text-primary transition-all duration-300 w-6' />
									<span className='h-px bg-text-primary transition-all duration-300 w-4' />
									<span className='h-px bg-text-primary transition-all duration-300 w-5' />
								</div>
							</button>
						</div>
					</div>
				</div>
			</nav>

			{/* BACKDROP (Zatamnjeni ekran sa leve strane - klik na njega zatvara meni) */}
			<div
				onClick={() => setIsOpen(false)}
				className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
					isOpen
						? 'opacity-100 pointer-events-auto'
						: 'opacity-0 pointer-events-none'
				}`}
			/>

			{/* SIDE DRAWER (Zauzima otprilike pola ekrana/70% na jako malim uređajima i klizi s desne strane) */}
			<div
				className={`fixed top-0 right-0 bottom-0 z-40 w-[70%] sm:w-[50%] bg-surface/50 backdrop-blur-2xl border-l border-border/40 pt-36 px-8 transition-transform duration-300 ease-in-out md:hidden ${
					isOpen ? 'translate-x-0' : 'translate-x-full'
				}`}>
				<X
					onClick={() => setIsOpen(false)}
					className='absolute top-11 right-8 w-6 h-6 cursor-pointer'
				/>
				{/* Linkovi unutar fioke sa tvojom scrollToSection funkcijom */}
				<div className='flex flex-col items-start space-y-8 text-center'>
					<button
						onClick={() => scrollToSection('menu')}
						className='font-serif text-2xl font-light tracking-wide text-text-primary hover:text-accent transition-colors w-full text-right cursor-pointer'>
						The Menu
					</button>
					<button
						onClick={() => scrollToSection('experience')}
						className='font-serif text-2xl font-light tracking-wide text-text-primary hover:text-accent transition-colors w-full text-right cursor-pointer'>
						The Experience
					</button>
					<button
						onClick={() => scrollToSection('reservations')}
						className='font-serif text-2xl font-light tracking-wide text-text-primary hover:text-accent transition-colors w-full text-right cursor-pointer'>
						Reservations
					</button>

					<div className='w-full pt-8 border-t border-border/40'>
						<button
							onClick={() => scrollToSection('reservations')}
							className='block w-full text-center border border-accent/60 py-3 text-[11px] font-medium tracking-[0.2em] uppercase text-accent bg-accent-light/10 hover:bg-accent hover:text-background transition-all duration-300 cursor-pointer'>
							Book A Table
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
