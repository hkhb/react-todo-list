import { format } from "date-fns";
import { TodoItem } from "../App.tsx";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Badge,
} from "@chakra-ui/react";

interface TodoItemWithClick extends TodoItem {
  onClickEdit: () => void;
  onClickDelete: () => void;
}

const List: React.FC<TodoItemWithClick> = ({
  completed,
  title,
  description,
  createdAt,
  updatedAt,
  onClickEdit,
  onClickDelete,
}) => {
  const displayDate = format(
    updatedAt ? updatedAt : createdAt,
    "yyyy-MM-dd HH:mm",
  );

  return (
    <Box
      bg={completed ? "green.50" : "orange.50"}
      p={5}
      borderRadius="xl"
      boxShadow="md"
      mb={4}
      transition="transform 0.2s"
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "lg",
      }}
    >
      <Flex justify="space-between" align="center" mb={2} _hover={{ cursor: "pointer" }}>
        <Heading
          size="2xl"
          onClick={onClickEdit}
          _hover={{ textDecoration: "underline" }}
        >
          {title}
        </Heading>

        <Badge
          colorScheme={completed ? "green" : "orange"}
          px={3}
          py={1}
          borderRadius="full"
          fontSize="0.9em"
          display="flex"
          alignItems="center"
          gap={1}
        >
          {completed ? "✔️ 完了" : "⚠️ 未完了"}
        </Badge>

        <Button colorScheme="red" size="sm" onClick={onClickDelete} _hover={{ bg: "red.600" }}>
          削除
        </Button>
      </Flex>

      <Text mb={2} onClick={onClickEdit}>
        {description}
      </Text>

      <Flex justify="flex-end" align="center">

        <Text fontSize="sm" color="gray.500">
          {displayDate}
        </Text>
      </Flex>
    </Box>
  );
};

export default List;
