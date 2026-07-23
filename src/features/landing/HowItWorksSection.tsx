import { motion } from 'framer-motion';
import { AlertTriangle, MapPinned, Navigation, Search } from 'lucide-react';

const steps = [
  { icon: Search, title: 'Tell us where you\'re headed', description: 'Search your origin and destination from real Lagos areas and landmarks.' },
  { icon: Navigation, title: 'Compare your options', description: 'See road, ferry and mixed routes side by side with duration, fare and transfers.' },
  { icon: MapPinned, title: 'Follow it on the map', description: 'Track stops, routes and your journey on an interactive Lagos map.' },
  { icon: AlertTriangle, title: 'Stay ahead of disruptions', description: 'Get notified about incidents reported by other commuters before you set off.' },
];

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 bg-surface-muted py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="mb-10 text-center text-2xl font-semibold text-ink sm:text-3xl">How FlowTransit works</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map(({ icon: Icon, title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="relative"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-white text-primary-700 shadow-card">
                <Icon className="size-5" />
              </div>
              <p className="mt-4 text-xs font-semibold text-primary-700">Step {i + 1}</p>
              <p className="mt-1 font-medium text-ink">{title}</p>
              <p className="mt-1 text-sm text-ink-muted">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
