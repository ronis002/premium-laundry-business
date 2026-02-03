'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calculator, Sparkles, Shield, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  { 
    id: 'wash-fold', 
    name: 'Wash & Fold', 
    pricePerLb: 1.50, 
    icon: Sparkles,
    description: 'Standard washing and folding'
  },
  { 
    id: 'dry-clean', 
    name: 'Dry Cleaning', 
    pricePerLb: 4.50, 
    icon: Shield,
    description: 'Professional dry cleaning'
  },
  { 
    id: 'express', 
    name: 'Express Service', 
    pricePerLb: 2.50, 
    icon: Zap,
    description: '4-hour turnaround'
  },
];

export default function PricingCalculator() {
  const [selectedService, setSelectedService] = useState('wash-fold');
  const [weight, setWeight] = useState([10]);
  const [showEstimate, setShowEstimate] = useState(false);

  const currentService = services.find(s => s.id === selectedService)!;
  const basePrice = currentService.pricePerLb * weight[0];
  const deliveryFee = weight[0] >= 20 ? 0 : 5.99;
  const totalPrice = basePrice + deliveryFee;

  const handleCalculate = () => {
    setShowEstimate(true);
  };

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl border-2">
      <CardHeader className="text-center pb-2">
        <div className="w-14 h-14 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-3">
          <Calculator className="w-7 h-7 text-[#FF6B00]" />
        </div>
        <CardTitle className="text-2xl">Instant Price Calculator</CardTitle>
        <CardDescription className="text-base">
          Get an instant estimate for your laundry needs
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Service Selection */}
        <div className="space-y-3">
          <Label className="text-base font-medium">Select Service Type</Label>
          <Select value={selectedService} onValueChange={setSelectedService}>
            <SelectTrigger className="h-12">
              <SelectValue placeholder="Choose a service" />
            </SelectTrigger>
            <SelectContent>
              {services.map((service) => {
                const Icon = service.icon;
                return (
                  <SelectItem key={service.id} value={service.id}>
                    <div className="flex items-center gap-2">
                      <Icon className="w-4 h-4 text-[#FF6B00]" />
                      <span>{service.name}</span>
                      <span className="text-muted-foreground text-sm">
                        (${service.pricePerLb.toFixed(2)}/lb)
                      </span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </div>

        {/* Weight Slider */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label className="text-base font-medium">Estimated Weight</Label>
            <span className="text-2xl font-bold text-[#FF6B00]">{weight[0]} lbs</span>
          </div>
          <Slider
            value={weight}
            onValueChange={setWeight}
            min={5}
            max={50}
            step={1}
            className="[&_[role=slider]]:bg-[#FF6B00] [&_[role=slider]]:border-[#FF6B00] [&_.bg-primary]:bg-[#FF6B00]"
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>5 lbs</span>
            <span>50 lbs</span>
          </div>
        </div>

        {/* Calculate Button */}
        <Button 
          onClick={handleCalculate}
          className="w-full h-12 text-base bg-[#FF6B00] hover:bg-[#FF6B00]/90"
        >
          Calculate My Price
        </Button>

        {/* Price Estimate */}
        <AnimatePresence>
          {showEstimate && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">{currentService.name}</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">
                    Delivery Fee {weight[0] >= 20 && <span className="text-green-600">(FREE!)</span>}
                  </span>
                  <span>{deliveryFee === 0 ? 'FREE' : `$${deliveryFee.toFixed(2)}`}</span>
                </div>
                <div className="border-t pt-3 flex justify-between items-center">
                  <span className="font-semibold text-lg">Estimated Total</span>
                  <span className="text-2xl font-bold text-[#FF6B00]">${totalPrice.toFixed(2)}</span>
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2">
                  * Free delivery on orders 20 lbs or more
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
