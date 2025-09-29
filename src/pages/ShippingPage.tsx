import React from 'react';
import { ArrowLeft, Truck, MapPin, Clock, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const ShippingPage = () => {
  const navigate = useNavigate();

  const deliveryAreas = [
    {
      area: "Juba City Center",
      timeframe: "1-2 days",
      cost: "Free",
      status: "Available"
    },
    {
      area: "Juba Surrounding Areas",
      timeframe: "2-3 days", 
      cost: "Free",
      status: "Available"
    },
    {
      area: "Other States",
      timeframe: "5-7 days",
      cost: "SSP 5,000",
      status: "Available"
    },
    {
      area: "Remote Areas",
      timeframe: "7-14 days",
      cost: "SSP 10,000",
      status: "Limited"
    }
  ];

  const shippingMethods = [
    {
      name: "Standard Delivery",
      description: "Regular delivery service",
      timeframe: "1-3 business days",
      cost: "Free for orders over SSP 50,000",
      icon: Truck
    },
    {
      name: "Express Delivery",
      description: "Fast delivery service",
      timeframe: "Same day (Juba only)",
      cost: "SSP 15,000",
      icon: Package
    },
    {
      name: "Scheduled Delivery",
      description: "Choose your delivery time",
      timeframe: "As scheduled",
      cost: "SSP 5,000",
      icon: Clock
    }
  ];

  const deliveryProcess = [
    {
      step: 1,
      title: "Order Placed",
      description: "Your order is received and confirmed",
      timeframe: "Immediately"
    },
    {
      step: 2,
      title: "Order Processing",
      description: "We prepare your items for shipment",
      timeframe: "2-4 hours"
    },
    {
      step: 3,
      title: "Out for Delivery",
      description: "Your order is dispatched for delivery",
      timeframe: "Same day or next day"
    },
    {
      step: 4,
      title: "Delivered",
      description: "Your order arrives at your address",
      timeframe: "As scheduled"
    }
  ];

  const importantNotes = [
    "All deliveries require a valid phone number for contact",
    "Someone must be available to receive the package",
    "We'll attempt delivery up to 3 times",
    "Photo ID may be required for high-value items",
    "Delivery times may vary during holidays and peak seasons",
    "We cannot deliver to P.O. Boxes"
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold">Shipping Information</h1>
              <p className="text-muted-foreground">
                Everything you need to know about our delivery service
              </p>
            </div>
          </div>

          {/* Shipping Summary */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Truck className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Fast & Reliable Delivery</h2>
                  <p className="text-muted-foreground mb-4">
                    We deliver to all major areas in South Sudan with free shipping on orders over SSP 50,000. 
                    Most orders are delivered within 1-3 business days.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Free Shipping</Badge>
                    <Badge variant="secondary">1-3 Days</Badge>
                    <Badge variant="secondary">Cash on Delivery</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Areas */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <MapPin className="w-6 h-6" />
                Delivery Areas & Timeframes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryAreas.map((area, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full" />
                      <div>
                        <h3 className="font-semibold">{area.area}</h3>
                        <p className="text-sm text-muted-foreground">
                          {area.timeframe} • {area.cost}
                        </p>
                      </div>
                    </div>
                    <Badge 
                      variant={area.status === 'Available' ? 'default' : 'secondary'}
                    >
                      {area.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Shipping Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Shipping Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {shippingMethods.map((method, index) => (
                  <Card key={index} className="text-center">
                    <CardContent className="p-6">
                      <method.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                      <h3 className="font-semibold mb-2">{method.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{method.description}</p>
                      <div className="space-y-1 text-sm">
                        <p><strong>Timeframe:</strong> {method.timeframe}</p>
                        <p><strong>Cost:</strong> {method.cost}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Delivery Process */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Delivery Process</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {deliveryProcess.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-1">{step.title}</h3>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <Badge variant="outline" className="text-xs">{step.timeframe}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tracking Your Order */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Tracking Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  Once your order is placed, you can track its progress through our WhatsApp support. 
                  We'll provide regular updates on your order status.
                </p>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h4 className="font-semibold mb-2">How to Track:</h4>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Contact us via WhatsApp with your order number</li>
                    <li>We'll provide real-time updates on your order status</li>
                    <li>You'll receive notifications when your order is out for delivery</li>
                    <li>We'll confirm delivery once your order arrives</li>
                  </ol>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-xl flex items-center gap-2">
                <AlertCircle className="w-5 h-5" />
                Important Delivery Notes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {importantNotes.map((note, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{note}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Contact for Shipping */}
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Questions About Shipping?</h3>
              <p className="text-muted-foreground mb-6">
                Our delivery team is here to help with any shipping questions
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="https://wa.me/211900000000" target="_blank" rel="noopener noreferrer">
                    <Truck className="w-4 h-4 mr-2" />
                    Contact Delivery Team
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:shipping@nilecart.com">
                    Email Shipping Team
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
