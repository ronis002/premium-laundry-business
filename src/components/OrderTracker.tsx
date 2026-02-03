'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package, Truck, CheckCircle, Clock, Search, MapPin } from 'lucide-react';
import { motion } from 'framer-motion';

const orderStatuses = [
  { 
    id: 'received', 
    label: 'Order Received', 
    icon: Package,
    description: 'We have received your laundry'
  },
  { 
    id: 'processing', 
    label: 'Processing', 
    icon: Clock,
    description: 'Your items are being cleaned'
  },
  { 
    id: 'ready', 
    label: 'Ready for Pickup', 
    icon: CheckCircle,
    description: 'Your order is ready'
  },
  { 
    id: 'delivery', 
    label: 'Out for Delivery', 
    icon: Truck,
    description: 'On the way to you'
  },
];

// Demo order data
const demoOrders: Record<string, { status: number; date: string; items: string }> = {
  'FW-12345': { status: 2, date: '2024-01-15', items: '3 shirts, 2 pants, 1 jacket' },
  'FW-67890': { status: 3, date: '2024-01-14', items: '5 shirts, 3 pants' },
  'FW-11111': { status: 0, date: '2024-01-16', items: '2 dresses, 1 suit' },
  'FW-22222': { status: 1, date: '2024-01-15', items: '10 lbs wash & fold' },
};

export default function OrderTracker() {
  const [trackingId, setTrackingId] = useState('');
  const [orderStatus, setOrderStatus] = useState<{ status: number; date: string; items: string } | null>(null);
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const handleTrack = async () => {
    setIsSearching(true);
    setError('');
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const order = demoOrders[trackingId.toUpperCase()];
    if (order) {
      setOrderStatus(order);
      setError('');
    } else {
      setOrderStatus(null);
      setError('Order not found. Try: FW-12345, FW-67890, FW-11111, or FW-22222');
    }
    setIsSearching(false);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-xl border-2">
      <CardHeader className="text-center pb-4">
        <div className="w-14 h-14 rounded-full bg-[#FF6B00]/10 flex items-center justify-center mx-auto mb-3">
          <MapPin className="w-7 h-7 text-[#FF6B00]" />
        </div>
        <CardTitle className="text-2xl">Track Your Order</CardTitle>
        <CardDescription className="text-base">
          Enter your order ID to see real-time status updates
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Search Input */}
        <div className="flex gap-3">
          <Input
            placeholder="Enter Order ID (e.g., FW-12345)"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleTrack()}
            className="h-12 text-base"
          />
          <Button 
            onClick={handleTrack}
            disabled={!trackingId || isSearching}
            className="h-12 px-6 bg-[#FF6B00] hover:bg-[#FF6B00]/90"
          >
            <Search className="w-5 h-5" />
          </Button>
        </div>

        {error && (
          <p className="text-sm text-red-500 text-center">{error}</p>
        )}

        {/* Status Timeline */}
        {orderStatus && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Order ID:</span>
                <span className="font-semibold">{trackingId.toUpperCase()}</span>
              </div>
              <div className="flex justify-between text-sm mt-1">
                <span className="text-muted-foreground">Items:</span>
                <span>{orderStatus.items}</span>
              </div>
            </div>

            <div className="relative">
              {orderStatuses.map((status, index) => {
                const Icon = status.icon;
                const isCompleted = index <= orderStatus.status;
                const isCurrent = index === orderStatus.status;

                return (
                  <div key={status.id} className="flex gap-4 pb-8 last:pb-0">
                    {/* Timeline Line */}
                    <div className="flex flex-col items-center">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          isCompleted 
                            ? 'bg-[#FF6B00] text-white' 
                            : 'bg-muted text-muted-foreground'
                        } ${isCurrent ? 'ring-4 ring-[#FF6B00]/30' : ''}`}
                      >
                        <Icon className="w-5 h-5" />
                      </motion.div>
                      {index < orderStatuses.length - 1 && (
                        <div 
                          className={`w-0.5 h-full min-h-[40px] ${
                            index < orderStatus.status 
                              ? 'bg-[#FF6B00]' 
                              : 'bg-muted'
                          }`}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pt-1.5">
                      <h4 className={`font-semibold ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {status.label}
                        {isCurrent && (
                          <span className="ml-2 text-xs bg-[#FF6B00] text-white px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </h4>
                      <p className="text-sm text-muted-foreground">{status.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
