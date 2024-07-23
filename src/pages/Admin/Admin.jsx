import { useState } from 'react';

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Image,
  Input,
  InputGroup,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Switch,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import {
  MdContentCopy,
  MdDelete,
  MdDragIndicator,
  MdEdit,
  MdIosShare,
  MdLanguage,
  MdLogout,
} from 'react-icons/md';

import {
  BsCopy,
  BsFacebook,
  BsInstagram,
  BsThreadsFill,
  BsTiktok,
  BsTwitterX,
  BsYoutube,
} from 'react-icons/bs';

import { FiExternalLink } from 'react-icons/fi';

import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';


const fontSizeMap = {
  sm: '16px',
  md: '20px',
  lg: '24px',
  xl: '32px',
};

const fontSizeMapWithSubtitle = {
  sm: '20px',
  md: '24px',
  lg: '28px',
  xl: '36px',
};

const iconSizeMap = {
  sm: '24px',
  md: '24px',
  lg: '32px',
  xl: '40px',
};

const iconSizeMapWithSubtitle = {
  sm: '32px',
  md: '32px',
  lg: '40px',
  xl: '48px',
};

const iconMap = {
  facebook: BsFacebook,
  instagram: BsInstagram,
  twitter: BsTwitterX,
  youtube: BsYoutube,
};

function DraggableItemPanel() {
  return (
    <VStack
      display={{
        base: 'none',
        lg: 'block',
      }}
      position="fixed"
      top="10rem"
      left="5rem"
      bottom="3rem"
      bgColor="white"
      borderRadius="1.5rem"
      boxShadow="rgba(0, 0, 0, 0.04) 0px 5px 5px"
      p="2rem"
      w="300px"
      gap="1rem"
    >
      <Text alignSelf="flex-start" ml="0.75rem" mb="1rem">
        區塊數量 0 / 8
      </Text>
      <SimpleGrid columns={2} spacing={4}>
        <Tooltip
          hasArrow
          label="純文字按鈕，可一次收整多連結"
          placement="top"
          borderRadius="1.5rem"
          p="1rem 2rem"
        >
          <Flex
            bgColor="white"
            borderColor="gray.100"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="1.5rem"
            boxShadow="rgba(50, 50, 0, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
            justifyContent="center"
            alignItems="center"
            w="100px"
            h="100px"
            p="1rem"
          >
            文字按鈕
          </Flex>
        </Tooltip>
        <Tooltip
          hasArrow
          label="2:1 橫式看板，具備輪播功能"
          placement="top"
          borderRadius="1.5rem"
          p="1rem 2rem"
        >
          <Flex
            bgColor="white"
            borderColor="gray.100"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="1.5rem"
            boxShadow="rgba(50, 50, 0, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
            justifyContent="center"
            alignItems="center"
            w="100px"
            h="100px"
            p="1rem"
          >
            橫幅看板
          </Flex>
        </Tooltip>
      </SimpleGrid>
    </VStack>
  );
}  

