'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, CalendarDays, Check, Clock3, Camera, MapPin, Menu, Phone, Scissors, Star, Users, X } from 'lucide-react'

const bookingUrl = 'https://shops.getsquire.com/book/showtime-barbershop-milwaukee/barber'
const phone = '(414) 200-7875'

const services = [
  { name: 'Haircut', price: '$40', time: '30 min', detail: 'A clean, confident cut shaped to you.' },
  { name: 'Full Service Cut', price: '$50', time: '30 min', detail: 'Haircut + beard lining + eyebrows.', featured: true },
  { name: 'Hairline / Line-up', price: '$30', time: '30 min', detail: 'Keep the edges sharp between cuts.' },
  { name: 'Beard Service', price: '$30', time: '30 min', detail: 'A precise trim, shape, and finish.' },
]

const faqs = [
  ['How do I book?', 'Book online through Squire in under 30 seconds, or call the shop and we will help you find a time.'],
  ['Do you take walk-ins?', '[CONFIRM: walk-in availability with the shop before publishing.]'],
  ['Do you cut kids’ hair?', 'Yes. Showtime serves the whole family, including kids’ cuts. Call for pricing.'],
  ['Do you cut women’s hair?', 'Yes. Women’s cuts are welcome. Call for pricing and to talk through what you need.'],
  ['What is included in the Full Service Cut?', 'A haircut, beard lining, and eyebrow cleanup — the full refresh in one 30-minute appointment.'],
]

function ActionButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`flex ${compact ? 'gap-2' : 'flex-col gap-3 sm:flex-row'}`}>
      <a href={bookingUrl} target="_blank" rel="noreferrer" data-track="book-online" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#d4a24c] px-5 py-3 text-sm font-bold text-[#0b0b0c] transition hover:bg-[#e6b966] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a24c]">
        <CalendarDays aria-hidden="true" /> Book online <ArrowUpRight aria-hidden="true" />
      </a>
      <a href={`tel:${phone.replace(/\D/g, '')}`} data-track="call-now" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-5 py-3 text-sm font-bold text-[#f7f3eb] transition hover:border-[#d4a24c] hover:text-[#d4a24c] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#d4a24c]">
        <Phone aria-hidden="true" /> Call now
      </a>
    </div>
  )
}

function ReferenceImage({ src, alt, className = '' }: { src: string; alt: string; className?: string }) {
  return <div className={`relative min-h-48 overflow-hidden bg-[#171719] ${className}`}><img src={src} alt={alt} className="size-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0c]/65 via-transparent to-transparent" /></div>
}

