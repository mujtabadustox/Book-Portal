import React from "react";

import { Flex, Heading } from "@chakra-ui/react";

const Navbar = () => {
  return (
    <Flex as="nav" p="10px" alignItems="center" bg="red.200">
      <Heading as="h1">Book Portal</Heading>
    </Flex>
  );
};

export default Navbar;
