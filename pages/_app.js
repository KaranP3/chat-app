import { ChakraProvider } from "@chakra-ui/react";
// import Sidebar from "../components/Sidebar";
// import Login from "../components/Login";

function MyApp({ Component, pageProps }) {
  // return <Component {...pageProps} />
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
