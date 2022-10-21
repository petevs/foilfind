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
        <TextInput 
          label="Email" 
          placeholder="you@mantine.dev" 
          required 
          error={form.errors.email && form.touched.email ? form.errors.email : null}
          value={form.values.email}
          onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
        />
        <PasswordInput 
          label="Password" 
          placeholder="Your password" 
          required mt="md" 
          error={form.errors.password && form.touched.password ? form.errors.password : null}
          value={form.values.password}
          onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
        />
        <Group position="apart" mt="md">
          <Checkbox label="Remember me" />
          <Anchor onClick={(event) => event.preventDefault()} href="#" size="sm">
            Forgot password?
          </Anchor>
        </Group>{
          type === 'login' ? (
            <Button fullWidth mt="md">
              Sign in
            </Button>
          ) : (
            <Button fullWidth mt="md">
              Sign up
            </Button>
          )
        }
      </Paper>
    </Container>
    </div>
  );
}