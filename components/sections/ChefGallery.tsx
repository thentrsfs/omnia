'use client';

import { useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';

import { SIGNATURE_DISHES } from '@/app/data/dishes';

gsap.registerPlugin(ScrollTrigger);

export default function ChefGallery() {
	const targetRef = useRef<HTMLDivElement>(null);
	const scrollContainerRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);

	// State koji prati koje su slike završile učitavanje
	const [loadedImages, setLoadedImages] = useState<{ [key: number]: boolean }>(
		{},
	);

	useGSAP(
		() => {
			gsap.fromTo(
				[titleRef.current, scrollContainerRef.current],
				{
					opacity: 0,
					y: 50, // Kreću malo niže
				},
				{
					opacity: 1,
					y: 0, // Dolaze na svoje prirodno mesto
					duration: 1,
					stagger: 0.2, // Prvo se pojavi naslov, pa delić sekunde kasnije i slike
					ease: 'power4.out',
					scrollTrigger: {
						trigger: targetRef.current,
						start: 'top 80%', // Aktivira se čim vrh sekcije uđe u donji deo ekrana
						toggleActions: 'play none none none', // Odigra se samo jednom pri ulasku
					},
				},
			);

			const isDesktop = window.matchMedia('(min-width: 1024px)').matches;

			if (isDesktop && scrollContainerRef.current && targetRef.current) {
				const scrollWidth = scrollContainerRef.current.scrollWidth;
				const amountToScroll = scrollWidth - window.innerWidth;

				// Glavni horizontalni skrol
				gsap.to(scrollContainerRef.current, {
					x: -amountToScroll,
					ease: 'none',
					scrollTrigger: {
						trigger: targetRef.current,
						pin: true,
						scrub: 1,
						start: 'top top',
						end: () => `+=${amountToScroll}`,
						invalidateOnRefresh: true,
					},
				});

				// Parallax za slike
				gsap.utils.toArray<HTMLElement>('.gallery-img').forEach((img) => {
					gsap.to(img, {
						x: 30,
						ease: 'none',
						scrollTrigger: {
							trigger: img,
							containerAnimation: gsap.getById('scrollContainer'),
							scrub: true,
						},
					});
				});
			}
		},
		{ scope: targetRef },
	);

	return (
		<section
			ref={targetRef}
			className='relative lg:h-dvh bg-background w-full lg:overflow-hidden flex flex-col'>
			{/* VRAĆENI STICKY NASLOV - Spušten na bezbednih top-28 i ima automatsko fejdovanje na skrol */}
			<div
				ref={titleRef}
				className='z-20 pointer-events-none transition-opacity duration-300 opacity-100 sticky lg:top-34 w-full flex flex-col justify-center items-center lg:pb-0 pb-10'>
				<span className='text-[10px] font-bold tracking-[0.4em] uppercase text-accent mb-2 block opacity-60'>
					Visual Identity
				</span>
				<h2 className='font-serif text-3xl lg:text-4xl font-light text-text-primary leading-tight drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]'>
					Seasonal <br />
					<span className='italic text-accent font-normal'>Creations.</span>
				</h2>
			</div>

			{/* HORIZONTALNI KONTEJNER - Visina i pozicija su vraćene na prvu verziju */}
			<div
				ref={scrollContainerRef}
				className='flex flex-col lg:flex-row gap-8 lg:gap-12 px-6 lg:px-48 items-center h-full w-full lg:w-max raw-scroll'>
				{SIGNATURE_DISHES.map((dish) => (
					<div
						key={dish.id}
						className='w-full sm:w-md lg:w-120 h-88 lg:h-125 shrink-0 overflow-hidden relative group'>
						{/* SVIJETLEĆI KRUŽIĆ (SPINNER) - Vidi se samo dok je !loadedImages[dish.id] */}
						{!loadedImages[dish.id] && (
							<div className='absolute z-20 flex flex-col items-center gap-3 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
								<div className='w-8 h-8 border-2 border-accent/20 border-t-accent rounded-full animate-spin' />
								<span className='text-[10px] tracking-widest uppercase font-serif text-text-primary/40 animate-pulse'>
									Loading
								</span>
							</div>
						)}
						<div className='absolute -inset-px bg-black/35 group-hover:bg-black/12 transition-colors duration-500  z-10' />
						<div className='absolute -inset-px bg-linear-to-t from-black/80 via-transparent to-transparent z-10' />

						<Image
							src={dish.img}
							alt={dish.name}
							fill
							sizes='(max-width: 1024px) 100vw, 480px'
							priority={dish.id <= 3}
							onLoad={() => {
								setLoadedImages((prev) => ({ ...prev, [dish.id]: true }));
							}}
							className={`w-full h-full object-cover object-center transition-opacity duration-700 ${
								loadedImages[dish.id] ? 'opacity-100' : 'opacity-0'
							}`}
						/>
						<div className='absolute bottom-8 left-8 z-20'>
							<span className='text-[9px] font-bold tracking-[0.3em] uppercase text-accent mb-2 block'>
								{dish.tag}
							</span>
							<h3 className='font-serif text-xl lg:text-2xl font-light text-text-primary group-hover:text-accent transition-colors duration-300'>
								{dish.name}
							</h3>
						</div>
					</div>
				))}
			</div>
		</section>
	);
}
