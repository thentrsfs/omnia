'use client';
import Link from 'next/link';

export default function Footer() {
	return (
		<footer className='w-full bg-black/10 border-t border-white/[0.03] pt-24 pb-12 mt-12'>
			<div className='max-w-6xl mx-auto px-6 lg:px-12 grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24'>
				{/* LEVA STRANA - INFORMACIJE */}
				<div className='flex flex-col space-y-8'>
					<div>
						<span className='font-serif text-3xl font-light tracking-[0.15em] text-text-primary block mb-3'>
							GUSTO<span className='text-accent font-sans font-bold'>.</span>
						</span>
						<p className='text-sm text-text-primary/50 font-sans leading-relaxed max-w-xs'>
							An extraordinary culinary journey celebrating raw ingredients and
							transformed by fire.
						</p>
					</div>

					<div className='grid grid-cols-2 gap-8'>
						<div>
							<span className='text-[10px] font-bold tracking-widest uppercase text-accent block mb-3'>
								Location
							</span>
							<p className='text-xs text-text-primary/70 font-sans leading-relaxed'>
								123 Luxury Ave
								<br />
								Manhattan, NY 10001
							</p>
						</div>
						<div>
							<span className='text-[10px] font-bold tracking-widest uppercase text-accent block mb-3'>
								Hours
							</span>
							<p className='text-xs text-text-primary/70 font-sans leading-relaxed'>
								Mon - Sat: 17:00 - 23:00
								<br />
								Sunday: Closed
							</p>
						</div>
					</div>
				</div>

				{/* DESNA STRANA - LINKOVI & KONEKCIJA */}
				<div className='flex flex-col justify-between space-y-12 md:space-y-0 md:items-end'>
					{/* Navigacija unutar footera */}
					<div className='flex flex-col md:items-end space-y-3'>
						<span className='text-[10px] font-bold tracking-widest uppercase text-accent block mb-1'>
							Navigation
						</span>
						<Link
							href='/menu'
							className='text-xs text-text-primary/60 hover:text-accent transition-colors duration-300 font-sans'>
							The Menu
						</Link>
						<Link
							href='/about'
							className='text-xs text-text-primary/60 hover:text-accent transition-colors duration-300 font-sans'>
							Our Story
						</Link>
						<Link
							href='/reservations'
							className='text-xs text-text-primary/60 hover:text-accent transition-colors duration-300 font-sans'>
							Book a Table
						</Link>
					</div>

					{/* Socials & Copyright */}
					<div className='flex flex-col md:items-end space-y-4 w-full border-t border-white/[0.02] pt-8 md:border-none md:pt-0'>
						<div className='flex space-x-6'>
							<a
								href='#'
								className='text-xs text-text-primary/40 hover:text-accent transition-colors duration-300 font-sans tracking-wider uppercase'>
								Instagram
							</a>
							<a
								href='#'
								className='text-xs text-text-primary/40 hover:text-accent transition-colors duration-300 font-sans tracking-wider uppercase'>
								Facebook
							</a>
						</div>
						<p className='text-[10px] text-text-primary/30 font-sans tracking-wide'>
							© {new Date().getFullYear()} GUSTO. All rights reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
}
