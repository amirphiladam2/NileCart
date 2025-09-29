import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const AuthDebug = () => {
  const [status, setStatus] = useState<string>('Ready to test');
  const [user, setUser] = useState<any>(null);

  const testConnection = async () => {
    try {
      setStatus('Testing connection...');
      console.log('Supabase URL:', supabase.supabaseUrl);
      console.log('Supabase Key:', supabase.supabaseKey);
      
      const { data, error } = await supabase.from('categories').select('*').limit(1);
      
      if (error) {
        console.error('Supabase error:', error);
        setStatus(`Connection error: ${error.message} (Code: ${error.code})`);
      } else {
        setStatus(`Connection successful! Found ${data?.length || 0} categories`);
      }
    } catch (err) {
      console.error('Connection exception:', err);
      setStatus(`Exception: ${err}`);
    }
  };

  const testSignup = async () => {
    try {
      setStatus('Testing signup...');
      const testEmail = `test${Date.now()}@example.com`;
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123'
      });
      
      if (error) {
        setStatus(`Signup error: ${error.message}`);
      } else {
        setStatus(`Signup success: ${JSON.stringify(data)}`);
        setUser(data.user);
      }
    } catch (err) {
      setStatus(`Signup exception: ${err}`);
    }
  };

  const checkUser = async () => {
    try {
      setStatus('Checking current user...');
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        setStatus(`User check error: ${error.message}`);
      } else {
        setStatus(`Current user: ${user ? user.email : 'No user'}`);
        setUser(user);
      }
    } catch (err) {
      setStatus(`User check exception: ${err}`);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Auth Debug</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{status}</p>
        {user && (
          <div className="p-2 bg-muted rounded">
            <p className="text-xs">User: {user.email}</p>
            <p className="text-xs">ID: {user.id}</p>
          </div>
        )}
        <div className="flex gap-2">
          <Button onClick={testConnection} size="sm">
            Test Connection
          </Button>
          <Button onClick={testSignup} size="sm">
            Test Signup
          </Button>
          <Button onClick={checkUser} size="sm">
            Check User
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AuthDebug;
