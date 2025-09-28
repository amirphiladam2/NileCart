import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Phone, User } from 'lucide-react';

export interface DeliveryAddress {
  fullName: string;
  phoneNumber: string;
  street: string;
  city: string;
  state: string;
  landmark?: string;
}

interface DeliveryAddressFormProps {
  onSubmit: (address: DeliveryAddress) => void;
  onCancel: () => void;
}

const DeliveryAddressForm = ({ onSubmit, onCancel }: DeliveryAddressFormProps) => {
  const [address, setAddress] = useState<DeliveryAddress>({
    fullName: '',
    phoneNumber: '',
    street: '',
    city: '',
    state: '',
    landmark: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address.fullName && address.phoneNumber && address.street && address.city && address.state) {
      onSubmit(address);
    }
  };

  const handleInputChange = (field: keyof DeliveryAddress, value: string) => {
    setAddress(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary" />
          Delivery Address
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={address.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phoneNumber" className="flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number *
            </Label>
            <Input
              id="phoneNumber"
              value={address.phoneNumber}
              onChange={(e) => handleInputChange('phoneNumber', e.target.value)}
              placeholder="+211 XXX XXX XXX"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street Address *</Label>
            <Textarea
              id="street"
              value={address.street}
              onChange={(e) => handleInputChange('street', e.target.value)}
              placeholder="House number, street name, area"
              rows={2}
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                value={address.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                placeholder="Juba"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State *</Label>
              <Input
                id="state"
                value={address.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                placeholder="Central Equatoria"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="landmark">Landmark (Optional)</Label>
            <Input
              id="landmark"
              value={address.landmark}
              onChange={(e) => handleInputChange('landmark', e.target.value)}
              placeholder="Near any popular place or building"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              disabled={!address.fullName || !address.phoneNumber || !address.street || !address.city || !address.state}
            >
              Confirm Order
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DeliveryAddressForm;