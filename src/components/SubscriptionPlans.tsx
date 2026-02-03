'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, GraduationCap, Briefcase, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const plans = [
  {
    id: 'student',
    name: 'Student',
    icon: GraduationCap,
    price: 29,
    description: 'Perfect for students and individuals',
    features: [
      '15 lbs of laundry per month',
      'Wash & Fold included',
      'Free pickup & delivery',
      '48-hour turnaround',
      'Basic stain treatment',
    ],
    popular: false,
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Briefcase,
    price: 59,
    description: 'Ideal for busy professionals',
    features: [
      '30 lbs of laundry per month',
      'Wash & Fold + Dry Cleaning',
      'Free pickup & delivery',
      '24-hour turnaround',
      'Premium stain treatment',
      'Garment repairs included',
      'Priority scheduling',
    ],
    popular: true,
  },
  {
    id: 'family',
    name: 'Family',
    icon: Users,
    price: 99,
    description: 'Best value for families',
    features: [
      '60 lbs of laundry per month',
      'All services included',
      'Free pickup & delivery',
      'Same-day turnaround',
      'Premium stain treatment',
      'Garment repairs included',
      'Priority scheduling',
      'Dedicated account manager',
      'Rollover unused lbs',
    ],
    popular: false,
  },
];

export default function SubscriptionPlans() {
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <Badge variant="secondary" className="mb-4 text-sm px-4 py-1.5">
            Save up to 30% with monthly plans
          </Badge>
          <h2 className="font-bold mb-4">Subscription Plans</h2>
          <p className="text-lg text-muted-foreground">
            Choose a plan that fits your lifestyle. Cancel anytime, no commitments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`h-full relative overflow-hidden transition-all hover:shadow-xl ${
                    plan.popular 
                      ? 'border-[#FF6B00] border-2 shadow-lg' 
                      : 'hover:border-[#FF6B00]/50'
                  } ${selectedPlan === plan.id ? 'ring-2 ring-[#FF6B00]' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0">
                      <div className="bg-[#FF6B00] text-white text-xs font-semibold px-4 py-1 rounded-bl-lg">
                        Most Popular
                      </div>
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 ${
                      plan.popular ? 'bg-[#FF6B00] text-white' : 'bg-[#FF6B00]/10 text-[#FF6B00]'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-base">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">${plan.price}</span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-[#FF6B00] flex-shrink-0 mt-0.5" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className={`w-full mt-6 h-12 ${
                        plan.popular 
                          ? 'bg-[#FF6B00] hover:bg-[#FF6B00]/90' 
                          : 'bg-foreground hover:bg-foreground/90'
                      }`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          All plans include a 7-day free trial. No credit card required to start.
        </p>
      </div>
    </section>
  );
}
