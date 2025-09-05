import { Redirect, useRouter } from 'expo-router';
import React from 'react';

import { useLogin } from '@/api';
import type { LoginFormProps } from '@/components/login-form';
import { LoginForm } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { useAuth } from '@/lib';

export default function Login() {
  const router = useRouter();
  const signIn = useAuth.use.signIn();
  const status = useAuth.use.status();
  const loginMutation = useLogin();
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  if (status === 'signIn') {
    return <Redirect href="/" />;
  }

  const onSubmit: LoginFormProps['onSubmit'] = (data) => {
    setErrorMsg(null);
    loginMutation.mutate(data, {
      onSuccess: (res) => {
        if (res.success && res.data) {
          signIn(res.data);
          router.push('/');
        } else {
          setErrorMsg(res.message || 'Login error');
        }
      },
      onError: (error) => {
        const msg = error.response?.data?.message || 'Login error';
        setErrorMsg(msg);
      },
    });
  };

  return (
    <>
      <FocusAwareStatusBar />
      <LoginForm
        onSubmit={onSubmit}
        errorMessage={errorMsg}
        isLoading={loginMutation.isPending}
      />
    </>
  );
}
