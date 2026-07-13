'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Obavezno registrujemo ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const titleRef = useRef<HTMLDivElement>(null);
	const videoContainerRef = useRef<HTMLDivElement>(null);
	const videoRef = useRef<HTMLVideoElement>(null);
	const textContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			// 1. Animacija naslova (lagani ulazak odozdo sa fade-in-om)
			gsap.fromTo(
				titleRef.current,
				{ opacity: 0, y: 40 },
				{
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: titleRef.current,
						start: 'top 85%',
						toggleActions: 'play none none reverse',
					},
				},
			);

			// 2. Animacija celog video kontejnera (izranjanje)
			gsap.fromTo(
				videoContainerRef.current,
				{ opacity: 0, y: 60 },
				{
					opacity: 1,
					y: 0,
					duration: 1.2,
					ease: 'power3.out',
					scrollTrigger: {
						trigger: videoContainerRef.current,
						start: 'top 80%',
						toggleActions: 'play none none reverse',
					},
				},
			);

			// 3. BRUTALAN PARALLAX EFEKAT NA VIDEO (Suptilno zumiranje dok skroluješ)
			if (videoRef.current) {
				gsap.fromTo(
					videoRef.current,
					{ scale: 1.4, yPercent: -15 },
					{
						scale: 1.0,
						yPercent: 15,
						ease: 'none',
						scrollTrigger: {
							trigger: videoContainerRef.current,
							start: 'top bottom', // kreće čim dno ekrana dotakne vrh videa
							end: 'bottom 30%', // završava se kad video skroz ode gore
							scrub: 1, // ključno! vezuje brzinu animacije direktno za prst na skrolu
						},
					},
				);
			}

			// 4. Elegantno paljenje teksta preko videa (tek kad je kontejner na sredini)
			if (textContainerRef.current) {
				const children = textContainerRef.current.children;
				gsap.fromTo(
					children,
					{ opacity: 0, y: 20 },
					{
						opacity: 1,
						y: 0,
						duration: 1,
						stagger: 0.3, // Prvo 'The Art of Fire', pa 0.3s kasnije citat
						ease: 'power2.out',
						scrollTrigger: {
							trigger: videoContainerRef.current,
							start: 'top 60%', // pali se kad gornja ivica videa dođe do 60% visine ekrana
							toggleActions: 'play none none reverse',
						},
					},
				);
			}
		}, sectionRef);

		return () => ctx.revert(); // Čišćenje memorije kada se komponenta unmount-uje
	}, []);
	return (
		<section
			ref={sectionRef}
			className='w-full py-24 relative overflow-hidden'>
			<div className='max-w-6xl mx-auto px-6 lg:px-12'>
				{/* NASLOV SEKCIJE */}

				<div
					ref={titleRef}
					className='menu-title-anim text-center mb-20'>
					<span className='text-[10px] font-bold tracking-[0.4em] uppercase text-accent mb-3 block'>
						The Ambiance
					</span>
					<h2 className='font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary'>
						A Feast for the <span className='italic text-accent'>Senses.</span>
					</h2>
					<div className='w-12 h-px bg-accent/40 mx-auto mt-4' />
				</div>

				{/* GLAVNI VIDEO / SLIKA KONTEJNER */}

				<div
					ref={videoContainerRef}
					className='relative w-full h-86 md:h-125 rounded-xl overflow-hidden border border-white/3 group shadow-2xl'>
					{/* Tamni overlay preko videa/slike da tekst lakše skače */}
					<div className='absolute inset-0 bg-background/55 group-hover:bg-black/40 transition-colors duration-700 ease-out z-10' />

					<video
						ref={videoRef}
						src='/video/experience.mp4'
						autoPlay
						loop
						muted
						className='absolute inset-0 w-full h-full object-cover object-center brightness-90 will-change-transform'
					/>

					{/* TEKST PREKO VIDEA/SLIKE - Pozicioniran u centru ili u ćošku */}
					<div
						ref={textContainerRef}
						className='absolute inset-0 flex flex-col justify-center items-center text-center p-6 z-20 pointer-events-none'>
						{/* Prvo ide manji natpis kao uvod */}
						<span className='text-[9px] tracking-[0.3em] uppercase text-accent font-sans font-semibold mb-4'>
							The Art of Fire
						</span>

						{/* Pa moćan citat */}
						<p className='font-serif italic text-xl md:text-2xl text-text-primary max-w-2xl font-light leading-relaxed'>
							&quot;A culinary performance where raw precision meets the
							transformative power of open flame.&quot;
						</p>
					</div>
				</div>
			</div>
		</section>
	);
}
