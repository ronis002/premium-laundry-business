'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import TestimonialsSlider from '@/components/TestimonialsSlider';
import PricingCalculator from '@/components/PricingCalculator';
import OrderTracker from '@/components/OrderTracker';
import SubscriptionPlans from '@/components/SubscriptionPlans';
import LeadMagnetPopup from '@/components/LeadMagnetPopup';
import MobileActionBar from '@/components/MobileActionBar';
import FAQAccordion from '@/components/FAQAccordion';
import CalendarPicker from '@/components/CalendarPicker';
import { Sparkles, Clock, Shield, Zap, Star, CheckCircle2, ArrowRight, Send } from 'lucide-react';
import { motion } from 'framer-motion';

const countryCodes = [
  { code: '+1', country: 'United States', flag: '🇺🇸' },
  { code: '+1', country: 'Canada', flag: '🇨🇦' },
  { code: '+44', country: 'United Kingdom', flag: '🇬🇧' },
  { code: '+61', country: 'Australia', flag: '🇦🇺' },
  { code: '+49', country: 'Germany', flag: '🇩🇪' },
  { code: '+33', country: 'France', flag: '🇫🇷' },
  { code: '+91', country: 'India', flag: '🇮🇳' },
  { code: '+81', country: 'Japan', flag: '🇯🇵' },
  { code: '+86', country: 'China', flag: '🇨🇳' },
  { code: '+52', country: 'Mexico', flag: '🇲🇽' },
];

const serviceOptions = [
  { value: 'wash-fold', label: 'Wash & Fold' },
  { value: 'dry-cleaning', label: 'Dry Cleaning' },
  { value: 'express-service', label: 'Express Service (4-Hour)' },
  { value: 'pickup-delivery', label: 'Pickup & Delivery' },
  { value: 'commercial', label: 'Commercial/Business Service' },
  { value: 'alterations', label: 'Alterations & Repairs' },
  { value: 'specialty', label: 'Specialty Items (Wedding Dress, etc.)' },
];

function QuoteForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+1-0',
    phone: '',
    service: '',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log('Quote form submitted:', { ...formData, serviceDate: selectedDate });
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Thank You!</h3>
        <p className="text-muted-foreground">
          We've received your request and will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name *</Label>
        <Input
          id="name"
          type="text"
          placeholder="John Doe"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email Address *</Label>
        <Input
          id="email"
          type="email"
          placeholder="john@example.com"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="h-12"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number *</Label>
        <div className="flex gap-2">
          <Select
            value={formData.countryCode}
            onValueChange={(value) => setFormData({ ...formData, countryCode: value })}
          >
            <SelectTrigger className="w-[130px] h-12">
              <SelectValue placeholder="Code" />
            </SelectTrigger>
            <SelectContent className="max-h-[300px]">
              {countryCodes.map((country, index) => (
                <SelectItem key={`${country.code}-${index}`} value={`${country.code}-${index}`}>
                  <span className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.code}</span>
                  </span>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            required
            className="flex-1 h-12"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="service">Service Required *</Label>
        <Select
          value={formData.service}
          onValueChange={(value) => setFormData({ ...formData, service: value })}
          required
        >
          <SelectTrigger className="h-12">
            <SelectValue placeholder="Select a service" />
          </SelectTrigger>
          <SelectContent>
            {serviceOptions.map((service) => (
              <SelectItem key={service.value} value={service.value}>
                {service.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label>Preferred Service Date *</Label>
        <CalendarPicker
          value={selectedDate}
          onChange={setSelectedDate}
        />
      </div>

      <Button 
        type="submit" 
        className="w-full h-12 bg-[#FF6B00] hover:bg-[#FF6B00]/90 mt-6" 
        disabled={isSubmitting || !selectedDate}
      >
        {isSubmitting ? (
          'Submitting...'
        ) : (
          <>
            <Send className="w-4 h-4 mr-2" />
            Get My Free Quote
          </>
        )}
      </Button>
    </form>
  );
}

export default function Home() {
  const services = [
    {
      icon: Sparkles,
      title: 'Wash & Fold',
      description: 'Professional washing, drying, and folding service with same-day turnaround.',
      price: 'From $1.50/lb',
    },
    {
      icon: Shield,
      title: 'Dry Cleaning',
      description: 'Expert dry cleaning for delicate fabrics and special garments.',
      price: 'From $8.99/item',
    },
    {
      icon: Zap,
      title: 'Express Service',
      description: '4-hour turnaround for those urgent laundry needs.',
      price: '+$10 per load',
    },
    {
      icon: Clock,
      title: 'Pickup & Delivery',
      description: 'Free pickup and delivery within 5 miles for orders over $30.',
      price: 'Free $30+',
    },
  ];

  const stats = [
    { value: '50K+', label: 'Happy Customers' },
    { value: '99.8%', label: 'Satisfaction Rate' },
    { value: '15+', label: 'Years Experience' },
    { value: '24/7', label: 'Support Available' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <LeadMagnetPopup />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-background via-primary/5 to-background py-20 lg:py-32">
        <div className="absolute inset-0 bg-grid-white/10 bg-[size:50px_50px]" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-8"
          >
            <Badge variant="secondary" className="text-sm px-4 py-1.5">
              New: Express 4-Hour Service Now Available
            </Badge>
            
            <h1 className="font-bold tracking-tight">
              Professional Laundry Services
              <span className="block mt-2 gradient-text">Delivered to Your Door</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the ultimate convenience in laundry care. From wash & fold to dry cleaning, 
              we handle your garments with precision and care.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
              <Button 
                asChild 
                size="lg" 
                className="text-base px-8 py-6 h-auto bg-[#FF6B00] hover:bg-[#FF6B00]/90 shadow-lg"
              >
                <Link href="/services">
                  Request a Quote
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-base px-8 py-6 h-auto">
                <Link href="/products">View Products</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Slider - Right below Hero */}
      <TestimonialsSlider />

      {/* Stats Section */}
      <section className="py-12 border-y bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl lg:text-5xl font-bold gradient-text mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Calculator Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-bold mb-4">Get an Instant Quote</h2>
            <p className="text-lg text-muted-foreground">
              Use our pricing calculator to get an estimate for your laundry needs in seconds.
            </p>
          </div>
          <PricingCalculator />
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold mb-4">Our Services</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive laundry solutions tailored to your needs. Professional care for every garment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  <Card className="h-full hover:shadow-lg transition-shadow hover:border-[#FF6B00]/50">
                    <CardHeader>
                      <div className="w-12 h-12 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#FF6B00]" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                      <CardDescription className="text-base">{service.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-lg font-semibold text-[#FF6B00]">{service.price}</div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline" className="px-8 py-6 h-auto">
              <Link href="/services">View All Services</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Order Tracker Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-bold mb-4">Track Your Order</h2>
            <p className="text-lg text-muted-foreground">
              Stay updated on your laundry's progress with our real-time order tracking.
            </p>
          </div>
          <OrderTracker />
        </div>
      </section>

      {/* Subscription Plans */}
      <SubscriptionPlans />

      {/* Why Choose Us Section */}
      <section className="py-20 lg:py-32 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-bold mb-6">Why Choose FreshWash?</h2>
              <div className="space-y-4">
                {[
                  'Eco-friendly cleaning products',
                  'State-of-the-art equipment',
                  'Experienced and trained staff',
                  'Flexible pickup and delivery',
                  'Competitive pricing',
                  'Satisfaction guaranteed',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-6 h-6 text-[#FF6B00] flex-shrink-0" />
                    <span className="text-lg">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="relative h-[400px] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=800&h=600&fit=crop"
                alt="Professional laundry service"
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Get a Free Quote Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-bold mb-4">Get a Free Quote</h2>
              <p className="text-lg text-muted-foreground mb-6">
                Ready to experience premium laundry service? Fill out the form and we'll get back to you within 24 hours with a personalized quote.
              </p>
              <div className="space-y-4">
                {[
                  'No obligation quote',
                  'Competitive pricing',
                  'Flexible scheduling',
                  'Same-day response',
                ].map((item, index) => (
                  <motion.div
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#FF6B00] flex-shrink-0" />
                    <span>{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="shadow-lg">
                <CardHeader>
                  <CardTitle>Request Your Quote</CardTitle>
                  <CardDescription>
                    Fill in your details and we'll contact you shortly
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuoteForm />
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQAccordion />

      <Footer />
      
      {/* Mobile Action Bar */}
      <MobileActionBar />
    </div>
  );
}
