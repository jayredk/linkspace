import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MultiTypeBlock from '../components/MultiTypeBlock';

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
  themeColorsMap,
  bgColorsMap,
  textColorMap,
  effectMap,
  fontSizeMap,
  fontSizeMapWithSubtitle,
  iconSizeMap,
  iconSizeMapWithSubtitle,
  iconMap,
} from '../constants/utilityMaps';



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
    <Box bgColor={bgColorsMap[profile.bgColor]}>
      <Container maxW="lg" py="4rem">
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
                  color={themeColorsMap[profile.themeColor]}
                  bgColor="transparent"
                  icon={<Icon fontSize="1.5rem" as={MdIosShare} />}
                />
              </Tooltip>
              <Avatar size="2xl" src={profile.avatar} />
              <Box textAlign="center" color={textColorMap[profile.textColor]}>
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
                          color={themeColorsMap[profile.themeColor]}
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
            return (
              <MultiTypeBlock
                key={index}
                blockItem={item}
                themeColor={profile.themeColor}
                isAnimating={true}
              />
            );
          })}
        </VStack>
      </Container>
    </Box>
  );
}
