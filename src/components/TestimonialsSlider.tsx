'use client';

import { useState, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Business Owner',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    content: 'FreshWash has been a lifesaver for my busy schedule! Their pickup and delivery service is incredibly convenient, and my clothes always come back perfectly clean and folded.',
    rating: 5,
    location: 'New York, NY',
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Software Engineer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    content: 'The quality is outstanding. My clothes come back looking brand new every time. The express service has saved me multiple times before important meetings.',
    rating: 5,
    location: 'San Francisco, CA',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Healthcare Professional',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    content: 'Best laundry service in town! Fast, reliable, and reasonably priced. The subscription plan saves me so much time and money every month.',
    rating: 5,
    location: 'Austin, TX',
  },
  {
    id: 4,
    name: 'David Thompson',
    role: 'Real Estate Agent',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    content: 'As someone who needs to look professional every day, FreshWash is essential. Their dry cleaning is top-notch and the turnaround time is unbeatable.',
    rating: 5,
    location: 'Chicago, IL',
  },
  {
    id: 5,
    name: 'Jennifer Lee',
    role: 'Working Mother',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    content: 'The family plan has been a game-changer. With three kids, laundry was overwhelming. Now I have more time to spend with my family. Highly recommend!',
    rating: 5,
    location: 'Seattle, WA',
  },
];

export default function TestimonialsSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-advance slider
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Loved by Thousands</h2>
          <div className="flex items-center justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-6 h-6 fill-[#FF6B00] text-[#FF6B00]" />
            ))}
          </div>
          <p className="text-muted-foreground">4.9 out of 5 based on 2,500+ reviews</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 lg:-translate-x-12 z-10 rounded-full w-12 h-12 shadow-lg hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00]"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 lg:translate-x-12 z-10 rounded-full w-12 h-12 shadow-lg hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00]"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Testimonial Card */}
          <div className="overflow-hidden px-4">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
              >
                <Card className="border-2 shadow-xl">
                  <CardContent className="p-8 lg:p-12">
                    <div className="flex flex-col lg:flex-row items-center gap-8">
                      {/* Customer Photo */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <img
                            src={testimonials[currentIndex].image}
                            alt={testimonials[currentIndex].name}
                            className="w-24 h-24 lg:w-32 lg:h-32 rounded-full object-cover border-4 border-[#FF6B00]/20"
                          />
                          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#FF6B00] rounded-full flex items-center justify-center">
                            <Quote className="w-5 h-5 text-white" />
                          </div>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 text-center lg:text-left">
                        {/* Stars */}
                        <div className="flex items-center justify-center lg:justify-start gap-1 mb-4">
                          {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-[#FF6B00] text-[#FF6B00]" />
                          ))}
                        </div>

                        {/* Quote */}
                        <p className="text-lg lg:text-xl text-foreground/90 mb-6 leading-relaxed">
                          "{testimonials[currentIndex].content}"
                        </p>

                        {/* Author */}
                        <div>
                          <p className="font-semibold text-lg">{testimonials[currentIndex].name}</p>
                          <p className="text-muted-foreground">
                            {testimonials[currentIndex].role} • {testimonials[currentIndex].location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex 
                    ? 'bg-[#FF6B00] w-8' 
                    : 'bg-muted-foreground/30 hover:bg-muted-foreground/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
