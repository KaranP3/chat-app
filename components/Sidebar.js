import {
  Avatar,
  AvatarBadge,
  Flex,
  IconButton,
  Text,
  Button,
  Center,
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FiLogOut } from "react-icons/fi";
import { signOut } from "firebase/auth";
import { auth } from "../firebase.config";
import { db } from "../firebase.config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, addDoc } from "firebase/firestore";
import getOtherEmail from "../utils/getOtherEmail";

const Sidebar = () => {
  const [user] = useAuthState(auth);
  const [snapshot, loading, error] = useCollection(collection(db, "chats"));
  const router = useRouter();

  const redirect = (id) => router.push(`/chat/${id}`);

  const chatExists = (email) =>
    chats?.find(
      (chat) => chat.users.includes(user.email) && chat.users.includes(email)
    );

  const newChat = async () => {
    const input = prompt("enter email of chat recipient");
    if (!input) return;

    if (!chatExists && input !== user.email) {
      await addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    }
  };

  const chats = snapshot?.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const chatList = () => {
    if (loading) {
      return (
        <Center h="100vh">
          <Spinner size="xl" />
        </Center>
      );
    }

    return chats
      ?.filter((chat) => chat.users.includes(user.email))
      .map((chat) => (
        <Flex
          key={chat.id}
          _hover={{ bg: "gray.100", cursor: "pointer" }}
          align="center"
          p="3"
          onClick={() => redirect(chat.id)}
        >
          <Avatar src="" marginEnd="3" />
          <Text>{getOtherEmail(chat.users, user)}</Text>
        </Flex>
      ));
  };

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
            <AvatarBadge boxSize="1.25em" bg="green.500" />
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
        onClick={() => newChat()}
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
        {chatList()}
      </Flex>
    </Flex>
  );
};

export default Sidebar;
