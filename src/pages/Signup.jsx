import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { auth, db } from '../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword } from 'firebase/auth';

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
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';

import bg_Alicia from '../assets/images/bg-alicia.webp';


export default function Signup() {
  const navigate = useNavigate();
  const setUser = useSetUser();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    watch,
  } = useForm();

  const password = watch('password');

  const onSubmit = async (values) => {
    try {
      const { mail, password } = values;
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        mail,
        password
      );

      const { user } = userCredential;

      const slug = user.uid.substring(0, 8);
      const avatarSeed = crypto.randomUUID().substring(0, 5);
      const username = mail.match(/^([a-zA-Z0-9._%+-]+)@/)[1];

      const defaultUserData = {
        slug,
        profile: {
          avatar: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${avatarSeed}`,
          email: user.email,
          name: username,
          description: '歡迎來到我的頁面！',
          bgColor: 'black',
          textColor: 'white',
          themeColor: 'blue',
          links: [
            {
              icon: 'facebook',
              text: 'Facebook',
              url: '',
            },
            {
              icon: 'youtube',
              text: 'Youtube',
              url: '',
            },
            {
              icon: 'instagram',
              text: 'Instagram',
              url: '',
            },
          ],
        },
        sections: [
          {
            id: crypto.randomUUID(),
            type: 'text-button',
            is_public: true,
            isSolid: false,
            hasSubtitle: false,
            hasImage: false,
            fontSize: 'sm',
            buttons: [
              {
                effect: 'none',
                text: '歡迎來到我的頁面！我正在建設中...',
                subText: '',
                icon: 'pin',
                linkUrl: '',
              },
            ],
          },
        ],
        metadata: {
          createdAt: new Date(),
          lastUpdated: new Date(),
          version: 1,
        },
      };

      await setDoc(doc(db, 'users', user.uid), defaultUserData);

      setUser({
        uid: user.uid,
      });
      
      navigate('/create-site-id');
    } catch (error) {
      if (
        error?.message === 'Firebase: Error (auth/email-already-in-use).'
      ) {
        alert('此信箱已被註冊');
      } else {
        alert(error?.message);
      }
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
              建立帳號
            </Heading>
            <GoogleAuthButton>透過 Google 帳號註冊</GoogleAuthButton>
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
                      minLength: {
                        value: 8,
                        message: '密碼長度至少需要 8 個字',
                      },
                      pattern: {
                        value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                        message: '密碼必須包含至少一個英文字母與一個數字',
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors.password && errors.password.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.confirmPassword}>
                  <FormLabel>確認密碼</FormLabel>
                  <Input
                    type="password"
                    borderColor="gray.300"
                    placeholder="輸入密碼"
                    {...register('confirmPassword', {
                      required: '請再次輸入密碼',
                      validate: (value) =>
                        value === password || '兩次輸入的密碼不一致',
                    })}
                  />
                  <FormErrorMessage>
                    {errors.confirmPassword && errors.confirmPassword.message}
                  </FormErrorMessage>
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
                  建立帳號
                </Button>
              </Stack>
            </form>
            <Text mt="2rem" textAlign="center">
              已經有帳號了嗎？
              <Link href="/login" ms="0.5rem" textDecoration="underline">
                登入
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
        src={bg_Alicia}
      ></Image>
    </Flex>
  );
}
