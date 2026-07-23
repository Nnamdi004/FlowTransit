import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/utils/cn';

const faqs = [
  {
    question: 'Is FlowTransit a real, live transit service?',
    answer:
      'No — FlowTransit is a university software engineering project built to demonstrate a full-stack transit planning experience. Routes and fares are realistic but illustrative, not live data.',
  },
  {
    question: 'Which areas of Lagos does FlowTransit cover?',
    answer:
      'The demo covers major corridors and landmarks across Lagos Island, Ikoyi, Victoria Island, Lekki, Yaba, Surulere, Ikeja, Oshodi, Mile 2, Apapa and Ikorodu, plus several lagoon ferry routes.',
  },
  {
    question: 'Can I report an incident I see on my commute?',
    answer:
      'Yes. Signed-in users can report road or water incidents — traffic, flooding, breakdowns, delays — with a description, severity and location, visible to the whole community.',
  },
  {
    question: 'Do I need to create an account to use FlowTransit?',
    answer:
      'Planning trips, reporting incidents and saving favourites all require a free account so your history and preferences are kept between visits.',
  },
];

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="scroll-mt-20 bg-surface-muted py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="mb-8 text-center text-2xl font-semibold text-ink sm:text-3xl">Frequently asked questions</h2>
        <div className="flex flex-col gap-2.5">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            return (
              <div key={faq.question} className="overflow-hidden rounded-2xl border border-ink/5 bg-white">
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? null : i)}
                  aria-expanded={open}
                  className="flex w-full items-center justify-between gap-3 px-5 py-4 text-left"
                >
                  <span className="font-medium text-ink">{faq.question}</span>
                  <ChevronDown className={cn('size-4 shrink-0 text-ink-subtle transition-transform', open && 'rotate-180')} />
                </button>
                {open && <p className="px-5 pb-4 text-sm text-ink-muted">{faq.answer}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
