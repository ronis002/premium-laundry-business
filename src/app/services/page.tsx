'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Shield, Zap, Clock, CheckCircle2, Shirt, Home } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ServicesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  });

  const services = [
    {
      icon: Sparkles,
      title: 'Wash & Fold',
      description: 'We wash, dry, and fold your laundry to perfection. Same-day service available.',
      features: ['Professional washing', 'Careful drying', 'Neat folding', 'Same-day turnaround'],
      price: '$1.50/lb',
      popular: true,
    },
    {
      icon: Shield,
      title: 'Dry Cleaning',
      description: 'Expert dry cleaning for suits, dresses, and delicate fabrics.',
      features: ['Stain removal', 'Pressing included', 'Fabric care', 'Hanger or bag packaging'],
      price: '$8.99/item',
      popular: false,
    },
    {
      icon: Shirt,
      title: 'Shirt Service',
      description: 'Professional laundering and pressing for dress shirts and blouses.',
      features: ['Hand-finished', 'Starch options', 'Hanger service', 'Quick turnaround'],
      price: '$2.99/shirt',
      popular: false,
    },
    {
      icon: Home,
      title: 'Household Items',
      description: 'Cleaning for comforters, blankets, curtains, and other large items.',
      features: ['Comforters', 'Blankets', 'Curtains', 'Table linens'],
      price: '$15.99+',
      popular: false,
    },
    {
      icon: Zap,
      title: 'Express Service',
      description: '4-hour rush service for those urgent laundry needs.',
      features: ['4-hour turnaround', '7 days a week', 'Priority handling', 'Text updates'],
      price: '+$10/load',
      popular: false,
    },
    {
      icon: Clock,
      title: 'Pickup & Delivery',
      description: 'Free pickup and delivery service for your convenience.',
      features: ['Scheduled pickups', 'Text notifications', 'Contactless service', 'Free on $30+'],
      price: 'Free $30+',
      popular: true,
    },
  ];

  const pricingTiers = [
    {
      name: 'Basic',
      price: '$29',
      period: '/month',
      description: 'Perfect for individuals',
      features: [
        '20 lbs per month',
        'Wash & fold service',
        'Standard turnaround',
        'Email support',
      ],
    },
    {
      name: 'Premium',
      price: '$79',
      period: '/month',
      description: 'Best for families',
      features: [
        '60 lbs per month',
        'All services included',
        'Priority turnaround',
        'Free pickup & delivery',
        'Phone support',
        '10% discount on extras',
      ],
      popular: true,
    },
    {
      name: 'Business',
      price: 'Custom',
      period: '',
      description: 'For businesses & commercial',
      features: [
        'Unlimited pounds',
        'Dedicated account manager',
        'Same-day service',
        'Custom scheduling',
        '24/7 support',
        'Volume discounts',
      ],
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Schedule Pickup',
      description: 'Book online or call us. Choose your preferred time slot.',
    },
    {
      step: '2',
      title: 'We Collect',
      description: 'Our driver picks up your laundry at your doorstep.',
    },
    {
      step: '3',
      title: 'We Clean',
      description: 'Professional cleaning with care and attention to detail.',
    },
    {
      step: '4',
      title: 'We Deliver',
      description: 'Fresh, clean laundry delivered back to your door.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Thank you! We will contact you shortly.');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="py-20 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="font-bold mb-6">Our Services</h1>
            <p className="text-xl text-muted-foreground">
              Professional laundry solutions designed to make your life easier. From everyday wash & fold to specialized dry cleaning.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-all relative">
                    {service.popular && (
                      <Badge className="absolute top-4 right-4">Popular</Badge>
                    )}
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-2xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">
                        {service.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-2xl font-bold text-primary">{service.price}</div>
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-center gap-2 text-sm">
                            <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold mb-4">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Our simple 4-step process makes laundry day effortless
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold mb-4">Pricing Plans</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your needs. All plans include our premium service quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className={`h-full ${tier.popular ? 'border-primary shadow-lg scale-105' : ''}`}>
                  {tier.popular && (
                    <Badge className="absolute top-4 right-4">Most Popular</Badge>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{tier.name}</CardTitle>
                    <CardDescription>{tier.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{tier.price}</span>
                      <span className="text-muted-foreground">{tier.period}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {tier.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button 
                      className="w-full mt-6" 
                      variant={tier.popular ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bold mb-4">Request a Quote</h2>
              <p className="text-lg text-muted-foreground">
                Fill out the form below and we'll get back to you with a custom quote.
              </p>
            </div>

            <Card>
              <CardContent className="pt-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john@example.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="(555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="service">Service Interested In</Label>
                      <Select value={formData.service} onValueChange={(value) => setFormData({ ...formData, service: value })}>
                        <SelectTrigger id="service">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wash-fold">Wash & Fold</SelectItem>
                          <SelectItem value="dry-cleaning">Dry Cleaning</SelectItem>
                          <SelectItem value="shirt-service">Shirt Service</SelectItem>
                          <SelectItem value="household">Household Items</SelectItem>
                          <SelectItem value="express">Express Service</SelectItem>
                          <SelectItem value="pickup">Pickup & Delivery</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us about your laundry needs..."
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Submit Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