export default function Page() {
  const [open, setOpen] = useState(false)
  const [faq, setFaq] = useState<number | null>(null)
  const [status, setStatus] = useState('Checking hours…')

  useEffect(() => {
    const update = () => {
      const now = new Date()
      const day = now.getDay()
      const minutes = now.getHours() * 60 + now.getMinutes()
      const isOpen = day >= 2 && day <= 5 ? minutes >= 600 && minutes < 1140 : day === 6 ? minutes >= 540 && minutes < 1020 : false
      setStatus(isOpen ? 'Open now · closes at 7pm' : day === 0 || day === 1 ? 'Opens Tuesday at 10am' : day === 6 && minutes >= 1020 ? 'Opens Tuesday at 10am' : 'Opens at 10am')
    }
    update()
    const timer = window.setInterval(update, 60000)
    return () => window.clearInterval(timer)
  }, [])

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'HairSalon',
    name: 'Showtime Barbershop',
    address: { '@type': 'PostalAddress', streetAddress: '3957 S Howell Ave', addressLocality: 'Milwaukee', addressRegion: 'WI', postalCode: '53207', addressCountry: 'US' },
    telephone: phone,
    priceRange: '$$',
    geo: { '@type': 'GeoCoordinates', latitude: 42.97242, longitude: -87.909968 },
    openingHours: ['Tu-Fr 10:00-19:00', 'Sa 09:00-17:00'],
    sameAs: ['[REPLACE: Google Business Profile URL]', '[REPLACE: Instagram URL]'],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }} />
      <main className="min-h-screen overflow-hidden bg-[#0b0b0c] text-[#f7f3eb]">
      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#0b0b0c]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
          <a href="#top" className="flex items-center gap-3" aria-label="Showtime Barbershop home">
            <span className="grid size-10 place-items-center border border-[#d4a24c] text-[#d4a24c]"><Scissors aria-hidden="true" /></span>
            <span className="font-display text-xl tracking-wide">SHOWTIME<span className="text-[#d4a24c]">.</span></span>
          </a>
          <nav className="hidden items-center gap-7 text-sm text-white/65 lg:flex" aria-label="Main navigation">
            <a href="#services" className="hover:text-[#d4a24c]">Services</a><a href="#about" className="hover:text-[#d4a24c]">About</a><a href="#visit" className="hover:text-[#d4a24c]">Visit</a>
          </nav>
          <div className="hidden lg:block"><ActionButtons compact /></div>
          <button type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? 'Close menu' : 'Open menu'} className="grid size-10 place-items-center border border-white/15 lg:hidden">{open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}</button>
        </div>
        {open && <nav className="flex flex-col gap-4 border-t border-white/10 px-5 py-5 text-sm lg:hidden"><a href="#services" onClick={() => setOpen(false)}>Services</a><a href="#about" onClick={() => setOpen(false)}>About</a><a href="#visit" onClick={() => setOpen(false)}>Visit us</a></nav>}
      </header>

      <section id="top" className="hero-grid relative isolate">
        <div className="spotlight spotlight-left" /><div className="spotlight spotlight-right" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-20 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-28">
          <div>
            <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.24em] text-[#d4a24c]"><span className="size-2 rounded-full bg-[#d4a24c]" /> South side Milwaukee</p>
            <h1 className="font-display max-w-3xl text-[clamp(4.6rem,13vw,9.5rem)] leading-[.82] tracking-tight">Your cut.<br /><span className="text-[#d4a24c]">Your show.</span></h1>
            <p className="mt-8 max-w-lg text-lg leading-relaxed text-white/65">Sharp cuts for the whole family, delivered with neighborhood pride. Walk out feeling like the main event.</p>
            <div className="mt-8"><ActionButtons /></div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-xs text-white/60"><span className="flex items-center gap-2"><span className="size-2 rounded-full bg-emerald-400" /> {status}</span><span className="h-4 w-px bg-white/20" /><span className="flex items-center gap-2 text-[#d4a24c]"><Star aria-hidden="true" fill="currentColor" /> <span className="text-white/60">[REPLACE: real Google rating]</span></span></div>
          </div>
          <div className="relative lg:pl-10"><ReferenceImage src="/showtime-hero.png" alt="Warmly lit interior of Showtime Barbershop" className="min-h-[390px] lg:min-h-[530px]" /><div className="absolute -bottom-5 -left-1 flex items-center gap-3 border border-[#d4a24c]/60 bg-[#0b0b0c] px-4 py-3 text-xs uppercase tracking-[.16em] text-[#d4a24c] lg:left-5"><Scissors aria-hidden="true" /> Est. Milwaukee</div></div>
        </div>
      </section>

      <section id="services" className="border-y border-white/10 bg-[#101011] px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="eyebrow">The lineup</p><h2 className="section-title">Pick your<br /><span>spotlight.</span></h2></div><p className="max-w-xs text-sm leading-relaxed text-white/55">Every service is performed with precision, care, and a little Showtime energy.</p></div><div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{services.map((service) => <article key={service.name} className={`ticket-card relative flex min-h-64 flex-col justify-between p-6 ${service.featured ? 'featured-ticket' : ''}`}><div>{service.featured && <span className="mb-5 inline-flex items-center gap-1 bg-[#d4a24c] px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#0b0b0c]"><Check aria-hidden="true" /> Best value</span>}<h3 className="font-display text-3xl tracking-wide">{service.name}</h3><p className="mt-3 text-sm leading-relaxed text-white/55">{service.detail}</p></div><div className="mt-8 flex items-end justify-between"><span className="font-display text-4xl text-[#d4a24c]">{service.price}</span><span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-white/45"><Clock3 aria-hidden="true" /> {service.time}</span></div></article>)}</div><p className="mt-6 text-xs text-white/40">Kids’ cuts + women’s cuts: call for pricing. <a href={`tel:${phone.replace(/\D/g, '')}`} className="text-[#d4a24c] underline underline-offset-4">{phone}</a></p></div></section>

      <section className="border-b border-white/10 bg-[#d4a24c] px-5 py-6 text-[#0b0b0c] lg:px-8"><div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between"><p className="font-display text-3xl tracking-wide">Cuts for everyone.</p><div className="flex flex-wrap gap-3 font-mono text-xs uppercase tracking-[.18em]"><span className="border border-[#0b0b0c]/30 px-4 py-2">Men</span><span className="border border-[#0b0b0c]/30 px-4 py-2">Women</span><span className="border border-[#0b0b0c]/30 px-4 py-2">Kids</span></div></div></section>

      <section id="about" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-2 lg:items-center lg:px-8 lg:py-28"><div><p className="eyebrow">More than a cut</p><h2 className="section-title">Neighborhood<br /><span>energy.</span></h2><p className="mt-7 max-w-lg text-lg leading-relaxed text-white/65">Showtime is a neighborhood Milwaukee barbershop built around precise cuts, good conversation, and making every person in the chair feel at home. Come in for the cut. Stay for the feeling.</p><div className="mt-8 grid max-w-md grid-cols-2 gap-5 border-t border-white/15 pt-5"><div><Users className="text-[#d4a24c]" aria-hidden="true" /><p className="mt-3 font-display text-2xl">All ages</p><p className="text-xs text-white/45">Family-friendly by design</p></div><div><MapPin className="text-[#d4a24c]" aria-hidden="true" /><p className="mt-3 font-display text-2xl">Bay View</p><p className="text-xs text-white/45">South side roots</p></div></div></div><ReferenceImage src="/showtime-detail.png" alt="Barber shaping a clean fade haircut" className="min-h-[340px] lg:min-h-[440px]" /></section>

      <section className="border-y border-white/10 bg-[#101011] px-5 py-20 lg:px-8 lg:py-28"><div className="mx-auto max-w-7xl"><div className="mb-12"><p className="eyebrow">The people</p><h2 className="section-title">Meet the<br /><span>team.</span></h2></div><div className="grid gap-4 md:grid-cols-3">{['Marco A.', 'The Showtime team', 'Your next barber'].map((name, i) => <article key={i}><ReferenceImage src={i === 0 ? '/showtime-barber.png' : i === 1 ? '/showtime-hero.png' : '/showtime-detail.png'} alt={i === 0 ? 'Showtime barber Marco A.' : name} className="min-h-72" /><div className="flex items-center justify-between border-x border-b border-white/10 p-4"><div><h3 className="font-display text-2xl">{name}</h3><p className="font-mono text-[10px] uppercase tracking-widest text-[#d4a24c]">Barber / stylist</p></div><Scissors className="text-white/30" aria-hidden="true" /></div></article>)}</div><p className="mt-5 text-xs text-white/40">Team names and specialties to confirm before publishing.</p></div></section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28"><div className="mb-12 flex items-end justify-between"><div><p className="eyebrow">The audience</p><h2 className="section-title">They said<br /><span>the show was good.</span></h2></div><Star className="hidden size-12 text-[#d4a24c] md:block" fill="currentColor" aria-hidden="true" /></div><div className="grid gap-4 md:grid-cols-3">{['[REPLACE: real Google review]', '[REPLACE: real Google review]', '[REPLACE: real Google review]'].map((review, i) => <blockquote key={i} className="border border-white/10 bg-[#101011] p-6"><div className="flex gap-1 text-[#d4a24c]">{[1,2,3,4,5].map((star) => <Star key={star} className="size-4" fill="currentColor" aria-hidden="true" />)}</div><p className="mt-6 text-lg leading-relaxed text-white/75">{review}</p><cite className="mt-8 block font-mono text-[10px] not-italic uppercase tracking-widest text-white/40">[REPLACE: reviewer name]</cite></blockquote>)}</div></section>

      <section className="border-y border-white/10 bg-[#101011] px-5 py-20 lg:px-8"><div className="mx-auto max-w-7xl"><div className="mb-10 flex items-end justify-between"><div><p className="eyebrow">Inside Showtime</p><h2 className="section-title">See the<br /><span>craft.</span></h2></div><p className="hidden text-sm text-white/40 md:block">Six frames from the shop — coming soon.</p></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{['/showtime-tools.png', '/showtime-detail.png', '/showtime-hero.png', '/showtime-barber.png', '/showtime-tools.png', '/showtime-detail.png'].map((src, i) => <ReferenceImage key={src + i} src={src} alt="Showtime Barbershop craft and atmosphere" className={`min-h-40 ${i === 0 || i === 3 ? 'md:min-h-72' : 'md:min-h-56'}`} />)}</div></div></section>

      <section id="visit" className="mx-auto grid max-w-7xl gap-12 px-5 py-20 lg:grid-cols-[.8fr_1.2fr] lg:px-8 lg:py-28"><div><p className="eyebrow">Take your seat</p><h2 className="section-title">Visit<br /><span>us.</span></h2><address className="mt-8 flex items-start gap-3 not-italic text-white/70"><MapPin className="mt-1 shrink-0 text-[#d4a24c]" aria-hidden="true" /><span>3957 S Howell Ave<br />Milwaukee, WI 53207</span></address><a href={`tel:${phone.replace(/\D/g, '')}`} className="mt-5 flex items-center gap-3 text-white/70 hover:text-[#d4a24c]"><Phone className="text-[#d4a24c]" aria-hidden="true" />{phone}</a><div className="mt-8 border-t border-white/10 pt-6"><p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-[#d4a24c]">Hours · [CONFIRM]</p>{[['Tue–Fri','10am–7pm'],['Saturday','9am–5pm'],['Sun–Mon','Closed']].map(([day, hours]) => <div key={day} className="flex justify-between border-b border-white/10 py-3 text-sm"><span className="text-white/55">{day}</span><span>{hours}</span></div>)}</div><a href="https://www.google.com/maps/dir/?api=1&destination=42.97242,-87.909968" target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#d4a24c] underline underline-offset-4">Get directions <ArrowUpRight aria-hidden="true" /></a></div><div className="min-h-[420px] overflow-hidden border border-white/10 bg-[#171719]"><iframe title="Showtime Barbershop map" src="https://www.google.com/maps?q=42.97242,-87.909968&z=15&output=embed" loading="lazy" className="size-full min-h-[420px] grayscale invert-[.9] opacity-70" /></div></section>

      <section className="border-t border-white/10 px-5 py-20 lg:px-8"><div className="mx-auto max-w-3xl"><div className="mb-12"><p className="eyebrow">Good to know</p><h2 className="section-title">Questions,<br /><span>answered.</span></h2></div><div className="divide-y divide-white/10">{faqs.map(([question, answer], i) => <div key={question}><button type="button" className="flex w-full items-center justify-between gap-4 py-5 text-left font-display text-2xl tracking-wide" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}><span>{question}</span><span className="text-[#d4a24c]">{faq === i ? '−' : '+'}</span></button>{faq === i && <p className="max-w-2xl pb-6 text-sm leading-relaxed text-white/55">{answer}</p>}</div>)}</div></div></section>

      <footer className="border-t border-white/10 bg-[#101011] px-5 pb-28 pt-12 lg:px-8 lg:pb-12"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row"><div><div className="flex items-center gap-3"><span className="grid size-9 place-items-center border border-[#d4a24c] text-[#d4a24c]"><Scissors aria-hidden="true" /></span><span className="font-display text-2xl">SHOWTIME<span className="text-[#d4a24c]">.</span></span></div><p className="mt-5 max-w-xs text-sm leading-relaxed text-white/45">Your neighborhood barbershop on the south side of Milwaukee.</p></div><div className="flex flex-col gap-3 text-sm text-white/60"><a href={`tel:${phone.replace(/\D/g, '')}`} className="hover:text-[#d4a24c]">{phone}</a><a href="#visit" className="hover:text-[#d4a24c]">3957 S Howell Ave, Milwaukee</a><a href="#visit" className="hover:text-[#d4a24c]">Tue–Fri 10am–7pm · Sat 9am–5pm</a></div><div><a href="#" aria-label="Instagram" className="grid size-10 place-items-center border border-white/15 text-white/70 hover:border-[#d4a24c] hover:text-[#d4a24c]"><Camera aria-hidden="true" /></a><p className="mt-5 font-mono text-[10px] uppercase tracking-widest text-white/35">© 2026 Showtime Barbershop</p></div></div></footer>
      <div className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-white/15 bg-[#0b0b0c]/95 p-2 backdrop-blur-md lg:hidden"><a href={`tel:${phone.replace(/\D/g, '')}`} data-track="mobile-call-now" className="flex items-center justify-center gap-2 py-3 text-sm font-bold"><Phone aria-hidden="true" /> Call now</a><a href={bookingUrl} target="_blank" rel="noreferrer" data-track="mobile-book-online" className="flex items-center justify-center gap-2 rounded-full bg-[#d4a24c] py-3 text-sm font-bold text-[#0b0b0c]"><CalendarDays aria-hidden="true" /> Book online</a></div>
      </main>
    </>
  )
}
