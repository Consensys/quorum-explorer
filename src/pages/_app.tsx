import type { AppProps } from "next/app";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";
import NavBar from "../common/components/NavBar/NavBar";
import Footer from "../common/components/Footer/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  const breakpoints = createBreakpoints({
    sm: "320px",
    md: "850px",
    lg: "960px",
    xl: "1200px",
    "2xl": "1536px",
  });
  const theme = extendTheme({ breakpoints });

  return (
    <ChakraProvider theme={theme}>
      <Box pos="relative" minH="100vh">
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default MyApp;
