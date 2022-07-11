import { useState, useRef, useEffect } from "react";
import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  useCollectionData,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  collection,
  doc,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import Sidebar from "../../components/Sidebar";
import getOtherEmail from "../../utils/getOtherEmail";

const Topbar = ({ email }) => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p="5">
      <Avatar src="" marginEnd="3" />
      <Heading size="md">{email}</Heading>
    </Flex>
  );
};

const BottomBar = ({ id, user }) => {
  const [input, setInput] = useState();

  const sendMessage = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, `chats/${id}/messages`), {
      text: input,
      sender: user.email,
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <FormControl p="3" boxShadow="3xl" onSubmit={sendMessage} as="form">
      <Input
        focusBorderColor="purple.400"
        _placeholder={{ opacity: 0.4, color: "gray.500" }}
        placeholder="type a message..."
        autoComplete="off"
        onChange={(e) => setInput(e.target.value)}
        value={input}
      />
      <Button type="submit" hidden onClick={sendMessage}>
        Submit
      </Button>
    </FormControl>
  );
};

export default function Chat() {
  const [user] = useAuthState(auth);

  const router = useRouter();
  const { id } = router.query;

  const bottomOfChat = useRef();

  const [chat] = useDocumentData(doc(db, "chats", id));

  const messagesQuery = query(
    collection(db, "chats", id, "messages"),
    orderBy("timestamp")
  );
  const [messages] = useCollectionData(messagesQuery);

  const getMessages = () =>
    messages?.map((message) => {
      const sender = message.sender === user.email;

      return (
        <Flex
          key={Math.random()}
          bg={sender ? "purple.100" : "green.100"}
          w="fit-content"
          minW="100px"
          borderRadius="3xl"
          p="3"
          mx="5"
          my="1"
          alignSelf={sender ? "flex-start" : "flex-end"}
        >
          <Text>{message.text}</Text>
        </Flex>
      );
    });

  useEffect(() => {
    const current = bottomOfChat?.current

    return () => setTimeout(
      current.scrollIntoView({
      behavior: "smooth",
      block: 'start',
    }), 100)
  }, [messages])

  return (
    <Flex h="100vh">
      <Head>
        <title>Chat App</title>
      </Head>

      <Sidebar />

      <Flex flex="1" direction="column">
        <Topbar email={getOtherEmail(chat?.users, user)} />

        <Flex
          flex="1"
          direction="column"
          pt="4"
          overflowX="scroll"
          style={{
            backgroundImage:
              'url("https://www.toptal.com/designers/subtlepatterns/uploads/email-pattern.png")',
          }}
          sx={{
            "::-webkit-scrollbar": {
              display: "none",
            },
          }}
        >
          {getMessages()}
          <div ref={bottomOfChat}></div>
        </Flex>

        <BottomBar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
