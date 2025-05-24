import { useForm } from "react-hook-form";
import { TodoItem } from "../App.tsx";
import {
  Heading,
  Box,
  Button,
  Input,
  Field
} from "@chakra-ui/react";

interface ItemModalProps {
  editList?: TodoItem;
  isEdit: boolean;
  onEditList: (title: string, description: string, id: number) => void;
  onAddList: (title: string, description: string) => void;
}
interface FormValues {
  Title: string;
  Description: string;
}

const ItemForm = ({
  editList,
  isEdit,
  onEditList,
  onAddList,
}: ItemModalProps) => {
  const listTitle: string = isEdit && editList ? editList.title : "";
  const listDescription: string =
    isEdit && editList ? (editList.description ?? "") : "";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      Title: listTitle,
      Description: listDescription,
    },
  });
  const onSubmit = (data: FormValues) => {
    if (isEdit && editList) {
      onEditList(data.Title, data.Description, editList.id);
    } else {
      onAddList(data.Title, data.Description);
    }
  };

  return (
    <Box>
      <Heading
        marginTop="16px"
        size="3xl"
        textAlign="Center"
        >
        {isEdit ? "リスト編集" : "リスト追加"}
      </Heading>
      <Box
        max-width="500px"
        box-shadow="0 4px 8px rgba(0, 0, 0, 0.1)"
        >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Field.Root
            width="100%"
            invalid>
            <Field.Label>タイトル</Field.Label>
            <Input
              {...register("Title")}
              width="100%"
              />
            <Field.ErrorText>タイトルは必須です</Field.ErrorText>
          </Field.Root>
          <Field.Root invalid={false}>
            <Field.Label>詳細</Field.Label>
            <Input
              {...register("Description")}
              width="100%"
              />
          </Field.Root>
          <Button
            marginTop="16px"
            width="100%"
            padding="12px"
            bg="#3498db"
            color="#ffffff"
            border="none"
            borderRadius="4px"
            fontSize="1rem"
            cursor="pointer"
          _hover={{
            backgroundColor: "#2980b9",
          }}
          _active={{
            backgroundColor: "#1f6d98",
          }}
          type="submit">
            OK
          </Button>
        </form>
      </Box>
    </Box>
  );
};
export default ItemForm;
