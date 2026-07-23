import { motion } from 'framer-motion';
import { Clock, ShieldCheck, TrendingDown, Waves } from 'lucide-react';
import { Card } from '@/components/ui/Card';

const benefits = [
  { icon: Clock, title: 'Save time commuting', description: 'Compare travel times across modes instead of guessing which route is fastest.' },
  { icon: TrendingDown, title: 'Plan around your budget', description: 'See fares up front for every route so you can choose what fits your pocket.' },
  { icon: ShieldCheck, title: 'Travel with confidence', description: 'Community-reported incidents help you avoid traffic, flooding and delays.' },
  { icon: Waves, title: 'Discover water transport', description: 'Ferries are often overlooked — FlowTransit puts them on equal footing with roads.' },
];

export function BenefitsSection() {
  return (
    <section id="benefits" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <h2 className="mb-10 text-center text-2xl font-semibold text-ink sm:text-3xl">Why commuters choose FlowTransit</h2>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map(({ icon: Icon, title, description }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <Card hover className="h-full">
              <span className="flex size-10 items-center justify-center rounded-xl bg-accent-50 text-accent-700">
                <Icon className="size-5" />
              </span>
              <p className="mt-3 font-medium text-ink">{title}</p>
              <p className="mt-1 text-sm text-ink-muted">{description}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
