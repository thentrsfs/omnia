'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Registrujemo plugin odmah na vrhu
gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
	onMenuClick: () => void;
	onBookClick: () => void;
}

export default function Hero({ onMenuClick, onBookClick }: HeroProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const bgRef = useRef<HTMLDivElement>(null);
	const textRef = useRef<HTMLDivElement>(null);
	const buttonsRef = useRef<HTMLDivElement>(null);

	useGSAP(
		() => {
			// 1. INTRO ANIMACIJA (Kada se stranica učita)
			const tl = gsap.timeline({ defaults: { ease: 'power4.out' } });

			tl.fromTo(
				'.hero-subtitle',
				{ opacity: 0, y: 20, letterSpacing: '0.1em' },
				{ opacity: 1, y: 0, letterSpacing: '0.3em', duration: 1.2, delay: 0.2 },
			)
				.fromTo(
					'.hero-title-line',
					{ opacity: 0, y: 40, skewY: 2 },
					{ opacity: 1, y: 0, skewY: 0, duration: 1.2, stagger: 0.2 },
					'-=0.8',
				)
				.fromTo(
					'.hero-desc',
					{ opacity: 0, y: 20 },
					{ opacity: 1, y: 0, duration: 1 },
					'-=0.8',
				)
				.fromTo(
					'.hero-btn',
					{ opacity: 0, scale: 0.95 },
					{ opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
					'-=0.6',
				);

			// 2. SCROLL TRIGGER ANIMACIJA (Reaguje na skrol prsta)
			gsap.to(bgRef.current, {
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: 'bottom top',
					scrub: true, // Veže brzinu animacije direktno za prst
				},
				scale: 1.15,
				y: 100,
				opacity: 0.1, // Polako bledi u mrak kako skroluješ
			});

			gsap.to(textRef.current, {
				scrollTrigger: {
					trigger: containerRef.current,
					start: 'top top',
					end: 'bottom top',
					scrub: true,
				},
				y: -50,
				opacity: 0,
			});
		},
		{ scope: containerRef },
	); // Scope zaključava selektore unutar ovog kontejnera

	return (
		<section
			ref={containerRef}
			className='relative h-dvh w-full overflow-hidden bg-black flex items-center justify-center'>
			<div
				ref={bgRef}
				className='absolute inset-0 w-full h-full scale-105'>
				<video
					autoPlay
					loop
					muted
					playsInline
					poster='/images/restaurant-poster.png'
					className='w-full h-full object-cover object-center opacity-50 grayscale-10'>
					{/* Zameni ovaj link sa tvojim optimizovanim videom kasnije */}
					<source
						src='/video/video-bg-1.mp4'
						type='video/mp4'
					/>
				</video>
			</div>

			{/* LUKSUZNI GRADIENT OVERLAY */}
			<div className='absolute inset-0 bg-linear-to-t from-background via-background/40 to-background/80 z-10' />

			{/* SADRŽAJ */}
			<div
				ref={textRef}
				className='relative z-20 mx-auto max-w-5xl px-6 text-center flex flex-col items-center justify-center h-full pt-24'>
				<span className='hero-subtitle text-[10px] md:text-xs font-medium tracking-[0.3em] uppercase text-accent mb-4 md:mb-6 opacity-0'>
					Culinary Excellence & Design
				</span>

				<h1 className='font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide text-text-primary leading-[1.05] max-w-4xl'>
					<div className='hero-title-line inline-block opacity-0'>
						Crafting unforgettable
					</div>{' '}
					<br />
					<div className='hero-title-line inline-block italic font-normal text-transparent bg-clip-text bg-linear-to-r from-text-primary via-accent to-text-primary opacity-0'>
						dining stories
					</div>
				</h1>

				<p className='hero-desc mt-6 md:mt-8 text-sm md:text-base text-text-secondary font-light max-w-xs md:max-w-lg leading-relaxed tracking-wide opacity-0'>
					A seamless fusion of modern technology and high-end gastronomy.
					Explore our curated digital menu or secure your table tonight.
				</p>

				{/* DUGMADI */}
				<div
					ref={buttonsRef}
					className='mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto px-6'>
					<button
						onClick={onMenuClick}
						className='hero-btn w-full sm:w-auto px-8 py-4 bg-accent hover:bg-accent-hover text-background text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 shadow-xl cursor-pointer opacity-0'>
						Explore The Menu
					</button>

					<button
						onClick={onBookClick}
						className='hero-btn w-full sm:w-auto px-8 py-4 border border-border bg-surface/20 backdrop-blur-sm hover:border-accent text-text-primary text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 cursor-pointer opacity-0'>
						Book A Table
					</button>
				</div>
			</div>

			<div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 opacity-50'>
				<span className='text-[9px] tracking-[0.2em] uppercase text-text-secondary'>
					Scroll
				</span>
				<div className='w-px h-12 bg-linear-to-b from-accent to-transparent' />
			</div>
		</section>
	);
}
