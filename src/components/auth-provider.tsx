"use client";

import { createContext, useContext, useEffect, useState } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useRouter } from 'next/navigation';

type Profile = {
  id: string;
  full_name: string;
  avatar_url: string;
  role: string;
};

type AuthContextType = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  signOut: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true); // Start as true
  const router = useRouter();

  useEffect(() => {
    // onAuthStateChange is the single source of truth.
    // It fires once on initial load, and then on every auth event.
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        // If there's a user, fetch their profile
        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(profileData);
        
        // Redirect on sign-in
        if (event === 'SIGNED_IN') {
          router.push('/dashboard');
        }
      } else {
        // If there's no user, clear the profile
        setProfile(null);
      }
      
      // Once we have the auth state, we are no longer loading.
      setLoading(false);
    });

    // Cleanup the subscription on unmount
    return () => {
      subscription.unsubscribe();
    };
  }, [router]);

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/');
  };

  const value = {
    session,
    user,
    profile,
    signOut,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};