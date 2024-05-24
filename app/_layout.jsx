import { Slot, useRouter, useSegments } from 'expo-router';
import { useEffect } from 'react';
import { AuthProvider, useAuth } from '../hooks/AuthContext'; // Adjust the path if needed

const InitialLayout = () => {




  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const inTabsGroup = segments[0] === '(auth)';

    console.log('User changed: ', user);

    if (user && !inTabsGroup) {
      router.replace('/Home');
    } else if (!user) {
      router.replace('/OnboardingScreen');
    }
  }, [user, loading]);

  return <Slot />;
};

const RootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default RootLayout;
