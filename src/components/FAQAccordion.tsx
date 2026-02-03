'use client';

import { useState } from 'react';
import { ChevronDown, Sparkles, Truck, CreditCard, Clock, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqCategories = [
  {
    id: 'services',
    name: 'Services',
    icon: Sparkles,
    questions: [
      {
        question: 'What laundry services do you offer?',
        answer: 'We offer a comprehensive range of services including Wash & Fold, Dry Cleaning, Express Service (4-hour turnaround), Pickup & Delivery, Commercial laundry services, alterations, and specialty item cleaning (wedding dresses, suits, etc.).'
      },
      {
        question: 'How do you handle delicate fabrics?',
        answer: 'Our experienced staff is trained to handle all types of fabrics. We use eco-friendly, gentle cleaning products and follow garment care labels carefully. For extremely delicate items, we offer hand-washing and specialized dry cleaning options.'
      },
      {
        question: 'Do you offer stain removal services?',
        answer: 'Yes! We provide professional stain treatment as part of our standard service. For tough stains, we use specialized techniques and products. Our Premium and Family subscription plans include advanced stain treatment at no extra cost.'
      },
    ]
  },
  {
    id: 'delivery',
    name: 'Pickup & Delivery',
    icon: Truck,
    questions: [
      {
        question: 'What areas do you serve?',
        answer: 'We currently serve the greater metropolitan area within a 15-mile radius of our main facility. Free delivery is available for orders over $30 within 5 miles. Check our service area map on the website or contact us to confirm coverage for your address.'
      },
      {
        question: 'How does pickup and delivery work?',
        answer: 'Simply schedule a pickup through our website or app. Our driver will arrive during your selected time window, collect your laundry in our provided bags, and deliver clean items back to you within 24-48 hours (depending on service selected).'
      },
      {
        question: 'Can I schedule recurring pickups?',
        answer: 'Our subscription plans include scheduled weekly or bi-weekly pickups at a time that works for you. You can also set up recurring pickups as a pay-per-order customer through your online account.'
      },
    ]
  },
  {
    id: 'pricing',
    name: 'Pricing & Payment',
    icon: CreditCard,
    questions: [
      {
        question: 'How is pricing calculated?',
        answer: 'Our Wash & Fold service is priced per pound ($1.50/lb). Dry cleaning is priced per item. Express service adds $10 per load. Use our online pricing calculator for an instant estimate based on your specific needs.'
      },
      {
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express, Discover), PayPal, Apple Pay, and Google Pay. Subscription customers can set up automatic monthly billing.'
      },
      {
        question: 'Are there any discounts available?',
        answer: 'Yes! First-time customers get 15% off their first order. Our subscription plans save up to 30% compared to pay-per-order pricing. We also offer referral bonuses and seasonal promotions.'
      },
    ]
  },
  {
    id: 'turnaround',
    name: 'Turnaround Time',
    icon: Clock,
    questions: [
      {
        question: 'What is your standard turnaround time?',
        answer: 'Standard turnaround is 24-48 hours for Wash & Fold and 48-72 hours for Dry Cleaning. Express service offers 4-hour turnaround for an additional fee.'
      },
      {
        question: 'Do you offer same-day service?',
        answer: 'Yes! Our Express Service provides 4-hour turnaround for orders placed before 10 AM. Same-day service is available for most services, though some specialty items may require additional time.'
      },
      {
        question: 'How can I track my order?',
        answer: 'Use our online Order Tracker by entering your order ID. You\'ll also receive SMS and email notifications at each stage: pickup confirmation, processing, ready for delivery, and out for delivery.'
      },
    ]
  },
  {
    id: 'general',
    name: 'General Questions',
    icon: HelpCircle,
    questions: [
      {
        question: 'What if I\'m not satisfied with the service?',
        answer: 'Customer satisfaction is our top priority. If you\'re not completely happy with our service, contact us within 24 hours of delivery and we\'ll re-clean your items for free or provide a full refund.'
      },
      {
        question: 'Are your cleaning products eco-friendly?',
        answer: 'Yes! We use environmentally friendly, biodegradable cleaning products that are gentle on fabrics and safe for sensitive skin. Our facility also implements water-saving and energy-efficient practices.'
      },
      {
        question: 'How do I cancel or modify my subscription?',
        answer: 'You can manage your subscription through your online account at any time. There are no long-term contracts or cancellation fees. Changes take effect at the start of your next billing cycle.'
      },
    ]
  },
];

export default function FAQAccordion() {
  const [activeCategory, setActiveCategory] = useState('services');
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const currentCategory = faqCategories.find(cat => cat.id === activeCategory)!;

  return (
    <section className="py-20 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-muted-foreground">
            Find answers to common questions about our services, pricing, and more.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => {
                    setActiveCategory(category.id);
                    setOpenQuestion(null);
                  }}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === category.id
                      ? 'bg-[#FF6B00] text-white shadow-lg'
                      : 'bg-background border hover:border-[#FF6B00]/50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {category.name}
                </button>
              );
            })}
          </div>

          {/* FAQ Items */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-3"
            >
              {currentCategory.questions.map((item, index) => {
                const isOpen = openQuestion === `${activeCategory}-${index}`;
                return (
                  <div
                    key={index}
                    className="bg-background rounded-xl border overflow-hidden"
                  >
                    <button
                      onClick={() => setOpenQuestion(isOpen ? null : `${activeCategory}-${index}`)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-muted/50 transition-colors"
                    >
                      <span className="font-medium pr-4">{item.question}</span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                        className="flex-shrink-0"
                      >
                        <ChevronDown className="w-5 h-5 text-[#FF6B00]" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="px-5 pb-5 text-muted-foreground leading-relaxed">
                            {item.answer}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Contact CTA */}
          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Still have questions? We're here to help!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@freshwash.com"
                className="inline-flex items-center justify-center px-6 py-3 bg-[#FF6B00] text-white rounded-lg font-medium hover:bg-[#FF6B00]/90 transition-colors"
              >
                Email Support
              </a>
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-6 py-3 border border-[#FF6B00] text-[#FF6B00] rounded-lg font-medium hover:bg-[#FF6B00]/10 transition-colors"
              >
                Call (555) 123-4567
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
