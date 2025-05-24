import { ReactNode } from "react";
import {
  Box,
  Button,
} from "@chakra-ui/react";
interface modalProps {
  showFlag: boolean;
  onCancel: () => void;
  children?: ReactNode;
}

function Modal({ showFlag, onCancel, children }: modalProps) {
  return showFlag ? (
    <Box
      position="fixed"
      top="0"
      left="0"
      width="100%"
      height="100%"
      bg="#000000"
      display="flex"
      alignItems="center"
      justifyContent="center"
      zIndex="1000"
      >
      <Box
        background="#ffffff"
        padding="20px"
        borderRadius="3px"
        color="#000000"
        >
        <Box
          display="flex"
          justifyContent="flex-end"
          >
          <Button
            onClick={onCancel}
            >
            cancel
          </Button>
          </Box>
        {children}
      </Box>
    </Box>
  ) : null;
}
export default Modal;
