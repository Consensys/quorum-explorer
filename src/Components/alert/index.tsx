import {
  Alert,
  AlertIcon,
  AlertDescription,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

interface alertProps {
  selectedNode: string;
  rpcUrl: string;
  showPending: boolean;
}

const MotionContainer = motion(Container);

export default function AlertBanner(props: alertProps) {
  const { selectedNode, rpcUrl, showPending } = props;
  return (
    <>
      <MotionContainer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        mt={7}
      >
        {showPending ? (
          <Alert
            status="error"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon />
            <AlertDescription>
              Cannot connect to {selectedNode} at {rpcUrl}!
            </AlertDescription>
          </Alert>
        ) : (
          <Alert
            status="success"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon />
            <AlertDescription>
              Connected to {selectedNode} at {rpcUrl}!
            </AlertDescription>
          </Alert>
        )}
      </MotionContainer>
    </>
  );
}
