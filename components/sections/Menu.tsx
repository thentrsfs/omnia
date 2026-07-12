'use client';

import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Simulacija pravog, velikog menija sa dosta artikala
const FULL_MENU_DATA = {
	starters: [
		{
			id: 's1',
			name: 'Wagyu Beef Tartare',
			price: '$28',
			desc: 'Hand-cut premium Wagyu, cured egg yolk, black truffle shavings, toasted brioche.',
		},
		{
			id: 's2',
			name: 'Atlantic Scallops',
			price: '$24',
			desc: 'Parsnip purée, crispy pancetta, browned butter, microgreens.',
		},
		{
			id: 's3',
			name: 'Burrata D.O.P.',
			price: '$19',
			desc: 'Heirloom tomatoes, wild basil pesto, aged balsamic caviar, crispy focaccia.',
		},
		{
			id: 's4',
			name: 'Foie Gras Torchon',
			price: '$32',
			desc: 'Sauternes jelly, pickled mustard seeds, toasted brioche brioche.',
		},
		{
			id: 's5',
			name: 'Truffle Arancini',
			price: '$16',
			desc: 'Wild mushroom risotto spheres, mozzarella heart, shaved parmesan.',
		},
		{
			id: 's6',
			name: 'Octopus Carpaccio',
			price: '$26',
			desc: 'Citrus segments, caper berries, pink peppercorn, extra virgin olive oil.',
		},
	],
	mains: [
		{
			id: 'm1',
			name: 'Dry-Aged Tomahawk',
			price: '$145',
			desc: '35-day custom dry-aged beef, roasted bone marrow, smoked sea salt.',
		},
		{
			id: 'm2',
			name: 'Glazed Duck Breast',
			price: '$42',
			desc: 'Spiced honey glaze, sweet potato fondant, blackberry reduction.',
		},
		{
			id: 'm3',
			name: 'Chilean Sea Bass',
			price: '$48',
			desc: 'Saffron infused broth, baby pak choi, heirloom cherry tomatoes.',
		},
		{
			id: 'm4',
			name: 'Truffle Tagliolini',
			price: '$36',
			desc: 'House-made egg pasta, cultured butter, generous shaving of seasonal black truffle.',
		},
		{
			id: 'm5',
			name: 'Lamb Cannon',
			price: '$52',
			desc: 'Herb-crusted lamb loin, pea purée, glazed roscoff onion, red wine jus.',
		},
		{
			id: 'm6',
			name: 'Roasted Cauliflower Steak',
			price: '$28',
			desc: 'Almond romesco, herb oil, toasted pine nuts, pomegranate gems.',
		},
	],
	drinks: [
		{
			id: 'd1',
			name: 'Rosemary Old Fashioned',
			price: '$18',
			desc: 'Bourbon, angostura bitters, house-infused smoked rosemary syrup.',
		},
		{
			id: 'd2',
			name: 'The Gold Leaf Martini',
			price: '$22',
			desc: 'Premium dry gin, dry vermouth, edible 24k gold leaf flake.',
		},
		{
			id: 'd3',
			name: 'Smoked Mezcalita',
			price: '$19',
			desc: 'Artisanal mezcal, fresh lime, agave, hibiscus-salt rim, applewood smoke.',
		},
	],
};

type Category = 'starters' | 'mains' | 'drinks';

