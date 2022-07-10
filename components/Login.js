import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Stack,
  Heading,
  Text,
  Flex,
  useColorModeValue,
} from "@chakra-ui/react";
import Head from "next/head";

const Login = () => {
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>

      <Flex
        minH={"100vh"}
        align={"center"}
        justify={"center"}
        style={{
          backgroundImage:
            'url("https://www.toptal.com/designers/subtlepatterns/uploads/spikes.png")',
        }}
      >
        <Center h="100vh">
          <Stack
            align="center"
            bg={useColorModeValue("white", "gray.700")}
            p="16"
            rounded="3xl"
            spacing="12"
            boxShadow="lg"
          >
            <Box
              bgColor="purple.500"
              w="fit-content"
              p={5}
              rounded="3xl"
              boxShadow="md"
            >
              <ChatIcon width="100px" h="100px" color="white"></ChatIcon>
            </Box>
            <Button
              colorScheme="purple"
              variant="outline"
              boxShadow="md"
              rounded="xl"
            >
              Sign in with Google
            </Button>
          </Stack>
        </Center>
      </Flex>
    </>
  );
};

export default Login;
