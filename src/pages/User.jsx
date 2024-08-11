import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { fetchUserProfile, fetchUserBlockItems } from '../apis';

import {
  AspectRatio,
  Avatar,
  Box,
  Container,
  Flex,
  Heading,
  Icon,
  IconButton,
  Image,
  Link,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { MdIosShare, MdImage } from 'react-icons/md';

import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';

import {
  fontSizeMap,
  fontSizeMapWithSubtitle,
  iconSizeMap,
  iconSizeMapWithSubtitle,
  iconMap,
} from '../constants/utilityMaps';

const effectMap = {
  none: '',
  wobble: 'animate__wobble',
  shakeX: 'animate__shakeX',
  pulse: 'animate__pulse',
};

export default function User() {
  const params = useParams();
  const { userId } = params;

  const [profile, setProfile] = useState({});
  const [blockItems, setBlockItems] = useState([]);

  useEffect(() => {
    const loadUser = async () => {
      const profileData = await fetchUserProfile(userId);

      if (profileData.profile) {
        setProfile(profileData.profile);
      }

      const blockItemsData = await fetchUserBlockItems(userId);

      if (blockItemsData.blockItems) {
        setBlockItems(blockItemsData.blockItems);
      }
    };

    loadUser();
  }, [userId]);

  return (
    <Container maxW="lg" my="4rem">
      <VStack spacing={8}>
        {Object.keys(profile).length === 0 && blockItems.length === 0 && (
          <Heading>此頁面不存在</Heading>
        )}

        {Object.keys(profile).length && (
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
              {profile.links?.map((link, index) => {
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
          </VStack>
        )}

        {blockItems.map((item, index) => {
          return <Block key={index} item={item} />;
        })}
      </VStack>
    </Container>
  );
}

function Block({ item }) {
  return (
    <Box w="100%" bgColor="transparent" borderRadius="md">
      {item.type === 'text-button' && (
        <VStack spacing={4}
          flexGrow="1"
          align="stretch"
          textAlign="center">
          {item.buttons.map((button, index) => {
            return (
              <Link
                style={{ '--animate-duration': '2s' }}
                href={button.linkUrl}
                isExternal
                key={index}
                className={`animate__animated animate__infinite ${effectMap[button.effect]}`}
                display="flex"
                alignItems="center"
                backgroundColor={item.isSolid ? 'gray.900' : 'transparent'}
                color={item.isSolid ? '#fff' : 'gray.900'}
                textDecoration="none"
                border="2px"
                borderColor="gray.900"
                borderRadius="10px"
                p="1rem"
                _hover={{
                  transform: 'scale(1.03)',
                  textDecoration: 'none',
                  backgroundColor: item.isSolid ? '#fff' : 'gray.900',
                  color: item.isSolid ? 'gray.900' : '#fff',
                }}
              >
                {item.hasSubtitle && !item.hasImage && (
                  <Icon
                    as={iconMap[button.icon]}
                    fontSize={iconSizeMapWithSubtitle[item.fontSize]}
                  />
                )}
                {!item.hasSubtitle && !item.hasImage && (
                  <Icon
                    as={iconMap[button.icon]}
                    fontSize={iconSizeMap[item.fontSize]}
                  />
                )}

                {item.hasImage && button.imageUrl && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    bgColor="gray.400"
                    boxShadow="md"
                    rounded="sm"
                  >
                    <AspectRatio maxW="128px" w="4rem" ratio={1}>
                      <Image
                        src={button.imageUrl}
                        alt={button.imageAlt}
                        rounded="sm"
                      />
                    </AspectRatio>
                  </Flex>
                )}

                {item.hasImage && !button.imageUrl && (
                  <Flex
                    justifyContent="center"
                    alignItems="center"
                    p="1rem"
                    bgColor="gray.400"
                    boxShadow="md"
                    rounded="sm"
                  >
                    <Icon as={MdImage} fontSize="1.5rem" />
                  </Flex>
                )}

                {item.hasSubtitle ? (
                  <Text fontSize={fontSizeMapWithSubtitle[item.fontSize]} mx="auto">
                    {button.text}
                    <Text as="span" display="block" fontSize="md">
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
                <AspectRatio w="100%" ratio={1 / 1}>
                  <Image
                    src={block.imageUrl}
                    alt="naruto"
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
