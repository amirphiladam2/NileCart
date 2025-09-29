import React from 'react';
import { ArrowLeft, Clock, CheckCircle, XCircle, Package, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const ReturnsPage = () => {
  const navigate = useNavigate();

  const returnSteps = [
    {
      step: 1,
      title: "Contact Us",
      description: "Reach out via WhatsApp within 7 days of delivery",
      icon: MessageCircle,
      details: "Send us a message with your order details and reason for return"
    },
    {
      step: 2,
      title: "Get Approval",
      description: "We'll review your request and provide return instructions",
      icon: CheckCircle,
      details: "Most returns are approved within 24 hours"
    },
    {
      step: 3,
      title: "Package Item",
      description: "Pack the item in its original packaging",
      icon: Package,
      details: "Include all original tags, accessories, and packaging materials"
    },
    {
      step: 4,
      title: "Return Item",
      description: "We'll arrange pickup or provide return address",
      icon: ArrowLeft,
      details: "Free pickup available in Juba and surrounding areas"
    },
    {
      step: 5,
      title: "Receive Refund",
      description: "Get your refund within 3-5 business days",
      icon: CheckCircle,
      details: "Refund processed after item inspection"
    }
  ];

  const returnConditions = [
    {
      title: "Eligible for Return",
      items: [
        "Item is in original condition",
        "All tags and packaging included",
        "Returned within 7 days of delivery",
        "Item was not damaged by customer",
        "All accessories and manuals included"
      ],
      icon: CheckCircle,
      color: "text-green-600"
    },
    {
      title: "Not Eligible for Return",
      items: [
        "Item damaged by customer",
        "Missing tags or packaging",
        "Returned after 7 days",
        "Personalized or custom items",
        "Items used beyond normal wear",
        "Perishable goods (food items)"
      ],
      icon: XCircle,
      color: "text-red-600"
    }
  ];

  const refundMethods = [
    {
      method: "Cash on Delivery",
      description: "Refund will be provided in cash when we collect the item",
      timeframe: "Immediate upon collection"
    },
    {
      method: "Bank Transfer",
      description: "Refund will be transferred to your bank account",
      timeframe: "3-5 business days"
    },
    {
      method: "Mobile Money",
      description: "Refund will be sent to your mobile money account",
      timeframe: "1-2 business days"
    }
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
              <h1 className="text-3xl font-bold">Returns & Refunds</h1>
              <p className="text-muted-foreground">
                Our hassle-free return policy for your peace of mind
              </p>
            </div>
          </div>

          {/* Return Policy Summary */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Clock className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">7-Day Return Policy</h2>
                  <p className="text-muted-foreground mb-4">
                    You have 7 days from the date of delivery to return any item for a full refund. 
                    Items must be in original condition with all tags and packaging.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">Free Returns</Badge>
                    <Badge variant="secondary">Full Refund</Badge>
                    <Badge variant="secondary">Easy Process</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Return Process Steps */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">How to Return an Item</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {returnSteps.map((step, index) => (
                  <div key={step.step} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center font-semibold">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <step.icon className="w-5 h-5 text-primary" />
                        <h3 className="font-semibold text-lg">{step.title}</h3>
                      </div>
                      <p className="text-muted-foreground mb-2">{step.description}</p>
                      <p className="text-sm text-muted-foreground">{step.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Return Conditions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {returnConditions.map((condition, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <condition.icon className={`w-5 h-5 ${condition.color}`} />
                    {condition.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {condition.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2">
                        <div className={`w-2 h-2 rounded-full mt-2 ${condition.color === 'text-green-600' ? 'bg-green-600' : 'bg-red-600'}`} />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Refund Methods */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Refund Methods</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {refundMethods.map((method, index) => (
                  <div key={index} className="flex justify-between items-start p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{method.method}</h3>
                      <p className="text-sm text-muted-foreground">{method.description}</p>
                    </div>
                    <Badge variant="outline">{method.timeframe}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Contact for Returns */}
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Ready to Return an Item?</h3>
              <p className="text-muted-foreground mb-6">
                Contact our support team to start your return process
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg">
                  <a href="https://wa.me/211900000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Start Return via WhatsApp
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="mailto:returns@nilecart.com">
                    Email Returns Team
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Important Notes */}
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="text-xl">Important Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Return shipping is free for eligible items</li>
                <li>• We reserve the right to refuse returns that don't meet our conditions</li>
                <li>• Refunds will be processed after we receive and inspect the returned item</li>
                <li>• Original shipping charges are non-refundable unless the item was defective</li>
                <li>• For damaged or defective items, please contact us immediately upon delivery</li>
                <li>• Custom or personalized items cannot be returned unless defective</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPage;
