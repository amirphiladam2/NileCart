import React from 'react';
import { ArrowLeft, Shield, Eye, Lock, Database, Users, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  const lastUpdated = "January 30, 2025";

  const sections = [
    {
      title: "Information We Collect",
      icon: Database,
      content: [
        {
          subtitle: "Personal Information",
          items: [
            "Name and email address when you create an account",
            "Phone number for delivery and communication purposes",
            "Delivery address for order fulfillment",
            "Payment information (processed securely through our payment partners)"
          ]
        },
        {
          subtitle: "Usage Information",
          items: [
            "Products you view, search for, and purchase",
            "Device information and browser type",
            "IP address and location data",
            "Cookies and similar tracking technologies"
          ]
        },
        {
          subtitle: "Communication Data",
          items: [
            "Messages sent through our WhatsApp integration",
            "Customer service interactions",
            "Feedback and reviews you provide"
          ]
        }
      ]
    },
    {
      title: "How We Use Your Information",
      icon: Users,
      content: [
        {
          subtitle: "Service Provision",
          items: [
            "Process and fulfill your orders",
            "Provide customer support",
            "Send order updates and delivery notifications",
            "Enable WhatsApp communication for orders"
          ]
        },
        {
          subtitle: "Account Management",
          items: [
            "Create and manage your account",
            "Verify your identity and prevent fraud",
            "Process returns and refunds",
            "Maintain your order history"
          ]
        },
        {
          subtitle: "Improvement and Analytics",
          items: [
            "Analyze usage patterns to improve our services",
            "Develop new features and products",
            "Conduct market research and analytics",
            "Personalize your shopping experience"
          ]
        }
      ]
    },
    {
      title: "Information Sharing",
      icon: Shield,
      content: [
        {
          subtitle: "We Do Not Sell Your Data",
          items: [
            "We never sell your personal information to third parties",
            "We do not rent or trade your data for marketing purposes",
            "Your information is only shared as described in this policy"
          ]
        },
        {
          subtitle: "Limited Sharing",
          items: [
            "With delivery partners to fulfill your orders",
            "With payment processors to process transactions",
            "With service providers who help us operate our platform",
            "When required by law or to protect our rights"
          ]
        },
        {
          subtitle: "Business Transfers",
          items: [
            "In case of merger, acquisition, or sale of assets",
            "Your information may be transferred as part of the transaction",
            "You will be notified of any material changes"
          ]
        }
      ]
    },
    {
      title: "Data Security",
      icon: Lock,
      content: [
        {
          subtitle: "Security Measures",
          items: [
            "Encryption of data in transit and at rest",
            "Regular security audits and updates",
            "Access controls and authentication systems",
            "Secure data centers and infrastructure"
          ]
        },
        {
          subtitle: "Your Responsibilities",
          items: [
            "Keep your account credentials secure",
            "Use strong, unique passwords",
            "Log out of shared devices",
            "Report any suspicious activity immediately"
          ]
        }
      ]
    },
    {
      title: "Your Rights",
      icon: Eye,
      content: [
        {
          subtitle: "Access and Control",
          items: [
            "View and update your personal information",
            "Download a copy of your data",
            "Delete your account and associated data",
            "Opt out of marketing communications"
          ]
        },
        {
          subtitle: "Data Portability",
          items: [
            "Request a copy of your data in a portable format",
            "Transfer your data to another service",
            "Request correction of inaccurate information"
          ]
        }
      ]
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
              <h1 className="text-3xl font-bold">Privacy Policy</h1>
              <p className="text-muted-foreground">
                How we collect, use, and protect your personal information
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Last updated: {lastUpdated}
              </p>
            </div>
          </div>

          {/* Introduction */}
          <Card className="mb-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Shield className="w-8 h-8 text-primary mt-1" />
                <div>
                  <h2 className="text-xl font-semibold mb-2">Your Privacy Matters</h2>
                  <p className="text-muted-foreground">
                    At NileCart, we are committed to protecting your privacy and ensuring the security 
                    of your personal information. This Privacy Policy explains how we collect, use, 
                    and safeguard your data when you use our e-commerce platform.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Policy Sections */}
          <div className="space-y-8">
            {sections.map((section, sectionIndex) => (
              <Card key={sectionIndex}>
                <CardHeader>
                  <CardTitle className="text-2xl flex items-center gap-2">
                    <section.icon className="w-6 h-6 text-primary" />
                    {section.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {section.content.map((subsection, subsectionIndex) => (
                      <div key={subsectionIndex}>
                        <h3 className="font-semibold text-lg mb-3">{subsection.subtitle}</h3>
                        <ul className="space-y-2">
                          {subsection.items.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-start gap-2">
                              <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                              <span className="text-muted-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Cookies and Tracking */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Cookies and Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-muted-foreground">
                  We use cookies and similar technologies to enhance your experience on our platform:
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Essential Cookies:</strong> Required for basic website functionality
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Analytics Cookies:</strong> Help us understand how you use our site
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">
                      <strong>Preference Cookies:</strong> Remember your settings and preferences
                    </span>
                  </li>
                </ul>
                <p className="text-sm text-muted-foreground">
                  You can control cookie settings through your browser preferences.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Children's Privacy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Children's Privacy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Our services are not intended for children under 13 years of age. We do not 
                knowingly collect personal information from children under 13. If you are a 
                parent or guardian and believe your child has provided us with personal 
                information, please contact us immediately.
              </p>
            </CardContent>
          </Card>

          {/* Changes to Policy */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl">Changes to This Policy</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                We may update this Privacy Policy from time to time. We will notify you of any 
                material changes by posting the new Privacy Policy on this page and updating 
                the "Last updated" date. We encourage you to review this Privacy Policy 
                periodically for any changes.
              </p>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card className="bg-muted/50">
            <CardContent className="p-8 text-center">
              <h3 className="text-xl font-semibold mb-4">Questions About Your Privacy?</h3>
              <p className="text-muted-foreground mb-6">
                If you have any questions about this Privacy Policy or our data practices, 
                please contact us:
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <a href="https://wa.me/211900000000" target="_blank" rel="noopener noreferrer">
                    <Mail className="w-4 h-4 mr-2" />
                    Contact via WhatsApp
                  </a>
                </Button>
                <Button variant="outline" asChild>
                  <a href="mailto:privacy@nilecart.com">
                    Email Privacy Team
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

export default PrivacyPolicy;
