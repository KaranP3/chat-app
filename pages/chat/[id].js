import {
  Avatar,
  Button,
  Flex,
  FormControl,
  Heading,
  Input,
  Text,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import Head from "next/head";
import { useAuthState } from 'react-firebase-hooks/auth'

const Topbar = () => {
  return (
    <Flex bg="gray.100" h="81px" w="100%" align="center" p="5">
      <Avatar src="" marginEnd="3" />
      <Heading size="md">user@gmail.com</Heading>
    </Flex>
  );
};

const BottomBar = () => {
  return (
    <FormControl p="3" boxShadow="3xl">
      <Input
        focusBorderColor="purple.400"
        _placeholder={{ opacity: 0.4, color: "gray.500" }}
        placeholder="type a message..."
      />
      <Button type="submit" hidden autoComplete="off">
        Submit
      </Button>
    </FormControl>
  );
};

export default function Chat() {
  return (
    <Flex h="100vh">
      <Head>
        <title>Chat App</title>
      </Head>

      <Sidebar />

      <Flex flex="1" direction="column">
        <Topbar />

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
          <Flex
            bg="purple.100"
            w="fit-content"
            minW="100px"
            borderRadius="3xl"
            p="3"
            mx="5"
          >
            <Text>This is a dummy send</Text>
          </Flex>
          <Flex
            bg="green.100"
            w="fit-content"
            minW="100px"
            borderRadius="3xl"
            p="3"
            mx="5"
            alignSelf="flex-end"
          >
            <Text>This is a dummy receive</Text>
          </Flex>
        </Flex>

        <BottomBar />
      </Flex>
    </Flex>
  );
}
