import { useRef, useEffect } from "react";
import {
  Flex,
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
} from "firebase/firestore";
import { db, auth } from "../../firebase.config";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import Bottombar from "../../components/Bottombar";
import getOtherEmail from "../../utils/getOtherEmail";


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

        <Bottombar id={id} user={user} />
      </Flex>
    </Flex>
  );
}
