"use client";

import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '@/integrations/supabase/client';
import { useTheme } from 'next-themes';
import { Logo } from '@/components/logo';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/components/auth-provider';

export default function LoginPage() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    // If the user is already logged in, redirect to the dashboard.
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-16 md:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md space-y-8"
      >
        <div className="flex justify-center">
          <Logo />
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={['github', 'google']}
          theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
        />
      </motion.div>
    </div>
  );
}