function SortableBlock({ item }) {
  return (
    <Box
      overflow="hidden"
      w="100%"
      bgColor="white"
      borderTopRadius="1rem"
      borderBottomRadius="md"
    >
      <Flex
        bgColor="gray.200"
        borderTopRadius="1rem"
        justifyContent="space-between"
        p="0.5rem 1rem"
      >
        <HStack spacing={2}>
          <IconButton
            aria-label="Sort block"
            bgColor="transparent"
            cursor="grab"
            fontSize="1.25rem"
            icon={<Icon as={MdDragIndicator} />}
          />
          <Switch />
        </HStack>
        <HStack spacing={2}>
          <Tooltip label="複製" borderRadius="1.5rem">
            <IconButton
              aria-label="Copy block"
              bgColor="transparent"
              icon={<Icon as={BsCopy} />}
            />
          </Tooltip>
          <Tooltip label="刪除" borderRadius="1.5rem">
            <IconButton
              aria-label="Delete block"
              bgColor="transparent"
              fontSize="1.25rem"
              icon={<Icon as={MdDelete} />}
            />
          </Tooltip>
          <Button rightIcon={<Icon as={MdEdit} />}>編輯</Button>
        </HStack>
      </Flex>

      {item.type === 'text-button' && (
        <VStack spacing={4}
          flexGrow="1"
          align="stretch"
          textAlign="center">
          {item.buttons.map((button, index) => {
            return (
              <Link
                key={index}
                href={button.linkUrl}
                target="_blank"
                display="flex"
                alignItems="center"
                backgroundColor={item.isSolid ? 'gray.900' : 'transparent'}
                color={item.isSolid ? '#fff' : 'gray.900'}
                textDecoration="none"
                border="2px"
                borderColor="gray.900"
                borderRadius="10px"
                fontWeight="bold"
                p="1rem"
                _hover={{
                  bgColor: 'gray.600',
                  transform: 'scale(1.03)',
                  textDecoration: 'none',
                  backgroundColor: item.isSolid ? '#fff' : 'gray.900',
                  color: item.isSolid ? 'gray.900' : '#fff',
                }}
              >
                {item.hasSubtitle ? (
                  <Icon
                    as={iconMap[button.icon]}
                    fontSize={iconSizeMapWithSubtitle[item.fontSize]}
                  />
                ) : (
                  <Icon
                    as={iconMap[button.icon]}
                    fontSize={iconSizeMap[item.fontSize]}
                  />
                )}

                {item.hasSubtitle ? (
                  <Text fontSize={fontSizeMapWithSubtitle[item.fontSize]} mx="auto">
                    {button.text}
                    <Text
                      as="span"
                      display="block"
                      fontSize="md"
                      fontWeight="normal"
                    >
                      {button.subText}
                    </Text>
                  </Text>
                ) : (
                  <Text fontSize={fontSizeMap[item.fontSize]} mx="auto">
                    {button.text}
                  </Text>
                )}
              </Link>
            );
          })}
        </VStack>
      )}

      {item.type === 'banner-board' && (
        <Box position="relative">
          <AspectRatio w="100%" ratio={2 / 1}>
            <Image
              src="https://bit.ly/naruto-sage"
              alt="naruto"
              objectFit="cover"
            />
          </AspectRatio>
          <Text
            bgImage="linear-gradient(transparent, rgba(0, 0, 0, 0.8) 90%)"
            color="white"
            fontSize="sm"
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            p="1rem"
          >
            {item.text}
          </Text>
        </Box>
      )}

      {item.type === 'square-board' && (
        <Box position="relative">
          <AspectRatio w="100%" ratio={1 / 1}>
            <Image
              src="https://bit.ly/naruto-sage"
              alt="naruto"
              objectFit="cover"
            />
          </AspectRatio>
          <Text
            bgImage="linear-gradient(transparent, rgba(0, 0, 0, 0.8) 90%)"
            color="white"
            fontSize="sm"
            position="absolute"
            bottom="0"
            left="0"
            right="0"
            p="1rem"
          >
            {item.text}
          </Text>
        </Box>
      )}

      {item.type === 'double-square-board' && (
        <SimpleGrid columns={2} spacing={4}>
          {item.blocks.map((block, index) => {
            return (
              <Link
                key={index}
                href={block.linkUrl}
                target="_blank"
                position="relative"
                _hover={{
                  transform: 'scale(1.03)',
                  transition: 'transform .3s',
                }}
              >
                {item.text}

                <Box position="relative">
                  <AspectRatio w="100%" ratio={1 / 1}>
                    <Image
                      src={block.imageUrl}
                      alt={block.text}
                      borderRadius="md"
                      objectFit="cover"
                    />
                  </AspectRatio>
                  <Text
                    bgImage="linear-gradient(transparent, rgba(0, 0, 0, 0.8) 90%)"
                    borderRadius="md"
                    color="white"
                    fontSize="sm"
                    position="absolute"
                    bottom="0"
                    left="0"
                    right="0"
                    p="1rem"
                  >
                    {block.text}
                  </Text>
                </Box>
              </Link>
            );
          })}
        </SimpleGrid>
      )}

      {item.type === 'video-player' && (
        <Box
          sx={{
            '.lty-playbtn': {
              backgroundImage: "url('/play-btn.svg')",
              backgroundSize: '1.25rem',
              backgroundRepeat: 'no-repeat',
              bgColor: 'black',
              filter: 'none',
              border: '2px solid white',
              borderRadius: '50%',
              w: '2.5rem',
              h: '2.5rem',
            },
            'lite-youtube': {
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 'md',
            },
          }}
        >
          <lite-youtube
            videoid={item.videoId}
            playlabel={'Play: ' + item.videoDescription}
          >
            <a
              href="https://youtube.com/watch?v=DZkbDCSdC1Q"
              className="lty-playbtn"
              title="Play Video"
            >
              <span className="lyt-visually-hidden">
                Play Video: {item.videoDescription}
              </span>
            </a>
          </lite-youtube>
        </Box>
      )}
    </Box>
  );
}

