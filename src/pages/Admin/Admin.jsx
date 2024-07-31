import { useState, useEffect } from 'react';

import {
  AspectRatio,
  Avatar,
  Box,
  Button,
  Card,
  CardBody,
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
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Select,
  SimpleGrid,
  Stack,
  Switch,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import {
  MdContentCopy,
  MdClose,
  MdDelete,
  MdDragIndicator,
  MdEdit,
  MdIosShare,
  MdLogout,
  MdOutlineEmojiEmotions,
  MdTitle,
} from 'react-icons/md';

import {
  BsCopy,
  BsFacebook,
  BsInstagram,
  BsLink45Deg,
  BsThreadsFill,
  BsTiktok,
  BsTwitterX,
  BsYoutube,
} from 'react-icons/bs';

import { IoInformation } from 'react-icons/io5';

import { FiExternalLink } from 'react-icons/fi';

import { BiTimer } from 'react-icons/bi';

import 'lite-youtube-embed/src/lite-yt-embed.css';
import 'lite-youtube-embed/src/lite-yt-embed.js';

import 'animate.css';


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

const iconArray = Object.entries(iconMap).map(([key, value]) => ({
  name: key,
  icon: value,
}));


function BasicModal({
  tempBlockData,
  setTempBlockData,
  isOpen,
  onClose,
  setBlockItems,
}) {

  const [modalState, setModalState] = useState(tempBlockData);

  const {
    buttons = [],
    hasImage = false,
    hasSubtitle = false,
    isSolid = false,
    fontSize = 'sm',
  } = modalState;
  console.log(modalState);

  const effectMap = {
    none: '',
    wobble: 'animate__wobble',
    shakeX: 'animate__shakeX',
    pulse: 'animate__pulse',
  };

  function handleModalStateChange(e) {

    const { name, value } = e.target;
    console.log(name, value);

    switch (name) {
      case 'fontSize':
        setModalState({
          ...modalState,
          [name]: value,
        });
        break;

      case 'text':
      case 'subText': {
        const index = e.target.dataset.index;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        name === 'text'
          ? (newButtons[index].text = value)
          : (newButtons[index].subText = value);

        setModalState({
          ...modalState,
          buttons: newButtons,
        });
        break;
      }

      case 'isSolid':
        setModalState({
          ...modalState,
          [name]: e.target.checked,
        });
        break;

      case 'hasSubtitle':
        setModalState({
          ...modalState,
          [name]: e.target.checked,
        });
        break;

      case 'changeIcon': {
        console.log(e.target);
        const index = e.target.dataset.index;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons[index].icon = e.target.value;
        setModalState({
          ...modalState,
          buttons: newButtons,
        });
        break;
      }

      case 'url': {
        const url = e.target.value;
        const index = e.target.dataset.index;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons[index].linkUrl = url;
        setModalState({
          ...modalState,
          buttons: newButtons,
        });

        break;
      }

      case 'effect': {
        const buttonIndex = e.target.dataset.index;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons[buttonIndex].effect = e.target.value;
        setModalState({
          ...modalState,
          buttons: newButtons,
        });
        break;
      }

      case 'newButton': {
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons.push({
          effect: 'none',
          text: '',
          subText: '',
          icon: '',
          linkUrl: '',
        });

        setModalState({
          ...modalState,
          buttons: newButtons,
        });
        break;
      }

      case 'removeButton': {
        const index = e.target.dataset.index;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons.splice(index, 1);

        setModalState({
          ...modalState,
          buttons: newButtons,
        });

        break;
      }

      default:
        break;
    }
  }

  function handleSave(e) {
    setBlockItems((prevState) => {
      const index = prevState.findIndex((item) => item.id === modalState.id);
      const newItems = [...prevState];
      newItems[index] = { ...modalState };
      console.log(newItems);
      return newItems;
    });
    setTempBlockData({});
    onClose();
  }

  function handleClose() {
    setModalState(tempBlockData);
  }

  useEffect(() => {
    setModalState(tempBlockData);
  }, [tempBlockData]);

  return (
    <>
      {/* <Button onClick={onOpen}>Open Modal</Button> */}

      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onClose}
        w="100%"
        size="6xl"
      >
        <ModalOverlay />
        <ModalContent
          borderTopRadius="20px"
          backgroundColor="gray.200"
          flexDirection="row"
        >
          <ModalHeader
            borderTopRadius="20px"
            backgroundColor="#000"
            color="#fff"
            display="flex"
            alignItems="center"
            position="absolute"
            left="0"
            right="0"
            mb="1.5rem"
          >
            <Heading size="lg">編輯區塊</Heading>
            <ModalCloseButton onClick={handleClose} color="#fff" />
          </ModalHeader>
          <ModalBody maxW="50%" mt="6rem">
            <Flex>
              <Box>
                <Heading as="h3" size="md" mb="1rem">
                  按鈕樣式
                </Heading>
                <Wrap spacing="2rem" borderRadius="20px" mb="2rem">
                  <WrapItem
                    backgroundColor="gray.400"
                    borderRadius="20px"
                    p="0.5rem 0.75rem"
                  >
                    <HStack spacing="24px">
                      <Text fontWeight="500">按鈕填滿</Text>
                      <Switch
                        name="isSolid"
                        onChange={handleModalStateChange}
                        isChecked={isSolid}
                      />
                    </HStack>
                  </WrapItem>
                  <WrapItem
                    backgroundColor="gray.400"
                    borderRadius="20px"
                    p="0.5rem 0.75rem"
                  >
                    <HStack spacing="24px">
                      <Text fontWeight="500">按鈕圖片</Text>
                      <Switch />
                    </HStack>
                  </WrapItem>
                  <WrapItem
                    backgroundColor="gray.400"
                    borderRadius="20px"
                    p="0.5rem 0.75rem"
                  >
                    <HStack spacing="24px">
                      <Text fontWeight="500">按鈕副標</Text>
                      <Switch
                        name="hasSubtitle"
                        onChange={handleModalStateChange}
                        isChecked={hasSubtitle}
                      />
                    </HStack>
                  </WrapItem>
                </Wrap>
                <Heading as="h3" size="md" mb="1rem">
                  字體大小
                </Heading>
                <RadioGroup
                  borderRadius="20px"
                  mb="2rem"
                  name="fontSize"
                  value={fontSize}
                >
                  <Stack
                    direction="row"
                    backgroundColor="gray.400"
                    borderRadius="20px"
                    p="0.5rem 0.75rem"
                  >
                    <Radio
                      onChange={handleModalStateChange}
                      value="sm"
                      mx="0.5rem"
                    >
                      小
                    </Radio>
                    <Radio
                      onChange={handleModalStateChange}
                      value="md"
                      mx="0.5rem"
                    >
                      中
                    </Radio>
                    <Radio
                      onChange={handleModalStateChange}
                      value="lg"
                      mx="0.5rem"
                    >
                      大
                    </Radio>
                    <Radio
                      onChange={handleModalStateChange}
                      value="xl"
                      mx="0.5rem"
                    >
                      特大
                    </Radio>
                  </Stack>
                </RadioGroup>
                {buttons.map((button, index) => {
                  return (
                    <Card key={index} borderRadius="20px" mb="1rem">
                      <CardBody>
                        <Flex alignItems="center" mb="1rem">
                          <Heading as="h5" fontSize="lg" mr={4}>
                            選擇 Icon
                          </Heading>
                          <Popover isLazy>
                            {({ isOpen, onClose }) => (
                              <>
                                <PopoverTrigger>
                                  <IconButton
                                    icon={<Icon as={MdOutlineEmojiEmotions} />}
                                  />
                                </PopoverTrigger>
                                <PopoverContent>
                                  <PopoverHeader fontWeight="semibold">
                                    Icon 列表
                                  </PopoverHeader>
                                  <PopoverArrow />
                                  <PopoverCloseButton />
                                  <PopoverBody>
                                    {iconArray.map((icon, iconIndex) => {
                                      return (
                                        <IconButton
                                          key={iconIndex}
                                          bgColor="transparent"
                                          fontSize="xl"
                                          name="changeIcon"
                                          value={icon.name}
                                          data-index={index}
                                          onClick={(e) => {
                                            handleModalStateChange(e);
                                            onClose();
                                          }}
                                          icon={
                                            <Icon as={iconMap[icon.name]} />
                                          }
                                        />
                                      );
                                    })}
                                  </PopoverBody>
                                </PopoverContent>
                              </>
                            )}
                          </Popover>
                          <IconButton
                            name="removeButton"
                            data-index={index}
                            onClick={handleModalStateChange}
                            icon={<Icon as={MdClose} />}
                            bgColor="gray.600"
                            color="white"
                            ml="auto"
                            _hover={{
                              bgColor: 'gray.700',
                            }}
                          ></IconButton>
                        </Flex>
                        <Flex alignItems="center" mb="1rem">
                          <Icon as={MdTitle} mr="1rem" fontSize="xl" />
                          <Input
                            name="text"
                            data-index={index}
                            value={button.text}
                            onChange={handleModalStateChange}
                            backgroundColor="gray.400"
                            placeholder="按鈕文字"
                          />
                        </Flex>
                        {hasSubtitle && (
                          <Flex alignItems="center" mb="1rem">
                            <Icon as={IoInformation} fontSize="xl" mr="1rem" />
                            <Input
                              name="subText"
                              data-index={index}
                              value={button.subText}
                              onChange={handleModalStateChange}
                              backgroundColor="gray.400"
                              placeholder="副標題：說明文字"
                            />
                          </Flex>
                        )}
                        <Flex alignItems="center" mb="1rem">
                          <Icon as={BsLink45Deg} fontSize="xl" mr="1rem" />
                          <Input
                            name="url"
                            data-index={index}
                            backgroundColor="gray.400"
                            placeholder="請輸入網址"
                            onChange={handleModalStateChange}
                            value={button.linkUrl}
                          />
                        </Flex>
                        <Flex alignItems="center" mb="1rem">
                          <Icon as={BiTimer} mr="1rem" fontSize="xl" />
                          <Select
                            name="effect"
                            data-index={index}
                            onChange={handleModalStateChange}
                            value={button.effect}
                            backgroundColor="gray.400"
                          >
                            <option value="none">無動態效果</option>
                            <option value="wobble">搖晃</option>
                            <option value="shakeX">震動</option>
                            <option value="pulse">跳動</option>
                          </Select>
                        </Flex>
                      </CardBody>
                    </Card>
                  );
                })}

                <Button
                  name="newButton"
                  onClick={handleModalStateChange}
                  isDisabled={buttons.length === 5}
                  w="100%"
                  borderRadius="lg"
                  bgColor="gray.700"
                  color="white"
                  _hover={{
                    bgColor: 'gray.600',
                  }}
                >
                  新增按鈕
                </Button>
              </Box>
            </Flex>
          </ModalBody>

          <ModalFooter
            flexDirection="column"
            justifyContent="space-between"
            flexGrow="1"
            maxW="50%"
            mt="6rem"
          >
            <Container>
              <VStack
                spacing={4}
                flexGrow="1"
                align="stretch"
                textAlign="center"
              >
                {buttons.map((button, index) => {
                  return (
                    <Link
                      style={{'--animate-duration': '2s'}}
                      href={button.linkUrl}
                      isExternal
                      key={index}
                      className={`animate__animated animate__infinite ${effectMap[button.effect]}`}
                      display="flex"
                      alignItems="center"
                      backgroundColor={isSolid ? 'gray.900' : 'transparent'}
                      color={isSolid ? '#fff' : 'gray.900'}
                      textDecoration="none"
                      border="2px"
                      borderColor="gray.900"
                      borderRadius="10px"
                      p="1rem"
                      _hover={{
                        transform: 'scale(1.03)',
                        textDecoration: 'none',
                        backgroundColor: isSolid ? '#fff' : 'gray.900',
                        color: isSolid ? 'gray.900' : '#fff',
                      }}
                    >
                      {hasSubtitle ? (
                        <Icon
                          as={iconMap[button.icon]}
                          fontSize={iconSizeMapWithSubtitle[fontSize]}
                        />
                      ) : (
                        <Icon
                          as={iconMap[button.icon]}
                          fontSize={iconSizeMap[fontSize]}
                        />
                      )}

                      {hasSubtitle ? (
                        <Text
                          fontSize={fontSizeMapWithSubtitle[fontSize]}
                          mx="auto"
                        >
                          {button.text}
                          <Text as="span" display="block" fontSize="md">
                            {button.subText}
                          </Text>
                        </Text>
                      ) : (
                        <Text fontSize={fontSizeMap[fontSize]} mx="auto">
                          {button.text}
                        </Text>
                      )}
                    </Link>
                  );
                })}
              </VStack>
            </Container>

            {/* <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button> */}

            <Button
              onClick={handleSave}
              alignSelf="flex-end"
              colorScheme="blue"
            >
              儲存
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}

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
//   onModalOpen();
// };

function SortableBlock({ item, onModalOpen, setTempBlockData }) {

  const handleEditBlock = () => {
    setTempBlockData(item);
    onModalOpen();
  };

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
          <Button onClick={handleEditBlock} rightIcon={<Icon as={MdEdit} />}>
            編輯
          </Button>
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
          effect: 'wobble',
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
          effect: 'none',
          text: '阿滴的IG',
          subText: '有妹妹然後教英文的那個🙋🏻‍♂️',
          icon: 'instagram',
          linkUrl: 'https://www.instagram.com/rayduenglish/',
        },
        {
          effect: 'none',
          text: '阿滴的日常IG',
          subText: '比較多日常廢文那個',
          icon: 'instagram',
          linkUrl: 'https://www.instagram.com/raydudaily/',
        },
        {
          effect: 'none',
          text: '阿滴英文Facebook粉專',
          subText: '',
          icon: 'facebook',
          linkUrl: 'https://www.facebook.com/RayDuEnglish',
        },
        {
          effect: 'none',
          text: '阿滴個人Facebook帳號',
          subText: '',
          icon: 'facebook',
          linkUrl: 'https://www.facebook.com/durayray',
        },
      ],
    }
  ];

  const [blockItems, setBlockItems] = useState(blockItemData);

  const { isOpen, onOpen: onModalOpen, onClose } = useDisclosure();
  const [tempBlockData, setTempBlockData] = useState({});

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
              </VStack>

              {blockItems.map((item, index) => {
                return (
                  <SortableBlock
                    key={index}
                    item={item}
                    onModalOpen={onModalOpen}
                    setTempBlockData={setTempBlockData}
                  />
                );
              })}
            </VStack>
          </Flex>
        </Container>
      </Box>

      <BasicModal
        isOpen={isOpen}
        onClose={onClose}
        setBlockItems={setBlockItems}
        tempBlockData={tempBlockData}
        setTempBlockData={setTempBlockData}
      />
    </>
  );
}


