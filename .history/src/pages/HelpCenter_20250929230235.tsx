import React, { useState } from 'react';
import { Search, ChevronDown, ChevronRight, Mail, Phone, MessageCircle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Navigation from '@/components/Navigation';

const HelpCenter = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      items: [
        {
          question: "How do I create an account?",
          answer: "Click on 'Sign In' in the top right corner, then select 'Sign Up'. Choose your account type (Buyer or Seller) and fill in your email and password. You'll receive a confirmation email to complete your registration."
        },
        {
          question: "What's the difference between a Buyer and Seller account?",
          answer: "Buyers can browse and purchase products, while Sellers can upload and manage their own products on the marketplace. You can change your account type later in your profile settings."
        },
        {
          question: "How do I search for products?",
          answer: "Use the search bar at the top of the page to search by product name or description. You can also browse by categories or use the advanced filters on the search page."
        }
      ]
    },
    {
      title: "Shopping & Orders",
      items: [
        {
          question: "How do I place an order?",
          answer: "Add items to your cart by clicking 'Add to Cart' on any product. Then click the cart icon and select 'Order via WhatsApp'. Fill in your delivery address and the order will be sent to our WhatsApp for processing."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We currently accept Cash on Delivery (COD) only. Payment is made when your order is delivered to your address."
        },
        {
          question: "How long does delivery take?",
          answer: "Delivery typically takes 1-3 business days within Juba and surrounding areas. Delivery times may vary depending on your location and product availability."
        },
        {
          question: "Can I track my order?",
          answer: "Yes, you can track your order status by contacting us via WhatsApp. We'll provide updates on your order's progress and delivery status."
        }
      ]
    },
    {
      title: "Selling on NileCart",
      items: [
        {
          question: "How do I become a seller?",
          answer: "Sign up for a Seller account or change your existing account to Seller in your profile. Then access the Seller Dashboard to start uploading your products."
        },
        {
          question: "How do I upload products?",
          answer: "Go to your Seller Dashboard, click on 'Upload Product' tab, fill in the product details, upload an image, and submit. Your product will be reviewed before appearing in the marketplace."
        },
        {
          question: "How long does product approval take?",
          answer: "Product approval typically takes 24-48 hours. We review each product to ensure it meets our quality standards and guidelines."
        },
        {
          question: "Can I edit my products after uploading?",
          answer: "Yes, you can edit your products anytime from the 'My Products' tab in your Seller Dashboard. Changes will be reviewed before going live."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      items: [
        {
          question: "What is your return policy?",
          answer: "We offer a 7-day return policy for most items. Products must be in original condition with tags and packaging. Contact us via WhatsApp to initiate a return."
        },
        {
          question: "How do I return an item?",
          answer: "Contact our customer service via WhatsApp within 7 days of delivery. We'll provide return instructions and arrange pickup if needed."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 3-5 business days after we receive and inspect the returned item. You'll receive the refund via the same payment method used for the original purchase."
        }
      ]
    },
    {
      title: "Technical Support",
      items: [
        {
          question: "The website is not loading properly",
          answer: "Try refreshing the page or clearing your browser cache. If the problem persists, contact our technical support team via WhatsApp."
        },
        {
          question: "I can't add items to my cart",
          answer: "Make sure you're signed in to your account. If you're still having issues, try refreshing the page or contact our support team."
        },
        {
          question: "I'm not receiving confirmation emails",
          answer: "Check your spam folder first. If you still don't receive emails, contact our support team and we'll help you verify your email address."
        }
      ]
    }
  ];

  const contactMethods = [
    {
      icon: MessageCircle,
      title: "WhatsApp Support",
      description: "Get instant help via WhatsApp",
      action: "Chat with us",
      href: "https://wa.me/${}"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Send us an email",
      action: "Email us",
      href: "mailto:nilecart@gmail.com"
    },
    {
      icon: Phone,
      title: "Phone Support",
      description: "Call us directly",
      action: "Call us",
      href: "tel:7986265440"
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    items: category.items.filter(item =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => category.items.length > 0);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Help Center</h1>
            <p className="text-xl text-muted-foreground mb-8">
              Find answers to your questions or get in touch with our support team
            </p>
            
            {/* Search */}
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Contact Methods */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {contactMethods.map((method, index) => (
              <Card key={index} className="text-center hover:shadow-card transition-shadow">
                <CardContent className="p-6">
                  <method.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold mb-2">{method.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                  <Button asChild variant="outline" className="w-full">
                    <a href={method.href} target="_blank" rel="noopener noreferrer">
                      {method.action}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {searchQuery && (
              <div className="mb-6">
                <h2 className="text-2xl font-semibold mb-4">
                  Search Results ({filteredCategories.reduce((total, cat) => total + cat.items.length, 0)} found)
                </h2>
              </div>
            )}

            {filteredCategories.length === 0 && searchQuery ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <h3 className="text-lg font-semibold mb-2">No results found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try different keywords or contact our support team
                  </p>
                  <Button onClick={() => setSearchQuery('')} variant="outline">
                    Clear Search
                  </Button>
                </CardContent>
              </Card>
            ) : (
              filteredCategories.map((category, categoryIndex) => (
                <Card key={categoryIndex}>
                  <CardHeader>
                    <CardTitle className="text-xl">{category.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Accordion type="single" collapsible className="w-full">
                      {category.items.map((item, itemIndex) => (
                        <AccordionItem key={itemIndex} value={`${categoryIndex}-${itemIndex}`}>
                          <AccordionTrigger className="text-left">
                            {item.question}
                          </AccordionTrigger>
                          <AccordionContent className="text-muted-foreground">
                            {item.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* Still Need Help */}
          <Card className="mt-12 bg-primary/5 border-primary/20">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Still need help?</h3>
              <p className="text-muted-foreground mb-6">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="https://wa.me/211900000000" target="_blank" rel="noopener noreferrer">
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Contact Support
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:support@nilecart.com">
                    <Mail className="w-4 h-4 mr-2" />
                    Send Email
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

export default HelpCenter;