export default function Admin() {
  const profile = {
    avatar:
      'https://img.portaly.cc/5m-nfNgxp5htRXAXdUp4SAIVgGc-qG8qJ0hiYRcELq4/rs:fill:640/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vVUhpQlEwVTZJSlIwRHRWb2hIeTMlMkZhdmF0YXI_YWx0PW1lZGlhJnRva2VuPThlZjlkODAzLWQxOGUtNGM4Zi1iZmY3LWNlNTBmMDQwNzhhOA',
    email: 'durayray@gmail.com',
    name: '阿滴',
    description: '有妹妹然後教英文的那個',
    siteUrl: 'https://linkspace.com/durayray',
    links: [
      {
        icon: 'facebook',
        text: 'Facebook',
        url: 'https://www.facebook.com/RayDuEnglish',
      },
      {
        icon: 'instagram',
        text: 'Instagram',
        url: 'https://www.instagram.com/rayduenglish/',
      },
      {
        icon: 'twitter',
        text: 'Twitter',
        url: 'https://twitter.com/durayray',
      },
    ],
  };

  const blockItemData = [
    {
      id: 1,
      type: 'text-button',
      isSolid: true,
      hasSubtitle: false,
      fontSize: 'sm',
      buttons: [
        {
          text: '訂閱阿滴',
          subText: 'hello',
          icon: 'youtube',
          linkUrl:
            'https://www.youtube.com/@rayduenglish/featured?sub_confirmation=1',
        },
      ],
    },
    {
      id: 2,
      type: 'video-player',
      videoId: 'bQXLG1UNjdA',
      videoDescription:
        ' 班機取消卡在非洲? 拍攝行程大亂! 肯亞航空給了我這輩子最雷的飛行體驗😍 ',
    },
    {
      id: 3,
      type: 'double-square-board',
      blocks: [
        {
          imageUrl:
            'https://img.portaly.cc/qHx90MonPTYB1p1VfDPAHttiyLUTW4PEKPf-Hhf84pw/rs:fill:1080/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vVUhpQlEwVTZJSlIwRHRWb2hIeTMlMkZibG9ja3MlMkZGWmZ6anZFR2s2SGlVT01XeWlWTiUyRml0ZW1NYXAuLXVTQTNHQklxYlhXaXdBNDZadEZMLmltYWdlP2FsdD1tZWRpYSZ0b2tlbj0wMjQzNGIzOC1lN2RiLTRjMzUtODY1NS02YmYwODkzNDUzOTM',
          text: '阿滴英文 YT',
          linkUrl: 'https://www.youtube.com/@rayduenglish/featured',
        },
        {
          imageUrl:
            'https://img.portaly.cc/GRody5jF4DKi9XYBqU_YK7oYQSuPRr_UKO_CP0NUeIo/rs:fill:1080/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vVUhpQlEwVTZJSlIwRHRWb2hIeTMlMkZibG9ja3MlMkZGWmZ6anZFR2s2SGlVT01XeWlWTiUyRml0ZW1NYXAueEJYWG84eWJ1RVBZME9IaHJkUW1FLmltYWdlP2FsdD1tZWRpYSZ0b2tlbj0yNjA5NmE4Zi1lZjAzLTQ1N2ItYTQ3NC0xMWM4NDYzMzUyZjE',
          text: '阿滴日常 YT',
          linkUrl:
            'https://www.youtube.com/channel/UCL--AnIMxQQdbcH4ESEK0Iw/videos',
        },
      ],
    },
    {
      id: 4,
      type: 'text-button',
      isSolid: false,
      hasSubtitle: true,
      fontSize: 'sm',
      buttons: [
        {
          text: '阿滴的IG',
          subText: '有妹妹然後教英文的那個🙋🏻‍♂️',
          icon: 'instagram',
          linkUrl: 'https://www.instagram.com/rayduenglish/',
        },
        {
          text: '阿滴的日常IG',
          subText: '比較多日常廢文那個',
          icon: 'instagram',
          linkUrl: 'https://www.instagram.com/raydudaily/',
        },
        {
          text: '阿滴英文Facebook粉專',
          subText: '',
          icon: 'facebook',
          linkUrl: 'https://www.facebook.com/RayDuEnglish',
        },
        {
          text: '阿滴個人Facebook帳號',
          subText: '',
          icon: 'facebook',
          linkUrl: 'https://www.facebook.com/durayray',
        },
      ],
    }
  ];

  const [blockItems, setBlockItems] = useState(blockItemData);


  return (
    <>
      <Box
        as="header"
        w="100%"
        position="fixed"
        zIndex="100"
        top="0"
        bgColor="white"
        boxShadow="0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)"
      >
        <Flex
          justify="space-between"
          align="center"
          mx={{ base: '0.5rem', md: '4rem' }}
        >
          <Link
            p="0.75rem"
            fontSize="1.75rem"
            fontWeight="bold"
            textDecoration="none !important"
            letterSpacing="0.05em"
          >
            Linkspace
          </Link>
          <Menu isLazy>
            <MenuButton>
              <Avatar
                my="0.75rem"
                boxSize="60px"
                borderRadius="0.75rem"
                src={profile.avatar}
              />
            </MenuButton>
            <MenuList p="1rem">
              <Text fontWeight="bold">{profile.name}</Text>
              <Text fontSize="sm" mb="0.75rem">
                {profile.email}
              </Text>
              <Divider />
              <MenuItem borderRadius="0.75rem" mt="0.75rem" p="0">
                <Button
                  bgColor="white"
                  w="100%"
                  justifyContent="flex-start"
                  leftIcon={<Icon as={MdLogout} />}
                >
                  登出
                </Button>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Box>
      <Box
        ml={{
          base: 0,
          lg: '20rem',
        }}
      >
        <Container maxW="lg" mt="10rem" mb="5rem">
          <Flex justifyContent="space-between">
            <DraggableItemPanel />
            <VStack w="100%" spacing={8}>
              <InputGroup
                bgColor="white"
                borderColor="gray.50"
                borderRadius="1.5rem"
                focusBorderColor="gray.50"
                boxShadow="0 1px 2px 0 rgba(0, 0, 0, 0.05)"
                alignItems="center"
                p="0.5rem 1rem"
                w="100%"
              >
                <Input
                  isReadOnly
                  border="0"
                  size="lg"
                  value={profile.siteUrl}
                />
                <Tooltip label="複製網址" borderRadius="1.5rem">
                  <IconButton
                    aria-label="Copy website URL"
                    colorScheme="teal"
                    variant="outline"
                    icon={<Icon as={MdContentCopy} />}
                    _hover={{
                      background: 'white',
                    }}
                  />
                </Tooltip>
                <Tooltip label="開啟頁面" borderRadius="1.5rem">
                  <Link
                    href={profile.siteUrl}
                    isExternal
                    aria-label="Go to the website"
                    colorScheme="teal"
                    border="1px"
                    borderRadius="md"
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minW="2.5rem"
                    minH="2.5rem"
                    ml="0.5rem"
                  >
                    <Icon as={FiExternalLink} />
                  </Link>
                </Tooltip>
              </InputGroup>

              <VStack
                position="relative"
                w="100%"
                spacing="1rem"
                p="3rem"
                pb="1rem"
              >
                <Tooltip label="分享" borderRadius="1.5rem">
                  <IconButton
                    position="absolute"
                    left="2rem"
                    top="1rem"
                    bgColor="transparent"
                    icon={<Icon fontSize="1.5rem" as={MdIosShare} />}
                  />
                </Tooltip>

                <Avatar size="2xl" src={profile.avatar} />

                <Box textAlign="center">
                  <Heading as="h1" size="md" mb="0.5rem">
                    {profile.name}
                  </Heading>
                  <Text whiteSpace="pre-wrap">{profile.description}</Text>
                </Box>

                <Wrap spacing={6} my="0.5rem">
                  {profile.links.map((link, index) => {
                    return (
                      <WrapItem key={index}>
                        <Tooltip label={link.text} borderRadius="1.5rem">
                          <Link
                            href={link.url}
                            target="_blank"
                            bgColor="transparent"
                            _hover={{
                              transform: 'scale(1.2)',
                            }}
                          >
                            <Icon as={iconMap[link.icon]} fontSize="1.5rem" />
                          </Link>
                        </Tooltip>
                      </WrapItem>
                    );
                  })}
                </Wrap>

                <Button
                  aria-label="Edit the profile"
                  colorScheme="teal"
                  variant="outline"
                  border="0"
                  borderRadius="1.5rem"
                  rightIcon={<Icon fontSize="20px" as={MdEdit} />}
                >
                  編輯個人檔案
                </Button>
              </VStack>

              {blockItems.map((item, index) => {
                return <SortableBlock key={index} item={item} />;
              })}
            </VStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
