import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Heading,
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
  Text,
  Tooltip,
  VStack,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';
import { CopyIcon, ExternalLinkIcon } from '@chakra-ui/icons';

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
      <Text alignSelf="flex-start" ml="0.75rem">
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
          <Box
            bgColor="white"
            borderColor="gray.100"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="1.5rem"
            boxShadow="rgba(50, 50, 0, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
            p="2rem 1rem"
          >
            文字按鈕
          </Box>
        </Tooltip>
        <Tooltip
          hasArrow
          label="2:1 橫式看板，具備輪播功能"
          placement="top"
          borderRadius="1.5rem"
          p="1rem 2rem"
        >
          <Box
            bgColor="white"
            borderColor="gray.100"
            borderWidth="1px"
            borderStyle="solid"
            borderRadius="1.5rem"
            boxShadow="rgba(50, 50, 0, 0.05) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px"
            p="2rem 1rem"
          >
            橫幅看板
          </Box>
        </Tooltip>
      </SimpleGrid>
    </VStack>
  );
}

export default function Admin() {
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
            fontSize="4xl"
            fontWeight="bold"
            textDecoration="none !important"
            letterSpacing="0.05em"
          >
            Linkspace
          </Link>
          <Menu isLazy>
            <MenuButton>
              <Image
                my="0.75rem"
                boxSize="60px"
                borderRadius="0.75rem"
                src="https://bit.ly/dan-abramov"
                alt="Dan Abramov"
              />
            </MenuButton>
            <MenuList p="1rem">
              <Text fontWeight="bold">Dan Abramov</Text>
              <Text fontSize="sm" mb="0.75rem">
                abramov@gmail.com
              </Text>
              <Divider />
              <MenuItem borderRadius="0.75rem" mt="0.75rem">
                登出
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
        <Container maxW="lg" mt="10rem">
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
                  value="https://linkspace.com/arbramov"
                />
                <Tooltip label="複製網址" borderRadius="1.5rem">
                  <IconButton
                    aria-label="Copy website URL"
                    colorScheme="teal"
                    variant="outline"
                    icon={<CopyIcon />}
                    _hover={{
                      background: 'white',
                    }}
                  />
                </Tooltip>
                <Tooltip label="開啟頁面" borderRadius="1.5rem">
                  <IconButton
                    aria-label="Go to the website"
                    colorScheme="teal"
                    icon={<ExternalLinkIcon />}
                    ml="0.5rem"
                  />
                </Tooltip>
              </InputGroup>
              <VStack
                position="relative"
                spacing="1rem"
                px="3rem"
                pt="3rem"
              >
                <Tooltip label="分享" borderRadius="1.5rem">
                  <IconButton
                    position="absolute"
                    left="2rem"
                    top="1rem"
                    bgColor="transparent"
                    icon={
                      <span className="material-symbols-outlined">
                        ios_share
                      </span>
                    }
                  />
                </Tooltip>

                <Avatar size="2xl" src="https://bit.ly/dan-abramov" />

                <Box textAlign="center">
                  <Heading as="h1" size="md" mb="0.5rem">
                    Dan Abramov
                  </Heading>
                  <Text whiteSpace="pre-wrap">
                    Working on @reactjs. Co-author of Redux and Create React
                    App. Building tools for humans.
                  </Text>
                </Box>

                <Wrap spacing={4}>
                  <WrapItem>
                    <Tooltip label="官方網站" borderRadius="1.5rem">
                      <IconButton
                        colorScheme="gray"
                        bgColor="transparent"
                        _hover={{
                          transform: 'scale(1.2)',
                        }}
                        icon={
                          <span
                            style={{
                              fontSize: '32px',
                            }}
                            className="material-symbols-outlined"
                          >
                            language
                          </span>
                        }
                      />
                    </Tooltip>
                  </WrapItem>
                </Wrap>

                <Button
                  aria-label="Edit the profile"
                  colorScheme="teal"
                  variant="outline"
                  border="0"
                  rightIcon={
                    <span
                      style={{
                        fontSize: '20px',
                      }}
                      className="material-symbols-outlined"
                    >
                      edit
                    </span>
                  }
                >
                  編輯個人檔案
                </Button>
              </VStack>
            </VStack>
          </Flex>
        </Container>
      </Box>
    </>
  );
}
