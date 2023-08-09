import React, { useState } from "react";

import {
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Heading,
  Box,
  HStack,
  FormControl,
  FormLabel,
  Input,
  VStack,
  CloseButton,
} from "@chakra-ui/react";
import bookService from "../services/book";
import "./books.css";

const Books = ({ data, setData }) => {
  const [updateView, setUpdateView] = useState(false);
  const [openedBook, setOpenedBook] = useState(null);
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

  const deleteBook = async (id) => {
    try {
      await bookService.removeBook(id);
      setData(data.filter((book) => book._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpen = async (id) => {
    try {
      console.log("Aa", id);
      const bookData = await bookService.getById(id);
      console.log("AAAAAA", bookData);
      setOpenedBook(bookData.data);
      setTitle(openedBook.title);
      setAuthor(openedBook.author);
      setPages(openedBook.pages);
      setPublishedAt(openedBook.publishedAt);
      setUpdateView(true);
    } catch (error) {
      console.log(error.response);
    }
  };

  const updateBook = async (id) => {
    try {
      const bookObject = {
        title: title,
        author: author,
        pages: pages,
        publishedAt: publishedAt,
      };

      const result = await bookService.update(id, bookObject);

      setData(
        data.map((book) => (book._id !== id ? book : result.data)) //if id is the one then put newdata else old
      );

      setTitle("");
      setAuthor("");
      setPages(0);
      setPublishedAt("");
      setUpdateView(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Heading as="h2" mb="30px" mt="10px">
        Books
      </Heading>
      <TableContainer bg="white" border="1px solid" borderColor="gray.400">
        <Table size={{ base: "sm", lg: "md" }}>
          <Thead>
            <Tr>
              <Th>Title</Th>
              <Th>Author</Th>
              <Th>Pages</Th>
              <Th>Published At</Th>
              <Th>Update or Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data
              ? data?.map((book) => (
                  <Tr key={book.id}>
                    <Td>{book.title}</Td>
                    <Td>{book.author} </Td>
                    <Td>{book.pages} </Td>
                    <Td>{book.publishedAt} </Td>
                    <Td pl="30px">
                      <Button
                        ml="2px"
                        size={{ base: "sm", lg: "md" }}
                        // value={person.name}
                        onClick={() => handleOpen(book._id)}
                        colorScheme="green"
                      >
                        Update
                      </Button>
                      <Button
                        ml="2px"
                        size={{ base: "sm", lg: "md" }}
                        onClick={() => deleteBook(book._id)}
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              : "Loading"}
          </Tbody>
        </Table>
      </TableContainer>
      {updateView && (
        <div className="mini-box">
          <Box maxWidth="480px">
            <HStack gap="10px">
              <Heading as="h2">Update</Heading>
              <CloseButton
                ml="200px"
                onClick={() => setUpdateView(false)}
                size="md"
              />
            </HStack>
            <Box
              display={{ base: "flex" }}
              mt={{ base: "40px" }}
              alignItems={{ base: "center" }}
            >
              <VStack>
                <FormControl mb="20px">
                  <HStack>
                    <FormLabel>Book Title</FormLabel>
                    <Input
                      name="title"
                      type="text"
                      value={title}
                      onChange={handleTitle}
                      placeholder={openedBook.title}
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
                      placeholder={openedBook.author}
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
                      placeholder={openedBook.pages}
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
                      placeholder={openedBook.publishedAt}
                    />
                  </HStack>
                </FormControl>
                <Box>
                  <Button
                    onClick={() => updateBook(openedBook._id)}
                    colorScheme="blue"
                  >
                    Update
                  </Button>
                </Box>
              </VStack>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default Books;
