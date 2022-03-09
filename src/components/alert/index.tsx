import {
  Alert,
  AlertIcon,
  AlertDescription,
  Container,
} from "@chakra-ui/react";

interface alertProps {
  selectedNode: string,
  rpcUrl: string,
  showPending: boolean
}

export default function AlertBanner(props: alertProps) {
  const { selectedNode, rpcUrl, showPending } = props;
  return (
    <>
      <Container mt={7}>
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
      </Container>
    </>
  );
}