import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import MultiTypeBlock from '../components/MultiTypeBlock';
import UserProfile from '../components/UserProfile';


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
            <UserProfile profile={profile}/>
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
