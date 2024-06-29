import {
  Box,
  Divider,
  Flex,
  Image,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
} from '@chakra-ui/react';

export default function Admin() {
  return (
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
  );
}
