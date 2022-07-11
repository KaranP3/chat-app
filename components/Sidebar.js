import { Avatar, AvatarBadge, Flex, IconButton, Text, Button } from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";

const Chat = () => {
  return (
    <Flex _hover={{ bg: "gray.100", cursor: "pointer" }} align="center" p="3">
      <Avatar src="" marginEnd="3" />
      <Text>exampleuser@gmail.com</Text>
    </Flex>
  );
};

const Sidebar = () => {
  const [user] = useAuthState(auth);

  console.log(user);

  return (
    <Flex
      w="300px"
      h="100vh"
      rounded="md"
      borderEnd="1px solid"
      borderColor="gray.100"
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
          <Avatar name={user.displayName} src={user.photoURL} marginEnd="3">
            <AvatarBadge boxSize='1.25em' bg='green.500' />
          </Avatar>
          <Text>{user.displayName}</Text>
        </Flex>

        <IconButton
          variant="outline"
          size="md"
          isRound
          icon={<FiLogOut />}
          onClick={() => signOut(auth)}
        />
      </Flex>

      <Button
        colorScheme="purple"
        variant="outline"
        boxShadow="md"
        rounded="3xl"
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
        flex="1"
      >
        <Chat />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
