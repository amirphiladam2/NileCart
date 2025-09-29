import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EnvChecker = () => {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  const whatsappNumber = import.meta.env.VITE_WHATSAPP_NUMBER;

  const isConfigured = supabaseUrl && supabaseKey && whatsappNumber;

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Environment Variables</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm">Supabase URL:</span>
          <Badge variant={supabaseUrl ? "default" : "destructive"}>
            {supabaseUrl ? "✓ Set" : "✗ Missing"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">Supabase Key:</span>
          <Badge variant={supabaseKey ? "default" : "destructive"}>
            {supabaseKey ? "✓ Set" : "✗ Missing"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm">WhatsApp Number:</span>
          <Badge variant={whatsappNumber ? "default" : "destructive"}>
            {whatsappNumber ? "✓ Set" : "✗ Missing"}
          </Badge>
        </div>

        <div className="mt-4 p-2 bg-muted rounded">
          <p className="text-xs text-muted-foreground">
            <strong>Current Values:</strong><br/>
            URL: {supabaseUrl || 'Not set'}<br/>
            Key: {supabaseKey ? `${supabaseKey.substring(0, 20)}...` : 'Not set'}<br/>
            WhatsApp: {whatsappNumber || 'Not set'}
          </p>
        </div>

        <div className="mt-2">
          <Badge variant={isConfigured ? "default" : "destructive"}>
            {isConfigured ? "✓ Ready for deployment" : "✗ Configuration incomplete"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvChecker;
