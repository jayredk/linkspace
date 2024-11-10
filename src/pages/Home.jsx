import {
  Avatar,
  AvatarGroup,
  Box,
  Card,
  CardBody,
  CardHeader,
  Center,
  Container,
  Flex,
  Heading,
  Hide,
  Image,
  SimpleGrid,
  Stack,
  Text,
  Wrap,
  WrapItem
} from '@chakra-ui/react';
import React from 'react';
import { Link } from 'react-router-dom';

import feature_1 from '../assets/images/feature-1.svg';
import feature_2 from '../assets/images/feature-2.png';
import feature_3 from '../assets/images/feature-3.png';

const testimonials = [
  {
    avatar: 'https://bit.ly/kent-c-dodds',
    content:
      '實際使用下來覺得回不去了，連結多了圖像更加豐富，增加消費者點選欲望、一目了然。',
  },
  {
    avatar: 'https://bit.ly/dan-abramov',
    content:
      '超好用的連結工具！頁面美編自由度很高🧡操作容易，簡單把你的網址變精緻！',
  },
  {
    avatar: 'https://bit.ly/ryan-florence',
    content:
      '如果是個人創作者沒有資源建立官方網頁，這是不錯的選擇，透過更細節的介紹呈現特色商品、傳遞品牌理念。',
  },
];