export default function Menu() {
	const [activeCategory, setActiveCategory] = useState<Category>('starters');
	const containerRef = useRef<HTMLDivElement>(null);

	// ScrollTrigger koji hvata celu sekciju kada uđe u vidokrug
	useGSAP(
		() => {
			gsap.fromTo(
				['.menu-title-anim', '.menu-filters'],
				{ opacity: 0, y: 40 },
				{
					scrollTrigger: {
						trigger: containerRef.current,
						start: 'top 80%',
					},
					opacity: 1,
					y: 0,
					duration: 1,
					ease: 'power3.out',
					delay: 0.15,
				},
			);
		},
		{ scope: containerRef },
	);

	// Animacija koja osvežava stavke menija sa savršenim stagger-om kada se promeni tab
	useGSAP(() => {
		gsap.fromTo(
			'.grid-item-anim',
			{ opacity: 0, y: 25 },
			{
				opacity: 1,
				y: 0,
				duration: 0.5,
				stagger: 0.08, // Brz i fluidan prelaz između stavki da ne zamara korisnika
				ease: 'power2.out',
			},
		);
	}, [activeCategory]);

	return (
		<section
			id='menu'
			ref={containerRef}
			className='py-32 lg:min-h-dvh w-full relative z-30'>
			<div className='mx-auto max-w-6xl px-6 lg:px-12'>
				{/* ZAGLAVLJE MENIJA */}
				<div className='menu-title-anim text-center mb-20'>
					<span className='text-[10px] font-bold tracking-[0.4em] uppercase text-accent mb-3 block'>
						A Culinary Journey
					</span>
					<h2 className='font-serif text-4xl md:text-5xl font-light tracking-tight text-text-primary'>
						The Main <span className='italic text-accent'>Menu.</span>
					</h2>
					<div className='w-12 h-px bg-accent/40 mx-auto mt-4' />
				</div>

				{/* LUKSUZNI FILTERI (KATEGORIJE) */}
				<div className='menu-filters flex justify-center space-x-10 md:space-x-16 mb-20 text-[11px] font-bold tracking-[0.25em] border-b border-border/10 pb-4'>
					{(['starters', 'mains', 'drinks'] as Category[]).map((cat) => (
						<button
							key={cat}
							onClick={() => setActiveCategory(cat)}
							className={`pb-4 relative transition-all duration-300 cursor-pointer uppercase ${
								activeCategory === cat
									? 'text-text-primary'
									: 'text-text-secondary hover:text-text-primary'
							}`}>
							{cat}
							{activeCategory === cat && (
								<span className='absolute bottom-0 left-0 right-0 h-[1.5px] bg-accent animate-fade-in' />
							)}
						</button>
					))}
				</div>

				{/* BRUTALAN DVOKOLONSKI GRID SPREMAN ZA STOTINE ARTIKALA */}
				<div className='grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 items-start'>
					{FULL_MENU_DATA[activeCategory].map((item) => (
						<div
							key={item.id}
							className='grid-item-anim group flex flex-col pb-8 border-b border-border/10 hover:border-accent/30 transition-colors duration-300'>
							<div className='flex justify-between items-baseline mb-2.5'>
								{/* Naziv jela sa mikro pomeranjem na hover */}
								<h3 className='font-serif text-xl font-light text-text-primary group-hover:text-accent group-hover:translate-x-1 transition-all duration-300'>
									{item.name}
								</h3>

								{/* Linija spajalica (Dot leader) - daje onaj pravi restoranski vajb */}
								<div className='grow mx-4 border-b border-dotted border-border/30 group-hover:border-accent/20 transition-colors' />

								{/* Cena */}
								<span className='font-sans text-sm font-semibold tracking-wider text-text-primary group-hover:scale-105 transition-transform'>
									{item.price}
								</span>
							</div>

							{/* Opis jela */}
							<p className='text-xs text-text-secondary font-light tracking-wide leading-relaxed max-w-xl'>
								{item.desc}
							</p>

							{/* Suptilna, luksuzna "Add to order" akcija na dnu koja se pali na hover */}
							<div className='h-0 opacity-0 group-hover:h-5 group-hover:opacity-100 group-hover:mt-3 overflow-hidden transition-all duration-300 flex justify-end'>
								<button className='text-[10px] font-bold tracking-[0.15em] uppercase text-accent hover:text-text-primary transition-colors flex items-center gap-1 cursor-pointer'>
									Add to order <span className='font-sans font-bold'>+</span>
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
}
