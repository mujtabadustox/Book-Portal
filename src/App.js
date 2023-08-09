import { Box, Center, SimpleGrid, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import bookService from "./services/book";
import Books from "./components/Books";
import BookForm from "./components/BookForm";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await bookService.getAll();
        setData(result.data);
      } catch (error) {
        console.error("Error Fetching");
      }
    };

    getData();
  }, []);

  return (
    <>
      <Box h="100vh">
        <Navbar />
        <SimpleGrid
          columns={2}
          minChildWidth={{ base: "100%", lg: "400px" }}
          bg="red.200"
        >
          <Stack direction={{ base: "column", lg: "column" }} spacing={10}>
            <Center>
              <Box w={{ base: "100%", lg: "800px" }} bg="orange.200" p="20px">
                <BookForm data={data} setData={setData} />
              </Box>
            </Center>

            <Center>
              <Box w={{ base: "100%", lg: "800px" }} bg="purple.200" p="20px">
                <Books data={data} setData={setData} />
              </Box>
            </Center>
          </Stack>

          {/* {errorMessage && <Notification error={errorMessage} />} */}
        </SimpleGrid>
      </Box>
    </>
  );
};

export default App;
