import { Redirect, useRouter } from 'expo-router';
import React from 'react';

import { useLogin } from '@/api';
import { LoginForm, type LoginFormProps } from '@/components/login-form';
import { FocusAwareStatusBar } from '@/components/ui';
import { translate, type TxKeyPath, useAuth } from '@/lib';

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
        signIn(res);
        router.push('/');
      },
      onError: (error) => {
        let key: TxKeyPath = 'login.errors.server';

        const res = error.response?.data;

        if (res?.status === 422) {
          if (res.errors?.email === 'notFound') {
            key = 'login.errors.email_notfound';
          } else if (res.errors?.password === 'incorrectPassword') {
            key = 'login.errors.incorrect_password';
          }
        }

        setErrorMsg(translate(key));
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
