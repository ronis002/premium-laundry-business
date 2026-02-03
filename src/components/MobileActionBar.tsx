'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Phone, Calendar, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileActionBar() {
  const [showChat, setShowChat] = useState(false);

  const actions = [
    {
      id: 'call',
      icon: Phone,
      label: 'Call Us',
      href: 'tel:+15551234567',
      color: 'bg-green-500 hover:bg-green-600',
    },
    {
      id: 'book',
      icon: Calendar,
      label: 'Book Now',
      href: '/services',
      color: 'bg-[#FF6B00] hover:bg-[#FF6B00]/90',
    },
    {
      id: 'chat',
      icon: MessageCircle,
      label: 'Live Chat',
      href: '#',
      color: 'bg-blue-500 hover:bg-blue-600',
      onClick: () => setShowChat(true),
    },
  ];

  return (
    <>
      {/* Mobile Floating Action Bar - Only visible on mobile */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background/95 backdrop-blur-lg border-t shadow-lg">
          <div className="flex items-center justify-around py-2 px-4 safe-area-pb">
            {actions.map((action) => {
              const Icon = action.icon;
              const isLink = action.id !== 'chat';

              const buttonContent = (
                <div className="flex flex-col items-center gap-1 py-2 px-4">
                  <div className={`p-3 rounded-full ${action.color} text-white shadow-lg`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-medium">{action.label}</span>
                </div>
              );

              if (isLink) {
                return (
                  <Link
                    key={action.id}
                    href={action.href}
                    className="flex-1 flex justify-center transition-transform active:scale-95"
                  >
                    {buttonContent}
                  </Link>
                );
              }

              return (
                <button
                  key={action.id}
                  onClick={action.onClick}
                  className="flex-1 flex justify-center transition-transform active:scale-95"
                >
                  {buttonContent}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Live Chat Widget */}
      <AnimatePresence>
        {showChat && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowChat(false)}
              className="fixed inset-0 bg-black/50 z-[60] md:hidden"
            />

            {/* Chat Panel */}
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 right-0 z-[61] md:hidden bg-background rounded-t-2xl shadow-2xl max-h-[80vh] overflow-hidden"
            >
              {/* Chat Header */}
              <div className="bg-[#FF6B00] text-white p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <MessageCircle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold">Live Chat</h4>
                    <p className="text-xs text-white/80">We typically reply in minutes</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowChat(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Chat Content */}
              <div className="p-4 h-[300px] overflow-y-auto">
                <div className="space-y-4">
                  {/* Bot Message */}
                  <div className="flex gap-3">
                    <div className="w-8 h-8 bg-[#FF6B00] rounded-full flex items-center justify-center flex-shrink-0">
                      <MessageCircle className="w-4 h-4 text-white" />
                    </div>
                    <div className="bg-muted rounded-2xl rounded-tl-none p-3 max-w-[80%]">
                      <p className="text-sm">
                        Hi! Welcome to FreshWash. How can we help you today?
                      </p>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="flex flex-wrap gap-2 ml-11">
                    {['Get a Quote', 'Track Order', 'Pricing Info', 'Service Areas'].map((option) => (
                      <button
                        key={option}
                        className="px-3 py-1.5 text-sm border rounded-full hover:bg-muted transition-colors"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Chat Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-3 border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#FF6B00]"
                  />
                  <button className="px-6 py-3 bg-[#FF6B00] text-white rounded-full text-sm font-medium hover:bg-[#FF6B00]/90 transition-colors">
                    Send
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add padding at the bottom of the page for mobile to account for the action bar */}
      <div className="h-24 md:hidden" />
    </>
  );
}
