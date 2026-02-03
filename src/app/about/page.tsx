'use client';

import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, Shield, Users, Leaf, Clock, Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  const team = [
    {
      name: 'Sarah Mitchell',
      role: 'Founder & CEO',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop',
      bio: '15+ years in the laundry industry with a passion for sustainable practices.',
    },
    {
      name: 'David Chen',
      role: 'Operations Manager',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop',
      bio: 'Expert in logistics and quality control, ensuring every order meets our standards.',
    },
    {
      name: 'Maria Rodriguez',
      role: 'Customer Success Lead',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop',
      bio: 'Dedicated to providing exceptional customer service and building lasting relationships.',
    },
    {
      name: 'James Wilson',
      role: 'Sustainability Director',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
      bio: 'Leading our eco-friendly initiatives and green cleaning innovations.',
    },
  ];

  const values = [
    {
      icon: Shield,
      title: 'Quality Assurance',
      description: 'Every garment is treated with the utmost care and precision.',
    },
    {
      icon: Leaf,
      title: 'Eco-Friendly',
      description: 'Committed to sustainable practices and green cleaning solutions.',
    },
    {
      icon: Clock,
      title: 'Reliability',
      description: 'On-time delivery and consistent service you can count on.',
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Your satisfaction is our top priority in everything we do.',
    },
  ];

  const certifications = [
    'EPA Green Certified',
    'Better Business Bureau A+ Rating',
    'ISO 9001 Quality Management',
    'Green Business Certified',
    'Professional Drycleaners Association Member',
    'Chamber of Commerce Member',
  ];

  const milestones = [
    { year: '2008', event: 'FreshWash founded with a single location' },
    { year: '2012', event: 'Expanded to 3 locations, introduced pickup & delivery' },
    { year: '2016', event: 'Achieved EPA Green Certification' },
    { year: '2019', event: 'Served our 25,000th customer' },
    { year: '2021', event: 'Launched mobile app for easy scheduling' },
    { year: '2024', event: 'Expanded to 5 locations, 50K+ happy customers' },
  ];

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
            <Badge variant="secondary" className="mb-4">Est. 2008</Badge>
            <h1 className="font-bold mb-6">About FreshWash Laundry</h1>
            <p className="text-xl text-muted-foreground">
              For over 15 years, we've been providing professional laundry services with a commitment to quality, 
              sustainability, and exceptional customer care.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-bold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  FreshWash Laundry was founded in 2008 by Sarah Mitchell, who saw a need for high-quality, 
                  eco-friendly laundry services in the community. What started as a small neighborhood laundromat 
                  has grown into a trusted name with five locations serving thousands of satisfied customers.
                </p>
                <p>
                  Our commitment to excellence goes beyond just cleaning clothes. We believe in treating every 
                  garment with the care it deserves while minimizing our environmental impact. From our eco-friendly 
                  detergents to our energy-efficient equipment, every decision we make reflects our values.
                </p>
                <p>
                  Today, we're proud to offer a full range of services including wash & fold, dry cleaning, 
                  alterations, and convenient pickup & delivery. Our team of experienced professionals is dedicated 
                  to making laundry day effortless for our customers.
                </p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative h-[500px] rounded-2xl overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=800&h=1000&fit=crop"
                alt="Our laundry facility"
                className="object-cover w-full h-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold mb-4">Our Values</h2>
            <p className="text-lg text-muted-foreground">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{value.title}</CardTitle>
                      <CardDescription className="text-base">
                        {value.description}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold mb-4">Meet Our Team</h2>
            <p className="text-lg text-muted-foreground">
              Experienced professionals dedicated to exceptional service
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover rounded-t-lg"
                  />
                  <CardHeader>
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <Badge variant="secondary" className="w-fit">
                      {member.role}
                    </Badge>
                    <CardDescription className="text-sm mt-3">
                      {member.bio}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bold mb-4">Certifications & Memberships</h2>
              <p className="text-lg text-muted-foreground">
                Recognized for quality and professionalism
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="text-center hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <Award className="w-8 h-8 text-primary mx-auto mb-3" />
                      <p className="font-medium">{cert}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-bold mb-4">Our Journey</h2>
            <p className="text-lg text-muted-foreground">
              Milestones that shaped who we are today
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-8">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-lg">
                  {milestone.year}
                </div>
                <Card className="flex-1">
                  <CardContent className="pt-6">
                    <p className="text-lg">{milestone.event}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Stats */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {[
              { value: '50,000+', label: 'Happy Customers' },
              { value: '5', label: 'Locations' },
              { value: '15+', label: 'Years of Service' },
              { value: '99.8%', label: 'Satisfaction Rate' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-4xl lg:text-5xl font-bold mb-2 text-white">
                  {stat.value}
                </div>
                <div className="text-primary-foreground/90">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold mb-6">Join the FreshWash Family</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience the difference that professional care and attention to detail can make.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/services">Get Started Today</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/products">Shop Products</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