export default function Home() {
  return (
    <Box minHeight="100vh" bgColor="#151515" color="#FCF6EE">
      <Container maxW="1200px" pb="2rem">
        <Box as="header" py="1.5rem">
          <Flex
            justifyContent="space-between"
            alignItems="center"
            gap="2"
            px="0.75rem"
            py="0.5rem"
            bgColor="#232020"
            borderRadius="2xl"
          >
            <Box p="2">
              <Heading as="h1" fontSize="1.75rem" letterSpacing="0.05em">
                <Link to="/">Linkspace</Link>
              </Heading>
            </Box>
            <Hide below="md">
              <Wrap spacing="1.5rem">
                <WrapItem>
                  <ScrollLink to="#feature">功能介紹</ScrollLink>
                </WrapItem>
                <WrapItem>
                  <Link to="/">精選帳號</Link>
                </WrapItem>
                <WrapItem>
                  <Link to="/">關於我們</Link>
                </WrapItem>
              </Wrap>
            </Hide>
            <Flex gap="2">
              <Box
                py="0.5rem"
                bgColor="#34312D"
                color="inherit"
                borderRadius="lg"
                _hover={{
                  bg: '#34312D',
                }}
                sx={{
                  '& a': {
                    padding: '1rem',
                  },
                }}
              >
                <Link to="/signup">註冊</Link>
              </Box>
              <Box
                py="0.5rem"
                bgGradient="linear(to-br, #e6d9ca, #efe5dc, #ffffff)"
                color="#151515"
                borderRadius="lg"
                _hover={{
                  bg: '#fff',
                }}
                sx={{
                  '& a': {
                    padding: '1rem',
                  },
                }}
              >
                <Link to="/login">登入</Link>
              </Box>
            </Flex>
          </Flex>
        </Box>

        <Center as="section" pt={{ base: '6rem', md: '3rem' }} pb="12rem">
          <Stack spacing="2rem" alignItems="center">
            <Flex
              p="0.5rem"
              border="1px"
              borderColor="#2b2b2b"
              borderRadius="9999px"
              alignItems="center"
              gap="0.5rem"
            >
              <AvatarGroup size="sm" max={5}>
                <Avatar
                  borderColor="transparent"
                  name="Ryan Florence"
                  src="https://bit.ly/ryan-florence"
                />
                <Avatar
                  borderColor="transparent"
                  name="Kent Dodds"
                  src="https://bit.ly/kent-c-dodds"
                />
                <Avatar
                  borderColor="transparent"
                  name="Christian Nwamba"
                  src="https://bit.ly/code-beast"
                />
              </AvatarGroup>
              <Text fontSize="sm">35,000+ 人都在使用</Text>
            </Flex>

            <Heading
              fontSize={{
                base: '3rem',
                md: '5rem',
              }}
              textAlign="center"
            >
              打造屬於你的
              <br />
              社群連結任意門
            </Heading>

            <Box textAlign="center">
              <Text>社群連結很多，分享時很麻煩嗎？</Text>
              <Text>
                快來使用 Linkspace
                一頁式網站滿足所有願望，透過拖拉方式即可快速完成
              </Text>
            </Box>

            <Box
              py="1rem"
              bgGradient="linear(to-br, #e6d9ca, #efe5dc, #ffffff)"
              color="#151515"
              borderRadius="2xl"
              boxShadow="0px 3px 10px #e6d9ca"
              fontSize="xl"
              fontWeight="bold"
              _hover={{
                bg: '#fff',
              }}
              sx={{
                '& a': {
                  padding: '2rem',
                },
              }}
            >
              <Link to="/login">立即使用</Link>
            </Box>
          </Stack>
        </Center>

        <Box as="section">
          <Heading
            id="feature"
            fontSize="2xl"
            fontWeight="bold"
            textAlign="center"
            pt="4rem"
            mb="8rem"
          >
            你可以做到...
          </Heading>
          <Flex
            flexDirection={{ base: 'column-reverse', md: 'row' }}
            justifyContent="center"
            alignItems="center"
            mb="8rem"
            gap="6rem"
          >
            <Box maxW={{ base: '90%', md: '40%' }}>
              <Heading as="h3" mb="1rem">
                多元區塊選擇
              </Heading>
              <Text>從文字連結到影音播放器，滿足所有展示需求。</Text>
            </Box>
            <Image
              maxW={{ base: '80%', md: '40%' }}
              src={feature_1}
              boxSize={{ base: '80%', md: '40%' }}
              alt="all link in one place"
            />
          </Flex>
          <Flex
            flexDirection={{ base: 'column-reverse', md: 'row-reverse' }}
            justifyContent="center"
            alignItems="center"
            mb="8rem"
            gap="3rem"
          >
            <Box maxW={{ base: '90%', md: '40%' }}>
              <Heading mb="1rem">輕鬆編輯，自由調整</Heading>
              <Text>簡單拖放、即時預覽，快速打造屬於你的專屬頁面。</Text>
            </Box>
            <Image
              maxW="80%"
              src={feature_2}
              boxSize={{ base: '80%', md: '50%' }}
              alt="all link in one place"
            />
          </Flex>
          <Flex
            flexDirection={{ base: 'column-reverse', md: 'row' }}
            justifyContent="center"
            alignItems="center"
            gap="4rem"
            mb="8rem"
          >
            <Box maxW={{ base: '90%', md: '40%' }}>
              <Heading mb="1rem">一次整合所有社群</Heading>
              <Text>
                將你的所有社群連結集中於一處，連結你的
                Instagram、YouTube、Threads 與 Tiktok。
              </Text>
              <Text>建立個人品牌，方便分享，增加曝光</Text>
            </Box>
            <Image
              maxW={{ base: '70%', md: '40%' }}
              src={feature_3}
              boxSize={{ base: '70%', md: '40%' }}
              alt="all link in one place"
            />
          </Flex>
        </Box>

        <Center mb="4rem">
          <Heading>使用者心得</Heading>
        </Center>
        <SimpleGrid columns={3} spacing={16}>
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.avatar}
              border="1px solid"
              borderColor="#1f1f1f"
              borderRadius="30px"
              bgGradient="linear(180deg,#1e1e1e 0%,rgb(20,20,20) 100%)"
              color="inherit"
              py="3rem"
            >
              <CardHeader>
                <Center>
                  <Avatar
                    size="xl"
                    name="Dan Abrahmov"
                    src={testimonial.avatar}
                  />
                </Center>
              </CardHeader>
              <CardBody maxW="80%" margin="auto">
                <Text>{testimonial.content}</Text>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Container>
      <Container
        as="footer"
        maxW="100%"
        px="5rem"
        py="2rem"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Heading opacity="0.5" userSelect="none">
            Linkspace
          </Heading>
          <Text display="flex">
            Made with love by&nbsp;
            <Link target="_blank" to="https://github.com/jayredk">
              <Text
                as="span"
                opacity="0.5"
                transition="opacity .3s"
                _hover={{
                  opacity: 1,
                }}
              >
                Jay
              </Text>
            </Link>
          </Text>
        </Flex>
      </Container>
    </Box>
  );
}

function ScrollLink({ to, children }) {
  const handleClick = (e) => {
    e.preventDefault();
    document.querySelector(to).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <a href={to} onClick={handleClick}>
      {children}
    </a>
  );
}