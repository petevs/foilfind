import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Paper,
  Title,
  Text,
  Container,
  Group,
  Button,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import { auth } from '../firebase'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from 'next/router'
import Link from 'next/link'



export default function SignInPage() {

  const [type, toggle] = useToggle(['login', 'register']);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: (val) => (val.length <= 6 ? 'Password should include at least 6 characters' : null),
    },
  });

  const router = useRouter();

  const createUser = async (email, password) => {
    await createUserWithEmailAndPassword(auth, email, password)
    router.push('/')
  }

  const signIn = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password)
    router.push('/')
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { hasErrors } = form.validate();
    
    if(hasErrors) {
      return;
    }

    if (type === 'login') {
      signIn(form.values.email, form.values.password)
    }
    if (type === 'register') {
      createUser(form.values.email, form.values.password)
    }
  };


  return (
    <div>
      <Container size={420} my={40}>
      <Title
        align="center"
        sx={(theme) => ({ fontFamily: `Greycliff CF, ${theme.fontFamily}`, fontWeight: 900 })}
      >
        { type === 'login' ? 'Welcome back!' : 'Sign Up'}
      </Title>
      {
        type === 'login' ? (
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Do not have an account yet?{' '}
          <Anchor href="#" size="sm" onClick={() => toggle()}>
            Create account
          </Anchor>
        </Text>
        ) : (
        <Text color="dimmed" size="sm" align="center" mt={5}>
          Already have an account?{' '}
          <Anchor href="#" size="sm" onClick={() => toggle()}>
            Sign in
          </Anchor>
        </Text>
        )

      }

      <Paper withBorder shadow="md" p={30} mt={30} radius="md">
        <form onSubmit={(e) => handleSubmit(e)} onReset={form.onReset}>
        <TextInput 
          label="Email" 
          placeholder="you@mantine.dev" 
          required 
          error={form.errors.email && 'Invalid email'}
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
        />
        <PasswordInput 
          label="Password" 
          placeholder="Your password" 
          required mt="md" 
          error={form.errors.password && 'Password should include at least 6 characters'}
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Link href="/forgot-password" passHref>
            <Anchor size="sm">
              Forgot password?
            </Anchor>
          </Link>
        </Group>
        <Button fullWidth mt='md' type='submit'>
          {
          type === 'login' ? 'Sign in' : 'Create account'
          }
        </Button>
        </form>
      </Paper>
    </Container>
    </div>
  );
}