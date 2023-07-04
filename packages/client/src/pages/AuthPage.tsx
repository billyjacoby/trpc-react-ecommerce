import {trpc} from '@/utils/trpc';
import {Layout} from '@components/Layout';
import {Button} from '@components/ui/button';
import {Input} from '@components/ui/input';

export const AuthPage = ({isLogin}: {isLogin: boolean}) => {
  const title = isLogin ? 'Login to your account.' : 'Sign up for an account.';
  const subtitle = isLogin
    ? 'Enter your email and password below to login.'
    : 'Enter your email and a password below to sign up.';

  const {mutateAsync: signupMutation} = trpc.users.signUp.useMutation();
  const {mutateAsync: loginMutation} = trpc.users.login.useMutation();
  //TODO: login...

  const onLogin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const result = await loginMutation({email, password});
    console.log('🪵 | file: AuthPage.tsx:18 | onLogin | result:', result);
  };

  const onSignup = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const result = await signupMutation({email, password});
    console.log('🪵 | file: AuthPage.tsx:21 | onSignup | result:', result);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = e.currentTarget.email.value;
    const password = e.currentTarget.password.value;

    isLogin ? onLogin({email, password}) : onSignup({email, password});
  };

  return (
    <Layout>
      <>
        {/* <h1 className="text-6xl text-foreground">Login Page</h1> */}
        <div className="flex flex-col flex-1 self-center justify-center">
          <div className="border border-muted rounded-lg p-6">
            <div className="mb-5">
              <h2 className="text-center text-2xl mb-1">{title}</h2>
              <h3 className="text-muted-foreground">{subtitle}</h3>
            </div>
            <form className="gap-3 flex flex-col" onSubmit={handleSubmit}>
              <Input name="email" placeholder="you@email.com" type="email" />
              <Input name="password" placeholder="password" type="password" />
              <Button type="submit">{isLogin ? 'Login' : 'Sign Up'}</Button>
            </form>
          </div>
        </div>
      </>
    </Layout>
  );
};
