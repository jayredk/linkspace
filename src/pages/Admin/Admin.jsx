import {
  Box,
  Container,
  Divider,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  SimpleGrid,
  Text,
  Tooltip,
  VStack,
} from '@chakra-ui/react';

function DraggableItemPanel() {
  return (
    <VStack
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
      <Container mt="10rem">
        <Flex justifyContent="space-between">
          <DraggableItemPanel />
          <VStack>
            <Box>123</Box>
          </VStack>
        </Flex>
      </Container>
    </>
  );
}
