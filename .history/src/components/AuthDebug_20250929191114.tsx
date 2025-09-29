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
      const redirectUrl = `${window.location.origin}/auth?confirmed=true`;
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) {
        setStatus(`Signup error: ${error.message}`);
      } else {
        console.log('Full signup response:', data);
        const user = data.user;
        const emailConfirmed = user?.email_confirmed_at;
        const hasIdentities = user?.identities && user.identities.length > 0;
        
        let message = `Signup success!\n`;
        message += `Email: ${user?.email}\n`;
        message += `Email confirmed: ${emailConfirmed ? 'Yes' : 'No'}\n`;
        message += `Has identities: ${hasIdentities ? 'Yes' : 'No'}\n`;
        message += `Session: ${data.session ? 'Active' : 'None'}\n`;
        message += `Redirect URL: ${redirectUrl}`;
        
        setStatus(message);
        setUser(user);
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

  const testAuthService = async () => {
    try {
      setStatus('Testing auth service...');
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        setStatus(`Auth service error: ${error.message}`);
      } else {
        setStatus(`Auth service working! Session: ${data.session ? 'Active' : 'None'}`);
      }
    } catch (err) {
      setStatus(`Auth service exception: ${err}`);
    }
  };

  const testEmailConfig = async () => {
    try {
      setStatus('Testing email configuration...');
      const testEmail = `emailtest${Date.now()}@example.com`;
      const redirectUrl = `${window.location.origin}/auth?confirmed=true`;
      
      // Try to sign up with a test email
      const { data, error } = await supabase.auth.signUp({
        email: testEmail,
        password: 'testpassword123',
        options: {
          emailRedirectTo: redirectUrl
        }
      });
      
      if (error) {
        setStatus(`Email config error: ${error.message}`);
      } else {
        const user = data.user;
        const emailConfirmed = user?.email_confirmed_at;
        const hasIdentities = user?.identities && user.identities.length > 0;
        
        let message = `Email Configuration Test:\n`;
        message += `Email confirmation required: ${!emailConfirmed ? 'Yes' : 'No'}\n`;
        message += `Email service working: ${hasIdentities ? 'Yes' : 'No'}\n`;
        message += `User can sign in immediately: ${data.session ? 'Yes' : 'No'}\n`;
        message += `Redirect URL: ${redirectUrl}`;
        
        setStatus(message);
      }
    } catch (err) {
      setStatus(`Email config exception: ${err}`);
    }
  };

  const testPasswordReset = async () => {
    try {
      setStatus('Testing password reset...');
      const testEmail = `resettest${Date.now()}@example.com`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(testEmail, {
        redirectTo: 'nilecart://auth/callback'
      });
      
      if (error) {
        setStatus(`Password reset error: ${error.message}`);
      } else {
        setStatus(`Password reset email sent!\nRedirect URL: nilecart://auth/callback`);
      }
    } catch (err) {
      setStatus(`Password reset exception: ${err}`);
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
        <div className="flex flex-wrap gap-2">
          <Button onClick={testConnection} size="sm">
            Test Connection
          </Button>
          <Button onClick={testAuthService} size="sm">
            Test Auth
          </Button>
          <Button onClick={testEmailConfig} size="sm">
            Test Email Config
          </Button>
          <Button onClick={testSignup} size="sm">
            Test Signup
          </Button>
          <Button onClick={testPasswordReset} size="sm">
            Test Password Reset
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
