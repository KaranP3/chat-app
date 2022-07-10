import { Avatar, Flex, IconButton, Text, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";

const Chat = () => {
  return (
    <Flex _hover={{ bg: "gray.100", cursor: "pointer" }} align="center" p="3">
      <Avatar src="" marginEnd="3" />
      <Text>exampleuser@gmail.com</Text>
    </Flex>
  );
};

const Sidebar = () => {
  return (
    <Flex
      w="300px"
      h="100vh"
      boxShadow="md"
      rounded="md"
      borderEnd="1px solid"
      borderColor="gray.200"
      direction="column"
    >
      <Flex
        h="81px"
        w="100%"
        align="center"
        justifyContent="space-between"
        borderBottom="1px solid"
        borderColor="gray.200"
        p="3"
      >
        <Flex align="center">
          <Avatar src="" marginEnd="3" />
          <Text>Karan Pillai</Text>
        </Flex>

        <IconButton
          variant="outline"
          boxShadow="md"
          size="md"
          isRound
          icon={<FiLogOut />}
        ></IconButton>
      </Flex>

      <Button
        colorScheme="purple"
        variant="outline"
        boxShadow="md"
        rounded="xl"
        m="5"
        p="4"
      >
        New chat
      </Button>

      <Flex
        overflowX="scroll"
        direction="column"
        sx={{
          "::-webkit-scrollbar": {
            display: "none",
          },
        }}
      >
        <Chat />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
