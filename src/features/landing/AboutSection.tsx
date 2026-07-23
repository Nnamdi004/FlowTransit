import { motion } from 'framer-motion';
import { Bus, Ship } from 'lucide-react';

export function AboutSection() {
  return (
    <section id="about" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16 sm:px-6">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <span className="text-xs font-semibold uppercase tracking-wide text-primary-700">About FlowTransit</span>
          <h2 className="mt-2 text-2xl font-semibold text-ink sm:text-3xl">
            One platform for how Lagos actually moves
          </h2>
          <p className="mt-4 text-ink-muted">
            Lagos commuters juggle BRT corridors, danfo buses and lagoon ferries every day, often without a
            reliable way to compare them. FlowTransit was built as a university software engineering project to
            explore what a unified, road-and-water transit companion for Lagos could look like — bringing
            routes, live incidents and journey planning into one clean, mobile-first experience.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="grid grid-cols-2 gap-4"
        >
          <div className="rounded-2xl bg-primary-50 p-6">
            <Bus className="size-7 text-primary-700" />
            <p className="mt-3 text-2xl font-semibold text-ink">4+</p>
            <p className="text-sm text-ink-muted">Road & BRT corridors mapped</p>
          </div>
          <div className="mt-6 rounded-2xl bg-secondary-50 p-6">
            <Ship className="size-7 text-secondary-700" />
            <p className="mt-3 text-2xl font-semibold text-ink">4+</p>
            <p className="text-sm text-ink-muted">Ferry routes across the lagoon</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
