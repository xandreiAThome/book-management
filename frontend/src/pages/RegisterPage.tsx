import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import { useRegister } from '../viewmodels/useRegister';
import { useAuth } from '../lib/auth-context';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../components/ui/card';
import { Field, FieldLabel, FieldError } from '../components/ui/field';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { toast } from 'sonner';

const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  role: z.enum(['TEACHER', 'STUDENT']),
});

export function RegisterPage() {
  const navigate = useNavigate();
  const { mutate: register, isPending } = useRegister();
  const { user } = useAuth();

  const { register: formRegister, handleSubmit, control, formState: { errors } } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { username: '', password: '', role: 'STUDENT' },
  });

  if (user) {
    return <Navigate to={user.role === 'TEACHER' ? '/teacher' : '/student'} replace />;
  }

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    register(data, {
      onSuccess: () => {
        toast.success('Registration successful. Please log in.');
        navigate('/login');
      },
      onError: (err: any) => {
        toast.error(err.response?.data?.message || 'Registration failed');
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[400px]">
        <CardHeader>
          <CardTitle>Register for Books Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Field>
              <FieldLabel htmlFor="username">Username</FieldLabel>
              <Input id="username" {...formRegister('username')} />
              <FieldError errors={[errors.username]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" {...formRegister('password')} />
              <FieldError errors={[errors.password]} />
            </Field>

            <Field>
              <FieldLabel htmlFor="role">Role</FieldLabel>
              <Controller
                control={control}
                name="role"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger id="role">
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="STUDENT">Student</SelectItem>
                      <SelectItem value="TEACHER">Teacher</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.role]} />
            </Field>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center">
          <Link to="/login" className="text-sm text-blue-600 hover:underline">
            Already have an account? Login here.
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
