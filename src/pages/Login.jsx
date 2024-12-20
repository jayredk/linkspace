import { useForm } from 'react-hook-form';
import { auth } from '../utils/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

import { useSetUser } from '../stores/userStore';

import GoogleAuthButton from '../components/GoogleAuthButton';

import {
  AbsoluteCenter,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';


import bg_IU from '../assets/images/bg-IU.webp';


export default function Login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const setUser = useSetUser();

  const onSubmit = async(values) => {
    try {
      const { mail, password } = values;
      const userCredential = await signInWithEmailAndPassword(
        auth,
        mail,
        password
      );

      const { user } = userCredential;
      
      setUser({
        email: user.email,
        uid: user.uid,
      });
      

      navigate('/dashboard');
    } catch (err) {
      console.error(err.message);
    }

  };

  return (
    <Flex maxH="100vh" bgColor="white">
      <Container maxW={{ base: 'md', md: '50%' }} minH="100vh">
        <Flex flexDirection="column" justifyContent="center" h="100%">
          <Heading
            size="lg"
            textAlign="center"
            letterSpacing="0.05em"
            mb="4rem"
          >
            Linkspace
          </Heading>

          <Box px={{ base: '1.5rem', xl: '9rem' }}>
            <Heading
              as="h1"
              size="lg"
              mb="2rem"
              letterSpacing="0.05em"
            >
              登入
            </Heading>            
            <GoogleAuthButton>
              透過 Google 帳號登入
            </GoogleAuthButton>
            <Box position="relative" py="8">
              <Divider />
              <AbsoluteCenter bg="white" color="gray.600" px="4">
                或
              </AbsoluteCenter>
            </Box>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing="1.5rem">
                <FormControl isInvalid={errors.mail}>
                  <FormLabel>信箱</FormLabel>
                  <Input
                    borderColor="gray.300"
                    placeholder="輸入信箱"
                    {...register('mail', {
                      required: '信箱欄位為必填',
                      pattern: {
                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        message: '請輸入有效的信箱地址',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.mail && errors.mail.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.password}>
                  <FormLabel>密碼</FormLabel>
                  <Input
                    type="password"
                    borderColor="gray.300"
                    placeholder="輸入密碼"
                    {...register('password', {
                      required: '密碼欄位為必填',
                    })}
                  />
                  <FormHelperText>密碼需包含英數至少 8 個字</FormHelperText>
                </FormControl>
                <Button
                  isLoading={isSubmitting}
                  type="submit"
                  w="100%"
                  py="1.25rem"
                  bgColor="gray.900"
                  color="white"
                  border="1px"
                  borderRadius="md"
                  _hover={{
                    bgColor: 'gray.700',
                  }}
                >
                  登入
                </Button>
              </Stack>
            </form>
            <Text mt="2rem" textAlign="center">
              還沒有帳號嗎？
              <Link href="/signup" ms="0.5rem" textDecoration="underline">
                註冊
              </Link>
            </Text>
          </Box>
        </Flex>
      </Container>
      <Image
        display={{ base: 'none', md: 'block' }}
        w="100%"
        objectFit="cover"
        objectPosition="center"
        src={bg_IU}
      ></Image>
    </Flex>
  );
}
