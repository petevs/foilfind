import Head from "next/head";
import Link from 'next/link'
import {
  createStyles,
  Paper,
  Title,
  Text,
  TextInput,
  Button,
  Container,
  Group,
  Anchor,
  Center,
  Box,
} from '@mantine/core';
import { IconArrowLeft } from '@tabler/icons';
import { useState } from 'react'
import { auth } from "../firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const useStyles = createStyles((theme) => ({
  title: {
    fontSize: 26,
    fontWeight: 900,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },

  controls: {
    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column-reverse',
    },
  },

  control: {
    [theme.fn.smallerThan('xs')]: {
      width: '100%',
      textAlign: 'center',
    },
  },
}));


export default function ForgotPassword(){
  const { classes } = useStyles();
  const [email, setEmail] = useState('');
  const [error, setError] = useState(false);
  const [checkEmail, setCheckEmail] = useState(false);


  const sendResetEmail = async () => {
    try {
      await sendPasswordResetEmail(auth, email);
      setCheckEmail(true)
    }
    catch (error) {
      setError(true)
    }
  }

  if(error){
    return (
      <Container size={420} my={40}>
        <Title className={classes.title} align="center">
        Sorry, we couldn{"'"}t find an account with that email.
      </Title>
      <Text color="dimmed" size="sm" align="center">
        Please try again or <Link href="/sign-in">sign up</Link> for a new account.
      </Text>
    </Container>
    )
  }

  return (
    <Container size={460} my={30}>
      <Title className={classes.title} align="center">
        {
          checkEmail
          ? 'Please, check your email'
          : 'Forgot your password'  
        }
      </Title>
      <Text color="dimmed" size="sm" align="center">
        {
          checkEmail
          ? 'We have sent you an email with a link to reset your password'
          : 'Enter your email address and we will send you a link to reset your password'
        }
      </Text>
        {
          (!checkEmail && !error) && (
            <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
              <TextInput label="Your email" placeholder="me@mantine.dev" required value={email} onChange={(e) => setEmail(e.currentTarget.value)} />
              <Group position="apart" mt="lg" className={classes.controls}>
                <Anchor color="dimmed" size="sm" className={classes.control}>
                  <Center inline>
                    <IconArrowLeft size={12} stroke={1.5} />
                    <Link href="/sign-in" passHref>
                      <Box ml={5}>Back to login page</Box>
                    </Link>
                  </Center>
                </Anchor>
                <Button className={classes.control} onClick={sendResetEmail}>Reset password</Button>
              </Group>
            </Paper>
          )
        }
    </Container>
  );
}