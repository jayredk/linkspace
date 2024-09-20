import { useEffect, useState } from 'react';

import MultiTypeBlock from '../../components/MultiTypeBlock';
import UserProfile from '../../components/UserProfile';
import BlockEditorModal from './BlockEditorModal';
import ProfileEditorModal from './ProfileEditorModal';

import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  HStack,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  SimpleGrid,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  VStack
} from '@chakra-ui/react';

import {
  MdContentCopy,
  MdDelete,
  MdDragIndicator,
  MdEdit,
  MdLogout
} from 'react-icons/md';

import { BsCopy } from 'react-icons/bs';

import { FiExternalLink } from 'react-icons/fi';

import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';


import {
  bgColorsMap
} from '../../constants/utilityMaps';


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

// const handleEditBlock = (item) => {
//   setTempBlockData(item);
//   openEditBlockModal();
// };

function SortableBlock({
  blockItem,
  openEditBlockModal,
  setTempBlockData,
  themeColor,
}) {
  const handleEditBlock = () => {
    setTempBlockData(blockItem);
    openEditBlockModal();
  };

  return (
    <Box
      overflow="hidden"
      w="100%"
      bgColor="white"
      borderTopRadius="1rem"
      borderBottomRadius="xl"
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
          <Button onClick={handleEditBlock} rightIcon={<Icon as={MdEdit} />}>
            編輯
          </Button>
        </HStack>
      </Flex>

      <MultiTypeBlock blockItem={blockItem} themeColor={themeColor} />
    </Box>
  );
}


import { fetchUserBlockItems, fetchUserProfile } from '../../apis';
const userId = 'durayray';

export default function Admin() {
  const [profile, setProfile] = useState({});
  const [blockItems, setBlockItems] = useState([]);

  const {
    isOpen: isEditProfileModalOpen,
    onOpen: openEditProfileModal,
    onClose: closeEditProfileModal,
  } = useDisclosure();

  const { isOpen: isEditBlockModalOpen, onOpen: openEditBlockModal, onClose: closeEditBlockModal } = useDisclosure();
  const [tempBlockData, setTempBlockData] = useState({});

  useEffect(() => {
    const loadUser = async () => {
      const profileData = await fetchUserProfile(userId);
      setProfile(profileData.profile);

      const blockItemsData = await fetchUserBlockItems(userId);
      setBlockItems(blockItemsData.blockItems);
    };

    loadUser();
  }, []);

  return (
    <Box bgColor={bgColorsMap[profile.bgColor]}>
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
        <Container maxW="lg" pt="10rem" pb="5rem">
          <Flex justifyContent="space-between">
            <DraggableItemPanel />

            <VStack w="100%" spacing={8}>
              {Object.keys(profile).length && (
                <>
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
                  <UserProfile profile={profile}>
                    <Button onClick={openEditProfileModal}>編輯個人檔案</Button>
                  </UserProfile>
                </>
              )}

              {blockItems &&
                blockItems.map((blockItem, index) => {
                  return (
                    <SortableBlock
                      key={index}
                      blockItem={blockItem}
                      openEditBlockModal={openEditBlockModal}
                      setTempBlockData={setTempBlockData}
                      themeColor={profile.themeColor}
                    />
                  );
                })}
            </VStack>
          </Flex>
        </Container>
      </Box>
      <BlockEditorModal
        isOpen={isEditBlockModalOpen}
        onClose={closeEditBlockModal}
        setBlockItems={setBlockItems}
        tempBlockData={tempBlockData}
        themeColor={profile.themeColor}
      />

      <ProfileEditorModal
        isOpen={isEditProfileModalOpen}
        onClose={closeEditProfileModal}
        profile={profile}
        setProfile={setProfile}
        themeColor={profile.themeColor}
      />
      
    </Box>
  );
}
