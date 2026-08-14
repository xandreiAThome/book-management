import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useLogin } from '../viewmodels/useLogin';
import { useAuth } from '../lib/auth-context';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Field, FieldLabel, FieldError } from '../components/ui/field';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { toast } from 'sonner';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export function LoginPage() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useLogin();
  const { user } = useAuth();

  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { username: '', password: '' },
  });

  if (user) {
    return <Navigate to={user.role === 'TEACHER' ? '/teacher' : '/student'} replace />;
  }

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    login(data, {
      onSuccess: (res) => {
        toast.success('Logged in successfully');
        navigate(res.user.role === 'TEACHER' ? '/teacher' : '/student');
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || 'Login failed');
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Login to Books Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" {...register('username')} />
              <FieldError errors={[errors.username]} />
            </Field>
            
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...register('password')} />
              <FieldError errors={[errors.password]} />
            </Field>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Logging in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link to="/register" className="text-sm text-blue-600 hover:underline">
            Don't have an account? Register here.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
