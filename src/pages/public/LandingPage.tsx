import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  AlertTriangle,
  Bell,
  Heart,
  MapPinned,
  Menu,
  Navigation,
  Route as RouteIcon,
  Ship,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { IconButton } from '@/components/ui/IconButton';
import { Drawer } from '@/components/ui/Drawer';
import { AboutSection } from '@/features/landing/AboutSection';
import { HowItWorksSection } from '@/features/landing/HowItWorksSection';
import { BenefitsSection } from '@/features/landing/BenefitsSection';
import { FAQSection } from '@/features/landing/FAQSection';
import { ContactSection } from '@/features/landing/ContactSection';

const features = [
  {
    icon: Navigation,
    title: 'Plan smarter journeys',
    description: 'Compare road and ferry options across Lagos and pick the fastest, cheapest route.',
  },
  {
    icon: MapPinned,
    title: 'Explore an interactive map',
    description: 'See BRT corridors, ferry routes, stops and live incidents overlaid on Lagos.',
  },
  {
    icon: AlertTriangle,
    title: 'Report incidents in real time',
    description: 'Flag traffic, flooding or ferry delays so other commuters can plan around them.',
  },
  {
    icon: Bell,
    title: 'Stay in the loop',
    description: 'Get notified about disruptions on the routes and locations you care about.',
  },
  {
    icon: Heart,
    title: 'Save favourite places',
    description: 'Bookmark home, work and frequent stops for one-tap trip planning.',
  },
  {
    icon: RouteIcon,
    title: 'Browse every route',
    description: 'Fares, frequency and operators for BRT, bus and ferry routes across the city.',
  },
];

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#features', label: 'Features' },
  { href: '#how-it-works', label: 'How it works' },
  { href: '#benefits', label: 'Benefits' },
  { href: '#faq', label: 'FAQ' },
  { href: '#contact', label: 'Contact' },
];

export function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 z-30 border-b border-ink/5 bg-surface/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="#" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-xl bg-primary-700 text-white">
              <RouteIcon className="size-5" />
            </span>
            <span className="text-lg font-semibold text-ink">FlowTransit</span>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-medium text-ink-muted hover:text-ink">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Link to="/login" className="hidden sm:block">
              <Button variant="ghost" size="sm">
                Sign in
              </Button>
            </Link>
            <Link to="/register">
              <Button size="sm">Get started</Button>
            </Link>
            <IconButton
              icon={<Menu className="size-5" />}
              label="Open menu"
              variant="ghost"
              className="lg:hidden"
              onClick={() => setMenuOpen(true)}
            />
          </div>
        </div>
      </header>

      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} title="Menu">
        <nav className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/login"
            onClick={() => setMenuOpen(false)}
            className="mt-2 rounded-xl px-3 py-2.5 text-sm font-medium text-ink hover:bg-surface-muted"
          >
            Sign in
          </Link>
        </nav>
      </Drawer>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2 lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary-50 px-3 py-1 text-xs font-medium text-primary-700">
            <Sparkles className="size-3.5" /> Built for Lagos commuters
          </span>
          <h1 className="mt-4 text-3xl font-semibold leading-tight text-ink sm:text-4xl lg:text-5xl">
            Get across Lagos, by road or water, without the guesswork.
          </h1>
          <p className="mt-4 max-w-lg text-base text-ink-muted">
            FlowTransit brings BRT, bus and ferry routes together in one place, plans your journey,
            and warns you about incidents before you set off.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link to="/register">
              <Button size="lg">Plan your first trip</Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline">
                I already have an account
              </Button>
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="relative"
        >
          <div className="relative overflow-hidden rounded-3xl border border-ink/5 bg-gradient-to-br from-primary-700 via-primary-600 to-secondary-500 p-6 shadow-card-hover">
            <svg viewBox="0 0 320 220" className="w-full opacity-90" aria-hidden>
              <path
                d="M20 180 C 80 120, 120 160, 160 100 S 260 40, 300 30"
                fill="none"
                stroke="white"
                strokeWidth="3"
                strokeDasharray="2 10"
                strokeLinecap="round"
              />
              <path
                d="M30 40 C 90 60, 150 30, 210 70 S 280 150, 300 190"
                fill="none"
                stroke="#A5F3FC"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {[
                [20, 180],
                [160, 100],
                [300, 30],
                [30, 40],
                [210, 70],
                [300, 190],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r={5} fill="white" />
              ))}
            </svg>
            <div className="mt-2 flex items-center gap-2 text-white">
              <Ship className="size-5" />
              <p className="text-sm font-medium">Marina → Ikorodu ferry: 65 min, ₦1,200</p>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-20 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-ink">
          Everything you need for your daily commute
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.05 }}
            >
              <Card hover className="h-full">
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <Icon className="size-5" />
                </span>
                <p className="mt-3 font-medium text-ink">{title}</p>
                <p className="mt-1 text-sm text-ink-muted">{description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <AboutSection />
      <HowItWorksSection />
      <BenefitsSection />
      <FAQSection />
      <ContactSection />

      <footer className="border-t border-ink/5 bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex size-8 items-center justify-center rounded-lg bg-primary-700 text-white">
                  <RouteIcon className="size-4" />
                </span>
                <span className="font-semibold text-ink">FlowTransit</span>
              </div>
              <p className="mt-3 text-sm text-ink-muted">Smart transit for Lagos, by road and water.</p>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Product</p>
              <div className="flex flex-col gap-2 text-sm text-ink-muted">
                <a href="#features" className="hover:text-ink">Features</a>
                <a href="#how-it-works" className="hover:text-ink">How it works</a>
                <a href="#benefits" className="hover:text-ink">Benefits</a>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Company</p>
              <div className="flex flex-col gap-2 text-sm text-ink-muted">
                <a href="#about" className="hover:text-ink">About</a>
                <a href="#faq" className="hover:text-ink">FAQ</a>
                <a href="#contact" className="hover:text-ink">Contact</a>
              </div>
            </div>
            <div>
              <p className="mb-3 text-sm font-semibold text-ink">Get started</p>
              <div className="flex flex-col gap-2 text-sm text-ink-muted">
                <Link to="/register" className="hover:text-ink">Create an account</Link>
                <Link to="/login" className="hover:text-ink">Sign in</Link>
              </div>
            </div>
          </div>
          <div className="mt-10 border-t border-ink/10 pt-6 text-center text-sm text-ink-subtle">
            Built as a university software engineering project. FlowTransit, {new Date().getFullYear()}.
          </div>
        </div>
      </footer>
    </div>
  );
}
