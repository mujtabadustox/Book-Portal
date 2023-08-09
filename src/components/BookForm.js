import React, { useState } from "react";
import {
  Button,
  Heading,
  Box,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
} from "@chakra-ui/react";
import bookService from "../services/book";

const BookForm = ({ data, setData }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [pages, setPages] = useState(0);
  const [publishedAt, setPublishedAt] = useState(null);

  const handleTitle = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthor = (event) => {
    setAuthor(event.target.value);
  };

  const handlePages = (event) => {
    setPages(event.target.value);
  };

  const handlePublishedAt = (event) => {
    setPublishedAt(event.target.value);
  };

  const addBook = async (event) => {
    event.preventDefault();

    try {
      const bookObject = {
        title: title,
        author: author,
        pages: pages,
        publishedAt: publishedAt,
      };

      const result = await bookService.create(bookObject);

      setData(data.concat(bookObject));

      setTitle("");
      setAuthor("");
      setPages(0);
      setPublishedAt("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box maxWidth="480px">
        <Heading as="h2" mb="30px">
          Add a Book
        </Heading>
        <Box
          display={{ base: "flex" }}
          mt={{ base: "40px" }}
          alignItems={{ base: "center" }}
        >
          <form onSubmit={addBook}>
            <VStack>
              <FormControl mb="20px">
                <HStack>
                  <FormLabel>Book Title</FormLabel>
                  <Input
                    name="title"
                    type="text"
                    value={title}
                    onChange={handleTitle}
                    placeholder="Myth of Sisyphus"
                  />
                </HStack>
              </FormControl>
              <FormControl mb="20px">
                <HStack>
                  <FormLabel>Author Name</FormLabel>
                  <Input
                    name="author"
                    type="text"
                    value={author}
                    onChange={handleAuthor}
                    placeholder="Eg: Mujtaba Ali"
                  />
                </HStack>
              </FormControl>
              <FormControl mb="20px">
                <HStack>
                  <FormLabel>Number of Pages</FormLabel>
                  <Input
                    name="pages"
                    type="number"
                    value={pages}
                    onChange={handlePages}
                    placeholder="153"
                  />
                </HStack>
              </FormControl>

              <FormControl mb="20px">
                <HStack>
                  <FormLabel>Published Date</FormLabel>
                  <Input
                    name="number"
                    type="date"
                    value={publishedAt}
                    onChange={handlePublishedAt}
                    placeholder="Select a Date"
                  />
                </HStack>
              </FormControl>
            </VStack>
            <Box>
              <Button type="submit" colorScheme="yellow">
                Add
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </>
  );
};

export default BookForm;
