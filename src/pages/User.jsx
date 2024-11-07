import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MultiTypeBlock from '../components/MultiTypeBlock';
import UserProfile from '../components/UserProfile';

import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../utils/firebase';

import { Box, Container, Heading, VStack } from '@chakra-ui/react';


import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';


import { bgColorsMap } from '../constants/utilityMaps';


export default function User() {
  const params = useParams();
  const { userId } = params;

  const [profile, setProfile] = useState({});
  const [blocks, setBlocks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        const userRef = collection(db, 'users');
        const q = query(userRef, where('slug', '==', userId));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();

          setProfile(userData.profile);
          setBlocks(userData.blocks);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, [userId]);

  if (!isLoading && Object.keys(profile).length === 0) return (
    <Heading>此頁面不存在</Heading>
  );

  return (
    <Box bgColor={bgColorsMap[profile.bgColor]} minH="100vh">
      <Container maxW="lg" py="4rem">
        <VStack spacing={8}>

          {Object.keys(profile).length && <UserProfile profile={profile} />}

          {blocks.map((block, index) => {
            return (
              <MultiTypeBlock
                key={index}
                block={block}
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
