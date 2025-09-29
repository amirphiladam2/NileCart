import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, Plus, Package, Upload, Settings } from 'lucide-react';
import Navigation from '@/components/Navigation';
import ProductUploadForm from '@/components/ProductUploadForm';
import MyProducts from '@/components/MyProducts';

const SellerDashboard = () => {
  const { user, userRole, userName, loading } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('upload');

  // Show loading while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we verify your access.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Please sign in</h2>
            <p className="text-muted-foreground mb-6">
              You need to be signed in to access the seller dashboard.
            </p>
            <Button onClick={() => navigate('/auth')}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Redirect if not a seller
  if (userRole !== 'seller' && userRole !== 'admin') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-semibold mb-4">Access Denied</h2>
            <p className="text-muted-foreground mb-6">
              You need seller privileges to access this dashboard.
            </p>
            <Button onClick={() => navigate('/')}>
              Go Home
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
            <div className="flex items-center gap-2">
              <Settings className="w-6 h-6 text-primary" />
              <h1 className="text-3xl font-bold">Seller Dashboard</h1>
            </div>
          </div>

          {/* Welcome Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Welcome, {userName || user.email}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Manage your products, upload new items, and track your sales. 
                Your products will be reviewed before going live on the marketplace.
              </p>
            </CardContent>
          </Card>

          {/* Dashboard Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload" className="flex items-center gap-2">
                <Upload className="w-4 h-4" />
                Upload Product
              </TabsTrigger>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                My Products
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upload" className="mt-6">
              <ProductUploadForm />
            </TabsContent>

            <TabsContent value="products" className="mt-6">
              <MyProducts />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
