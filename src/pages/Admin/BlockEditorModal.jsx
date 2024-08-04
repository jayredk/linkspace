import { useEffect, useState } from 'react';

import CropModal from './CropModal';

import {
  AspectRatio,
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
  Link,
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
  Stack,
  Switch,
  Text,
  useDisclosure,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import {
  MdClose,
  MdImage,
  MdOutlineEmojiEmotions,
  MdTitle,
} from 'react-icons/md';

import {
  BsFacebook,
  BsInstagram,
  BsLink45Deg,
  BsThreadsFill,
  BsTiktok,
  BsTwitterX,
  BsYoutube,
} from 'react-icons/bs';

import { IoInformation } from 'react-icons/io5';

import { BiTimer } from 'react-icons/bi';

import 'animate.css';

import firebase from '../../utils/firebase';
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';


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
  tiktok: BsTiktok,
  threads: BsThreadsFill,
};

const iconArray = Object.entries(iconMap).map(([key, value]) => ({
  name: key,
  icon: value,
}));


export default function BlockEditorModal({
  tempBlockData,
  setTempBlockData,
  isOpen,
  onClose,
  setBlockItems,
}) {
  const [modalState, setModalState] = useState(tempBlockData);

  const {
    isOpen: isCropModalOpen,
    onOpen: onCropModalOpen,
    onClose: onCropModalClose,
  } = useDisclosure();

  const [tempImageInfo, setTempImageInfo] = useState({
    imageUrl: null,
    index: null,
  });

  const [tempCroppedImage, setTempCroppedImage] = useState(null);

  const {
    buttons = [],
    hasImage = false,
    hasSubtitle = false,
    isSolid = false,
    fontSize = 'sm',
  } = modalState;

  const effectMap = {
    none: '',
    wobble: 'animate__wobble',
    shakeX: 'animate__shakeX',
    pulse: 'animate__pulse',
  };

  function handleModalStateChange(e) {
    const { name } = e.currentTarget;

    switch (name) {
      case 'fontSize':
        setModalState({
          ...modalState,
          [name]: e.currentTarget.value,
        });
        break;

      case 'text':
      case 'subText': {
        const { index } = e.currentTarget.dataset;
        const { value } = e.currentTarget;
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
      case 'hasImage':
      case 'hasSubtitle':
        setModalState({
          ...modalState,
          [name]: e.currentTarget.checked,
        });
        break;

      case 'imageAlt': {
        const { index } = e.currentTarget.dataset;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons[index].imageAlt = e.currentTarget.value;

        setModalState({
          ...modalState,
          buttons: newButtons,
        });
        break;
      }

      case 'changeIcon': {
        const { index } = e.currentTarget.dataset;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons[index].icon = e.currentTarget.value;
        setModalState({
          ...modalState,
          buttons: newButtons,
        });
        break;
      }

      case 'url': {
        const url = e.currentTarget.value;
        const { index } = e.currentTarget.dataset;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons[index].linkUrl = url;
        setModalState({
          ...modalState,
          buttons: newButtons,
        });

        break;
      }

      case 'effect': {
        const { index } = e.currentTarget.dataset;
        const newButtons = JSON.parse(JSON.stringify(buttons));

        newButtons[index].effect = e.currentTarget.value;
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
        const { index } = e.currentTarget.dataset;
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
    setModalState({});
    onClose();
  }

  function handleClose() {
    setModalState(tempBlockData);
  }

  function handleImageChange(e) {
    const image = e.currentTarget.files[0];
    const { index } = e.currentTarget.dataset;

    const newButtons = JSON.parse(JSON.stringify(buttons));

    const imageUrl = URL.createObjectURL(image);

    newButtons[index].imageUrl = imageUrl;

    setModalState({
      ...modalState,
      buttons: newButtons,
    });

    setTempImageInfo({
      imageUrl,
      index,
    });

    onCropModalOpen();
  }

  async function handleUploadImage(e) {
    const image = e.currentTarget.files[0];
    const { index } = e.currentTarget.dataset;

    const metadata = {
      contentType: image.type,
    };

    const storage = getStorage();
    const imageRef = ref(storage, `block-images/${image.name}`);

    const snapshot = await uploadBytes(imageRef, image, metadata);

    const imageUrl = await getDownloadURL(snapshot.ref);

    const newButtons = JSON.parse(JSON.stringify(buttons));
    console.log(index);
    newButtons[index].imageUrl = imageUrl;

    setModalState({
      ...modalState,
      buttons: newButtons,
    });
  }

  useEffect(() => {
    setModalState(tempBlockData);
  }, [tempBlockData]);

  useEffect(() => {
    setModalState((prevState) => {
      const newButtons = JSON.parse(JSON.stringify(prevState.buttons || []));

      if (tempImageInfo.index) {
        newButtons[tempImageInfo.index].imageUrl = tempCroppedImage;
      }

      return {
        ...prevState,
        buttons: newButtons,
      };
    });
  }, [tempCroppedImage, tempImageInfo.index]);

  return (
    <>
      <Modal
        closeOnOverlayClick={false}
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
                      <Switch
                        name="hasImage"
                        onChange={handleModalStateChange}
                        isChecked={hasImage}
                      />
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
                    <BlockInfoEditor
                      key={index}
                      buttons={buttons}
                      button={button}
                      index={index}
                      hasImage={hasImage}
                      hasSubtitle={hasSubtitle}
                      isSolid={isSolid}
                      fontSize={fontSize}
                      handleModalStateChange={handleModalStateChange}
                      handleImageChange={handleImageChange}
                      onCropModalOpen={onCropModalOpen}
                    />
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
                      style={{ '--animate-duration': '2s' }}
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
                      {hasSubtitle && !hasImage && (
                        <Icon
                          as={iconMap[button.icon]}
                          fontSize={iconSizeMapWithSubtitle[fontSize]}
                        />
                      )}
                      {!hasSubtitle && !hasImage && (
                        <Icon
                          as={iconMap[button.icon]}
                          fontSize={iconSizeMap[fontSize]}
                        />
                      )}

                      {hasImage && button.imageUrl && (
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

                      {hasImage && !button.imageUrl && (
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
      <CropModal
        isOpen={isCropModalOpen}
        onOpen={onCropModalOpen}
        onClose={onCropModalClose}
        tempImageInfo={tempImageInfo}
        setTempCroppedImage={setTempCroppedImage}
      />
    </>
  );
}


function BlockInfoEditor({
  buttons,
  button,
  index,
  hasImage,
  hasSubtitle,
  isSolid,
  fontSize,
  handleModalStateChange,
  handleImageChange,
  onCropModalOpen,
}) {
  return (
    <Card borderRadius="20px" mb="1rem">
      <CardBody>
        <Flex justifyContent="space-between" alignItems="center">
          <Heading as="h3" fontSize="1.25rem">
            按鈕資訊
          </Heading>
          <IconButton
            isDisabled={buttons.length === 1}
            name="removeButton"
            data-index={index}
            onClick={handleModalStateChange}
            icon={<Icon as={MdClose} />}
            bgColor="gray.600"
            color="white"
            _hover={{
              bgColor: 'gray.700',
            }}
          ></IconButton>
        </Flex>
        <Divider my="0.5rem" />
        <Flex alignItems="center" mb="1rem">
          {hasImage ? (
            <>
              {button.imageUrl ? (
                <Box position="relative">
                  <Image
                    maxW="80px"
                    mr="1rem"
                    rounded="xl"
                    objectFit="cover"
                    src={button.imageUrl}
                    alt="Dan Abramov"
                  />
                  <Input
                    data-index={index}
                    onChange={handleImageChange}
                    id={`uploadBtn${index}`}
                    accept="image/apng,image/gif,image/bmp,image/jpeg,image/png,image/webp"
                    position="absolute"
                    inset="0"
                    height="100%"
                    opacity="0"
                    maxW="80px"
                    mr="1rem"
                    rounded="xl"
                    type="file"
                  />
                </Box>
              ) : (
                <label
                  style={{
                    position: 'relative',
                    width: '100px',
                    height: '100px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: '1rem',
                    backgroundColor: '#E2E8F0',
                    borderRadius: '20px',
                  }}
                  htmlFor={`uploadBtn${index}`}
                >
                  <Icon fontSize="1.5rem" as={MdImage}></Icon>
                  <Input
                    data-index={index}
                    onChange={handleImageChange}
                    id={`uploadBtn${index}`}
                    accept="image/apng,image/gif,image/bmp,image/jpeg,image/png,image/webp"
                    position="absolute"
                    inset="0"
                    opacity="0"
                    maxW="80px"
                    mr="1rem"
                    rounded="xl"
                    type="file"
                  />
                </label>
              )}

              <Box flexGrow="1">
                <Flex gap="0.5rem" mb="0.5rem">
                  <Button flexGrow="1">
                    上傳圖片
                    <label
                      htmlFor={`uploadBtn${index}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        position: 'absolute',
                        cursor: 'pointer',
                      }}
                    ></label>
                  </Button>
                  <Button
                    isDisabled={!button.imageUrl}
                    flexGrow="1"
                    onClick={onCropModalOpen}
                  >
                    裁切圖片
                  </Button>
                </Flex>
                <Input
                  data-index={index}
                  name="imageAlt"
                  onChange={handleModalStateChange}
                  value={button.imageAlt}
                  placeholder="(選填） 照片描述，有助於 SEO"
                />
              </Box>
            </>
          ) : (
            <>
              <Heading as="h5" fontSize="lg" mr={4}>
                選擇 Icon
              </Heading>
              <Popover isLazy>
                {({ isOpen, onClose }) => (
                  <>
                    <PopoverTrigger>
                      <IconButton icon={<Icon as={MdOutlineEmojiEmotions} />} />
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
                              data-index={index}
                              value={icon.name}
                              onClick={(e) => {
                                handleModalStateChange(e);
                                onClose();
                              }}
                              icon={<Icon as={iconMap[icon.name]} />}
                            />
                          );
                        })}
                      </PopoverBody>
                    </PopoverContent>
                  </>
                )}
              </Popover>
            </>
          )}
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
}
