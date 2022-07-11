import { Avatar, Flex, Heading } from "@chakra-ui/react";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p="5">
      <Avatar src="" marginEnd="3" />
      <Heading size="md">{email}</Heading>
    </Flex>
  );
};

export default Topbar;