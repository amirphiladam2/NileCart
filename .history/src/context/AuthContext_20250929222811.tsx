import { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  userRole: string | null;
  signUp: (email: string, password: string, role?: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  updateUserRole: (role: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        // Fetch user role if user is logged in
        if (session?.user) {
          await fetchUserRole(session.user.id);
        } else {
          setUserRole(null);
        }
        
        setLoading(false);
      }
    );

    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await fetchUserRole(session.user.id);
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchUserRole = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', userId)
        .single();
      
      if (error) {
        console.error('Error fetching user role:', error);
        setUserRole('buyer'); // Default role
      } else {
        setUserRole(data?.role || 'buyer');
      }
    } catch (err) {
      console.error('Error fetching user role:', err);
      setUserRole('buyer'); // Default role
    }
  };

  const signUp = async (email: string, password: string, role: string = 'buyer') => {
    try {
      const redirectUrl = `${window.location.origin}/auth?confirmed=true`;
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl
        }
      });

      if (error) {
        console.error('Signup error:', error);
        toast({
          title: "Sign up failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Signup success:', data);
        
        // Check if email confirmation is required
        if (data.user && !data.user.email_confirmed_at) {
          // Check if email confirmation was actually sent
          if (data.user.identities && data.user.identities.length > 0) {
            toast({
              title: "Account created successfully!",
              description: "Please check your email for a confirmation link to complete your registration."
            });
          } else {
            // No email service configured or user already exists
            toast({
              title: "Account created successfully!",
              description: "You can now sign in with your credentials."
            });
          }
        } else if (data.user && data.user.email_confirmed_at) {
          // User is already confirmed (shouldn't happen with new signup)
          toast({
            title: "Welcome!",
            description: "Your account is ready. You can now sign in."
          });
        } else {
          // Fallback message
          toast({
            title: "Account created successfully!",
            description: "You can now sign in with your credentials."
          });
        }
      }

      return { error };
    } catch (err) {
      console.error('Signup exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast({
        title: "Sign up failed",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: { message: errorMessage } };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Signin error:', error);
        toast({
          title: "Sign in failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Signin success:', data);
        toast({
          title: "Welcome back!",
          description: "You have successfully signed in."
        });
      }

      return { error };
    } catch (err) {
      console.error('Signin exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast({
        title: "Sign in failed",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: { message: errorMessage } };
    }
  };

  const resetPassword = async (email: string) => {
    try {
      const redirectUrl = `${window.location.origin}/auth?reset=true`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl
      });

      if (error) {
        console.error('Password reset error:', error);
        toast({
          title: "Password reset failed",
          description: error.message,
          variant: "destructive"
        });
      } else {
        console.log('Password reset email sent');
        toast({
          title: "Check your email",
          description: "We've sent you a password reset link."
        });
      }

      return { error };
    } catch (err) {
      console.error('Password reset exception:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast({
        title: "Password reset failed",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: { message: errorMessage } };
    }
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      toast({
        title: "Sign out failed",
        description: error.message,
        variant: "destructive"
      });
    } else {
      setUserRole(null);
      toast({
        title: "Signed out",
        description: "You have been successfully signed out."
      });
    }
  };

  const updateUserRole = async (role: string) => {
    if (!user) return { error: { message: 'No user logged in' } };
    
    try {
      const { error } = await supabase
        .from('users')
        .update({ role })
        .eq('id', user.id);
      
      if (error) {
        console.error('Error updating user role:', error);
        toast({
          title: "Role update failed",
          description: error.message,
          variant: "destructive"
        });
        return { error };
      } else {
        setUserRole(role);
        toast({
          title: "Role updated",
          description: `Your role has been updated to ${role}.`
        });
        return { error: null };
      }
    } catch (err) {
      console.error('Error updating user role:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unexpected error occurred';
      toast({
        title: "Role update failed",
        description: errorMessage,
        variant: "destructive"
      });
      return { error: { message: errorMessage } };
    }
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    resetPassword,
    signOut
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};