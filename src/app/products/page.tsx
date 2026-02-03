'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ShoppingCart, Plus, Minus, X } from 'lucide-react';
import { motion } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  inStock: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductsPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const products: Product[] = [
    {
      id: 1,
      name: 'Premium Detergent',
      description: 'Eco-friendly liquid detergent for all fabrics. 64 loads per bottle.',
      price: 24.99,
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop',
      category: 'Detergents',
      inStock: true,
    },
    {
      id: 2,
      name: 'Fabric Softener',
      description: 'Luxurious fabric softener with long-lasting freshness. 48 loads.',
      price: 18.99,
      image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400&h=400&fit=crop',
      category: 'Softeners',
      inStock: true,
    },
    {
      id: 3,
      name: 'Stain Remover Spray',
      description: 'Professional-grade stain remover. Works on tough stains.',
      price: 12.99,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      category: 'Stain Removers',
      inStock: true,
    },
    {
      id: 4,
      name: 'Dryer Sheets (200ct)',
      description: 'Anti-static dryer sheets with fresh scent. Reduces wrinkles.',
      price: 9.99,
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=400&fit=crop',
      category: 'Dryer Sheets',
      inStock: true,
    },
    {
      id: 5,
      name: 'Laundry Basket - Large',
      description: 'Durable woven laundry basket with handles. 60L capacity.',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=400&h=400&fit=crop',
      category: 'Accessories',
      inStock: true,
    },
    {
      id: 6,
      name: 'Mesh Laundry Bags (3pk)',
      description: 'Protect delicates in the wash. Set of 3 different sizes.',
      price: 14.99,
      image: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=400&h=400&fit=crop',
      category: 'Accessories',
      inStock: true,
    },
    {
      id: 7,
      name: 'Wool Dryer Balls (6pk)',
      description: 'Natural fabric softener alternative. Reduces drying time.',
      price: 19.99,
      image: 'https://images.unsplash.com/photo-1563612116625-3012372fccce?w=400&h=400&fit=crop',
      category: 'Accessories',
      inStock: true,
    },
    {
      id: 8,
      name: 'Delicate Wash',
      description: 'Gentle formula for silk, wool, and delicate fabrics. 32 loads.',
      price: 16.99,
      image: 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=400&h=400&fit=crop',
      category: 'Detergents',
      inStock: false,
    },
  ];

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (id: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

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
            <h1 className="font-bold mb-6">Laundry Products & Accessories</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Premium laundry products and accessories to keep your clothes fresh and clean. All products available for pickup or delivery.
            </p>
            
            {/* Cart Button */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <Button size="lg" className="relative">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  View Cart
                  {cartItemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0 flex items-center justify-center">
                      {cartItemCount}
                    </Badge>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg">
                <SheetHeader>
                  <SheetTitle>Shopping Cart ({cartItemCount} items)</SheetTitle>
                </SheetHeader>
                
                {cart.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                    <ShoppingCart className="h-16 w-16 text-muted-foreground mb-4" />
                    <p className="text-lg text-muted-foreground">Your cart is empty</p>
                  </div>
                ) : (
                  <div className="mt-8 flex flex-col h-[calc(100vh-200px)]">
                    <div className="flex-1 overflow-auto space-y-4">
                      {cart.map((item) => (
                        <Card key={item.id}>
                          <CardContent className="p-4">
                            <div className="flex gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-20 h-20 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <div className="flex justify-between items-start mb-2">
                                  <div>
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-sm text-muted-foreground">
                                      ${item.price.toFixed(2)}
                                    </p>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => removeFromCart(item.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, -1)}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <span className="w-8 text-center font-medium">
                                    {item.quantity}
                                  </span>
                                  <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8"
                                    onClick={() => updateQuantity(item.id, 1)}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    
                    <div className="border-t pt-4 mt-4 space-y-4">
                      <div className="flex justify-between text-lg font-semibold">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                      <Button className="w-full" size="lg">
                        Proceed to Checkout
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={() => setIsCartOpen(false)}
                      >
                        Continue Shopping
                      </Button>
                    </div>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          </motion.div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover rounded-t-lg"
                    />
                    {!product.inStock && (
                      <Badge variant="destructive" className="absolute top-2 right-2">
                        Out of Stock
                      </Badge>
                    )}
                    <Badge variant="secondary" className="absolute top-2 left-2">
                      {product.category}
                    </Badge>
                  </div>
                  <CardHeader className="flex-1">
                    <CardTitle className="text-xl">{product.name}</CardTitle>
                    <CardDescription>{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-primary">
                        ${product.price.toFixed(2)}
                      </span>
                      <Button
                        onClick={() => addToCart(product)}
                        disabled={!product.inStock}
                        size="sm"
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        Add
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Info Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-bold mb-4">Why Choose Our Products?</h2>
              <p className="text-lg text-muted-foreground">
                High-quality, eco-friendly products trusted by professionals
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Eco-Friendly</CardTitle>
                  <CardDescription>
                    All products are environmentally safe and biodegradable
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Grade</CardTitle>
                  <CardDescription>
                    The same products we use in our professional service
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Free Delivery</CardTitle>
                  <CardDescription>
                    Free delivery on orders over $50 within 5 miles
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-bold mb-6">Need Help Choosing?</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our laundry experts are here to help you find the perfect products for your needs.
          </p>
          <Button asChild size="lg">
            <Link href="/services">Contact Us</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
