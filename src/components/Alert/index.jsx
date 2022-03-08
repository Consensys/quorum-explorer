import {
  Alert,
  AlertIcon,
  AlertDescription,
  Container,
} from "@chakra-ui/react";

import * as React from "react";

export default function AlertBanner(props) {
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
