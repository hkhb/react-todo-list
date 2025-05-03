import React from "react";
import { format } from "date-fns";
import "./list.css";
import { TodoItem } from "../App.tsx";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Badge,
  Icon,
  // useColorModeValue,
} from "@chakra-ui/react";
// import { CheckCircleIcon, WarningIcon } from "@chakra-ui/icons";


interface TodoItemWithClick extends TodoItem {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

  const ListNew : React.FC<TodoItemWithClick> = ({completed, title, description, createdAt, updatedAt, onClickEdit, onClickDelete}) => {
    const displayDate = format(updatedAt ? updatedAt : createdAt, 'yyyy-MM-dd HH:mm');

    // const bgColor = useColorModeValue("gray.100", "gray.700");

  return (
    <Box
      bg={"gray.100"}
      p={5}
      borderRadius="xl"
      boxShadow="md"
      mb={4}
      _hover={{ boxShadow: "lg", cursor: "pointer" }}
    >
      <Flex justify="space-between" align="center" mb={2}>
        <Heading
          size="md"
          onClick={onClickEdit}
          _hover={{ textDecoration: "underline" }}
        >
          {title}
        </Heading>

        <Button colorScheme="red" size="sm" onClick={onClickDelete}>
          削除
        </Button>
      </Flex>

      <Text mb={2} onClick={onClickEdit}>
        {description}
      </Text>

      <Flex justify="space-between" align="center">
        <Badge
          colorScheme={completed ? "green" : "orange"}
          px={2}
          py={1}
          borderRadius="full"
          fontSize="0.8em"
        >
          {completed ? (
            <Flex align="center" gap={1}>
              {/* <CheckCircleIcon /> */}
              完了
            </Flex>
          ) : (
            <Flex align="center" gap={1}>
              {/* <WarningIcon /> */}
              未完了
            </Flex>
          )}
        </Badge>

        <Text fontSize="sm" color="gray.500">
          {displayDate}
        </Text>
      </Flex>
    </Box>
  );
};

export default ListNew;
