import React, { Component } from "react";
import {
  Text,
  Skeleton,
  Container,
  Flex,
  Box,
  Divider,
} from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionContainer = motion(Container);

interface IProps {
  client: string;
  nodeId: string;
  nodeName: string;
  enode: string;
  rpcUrl: string;
  ip: string;
  statusText?: string;
}

interface IState {}

class NodeDetails extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  render() {
    return (
      <>
        <MotionContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          maxW={{ base: "container.sm", md: "container.lg" }}
        >
          <Flex flexDirection="column" borderRadius="lg" borderWidth={2}>
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Client:</Text>
                {this.props.statusText === "OK" ? (
                  <Text>{this.props.client}</Text>
                ) : (
                  <>
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Node ID:</Text>
                {this.props.statusText === "OK" ? (
                  <Text>{this.props.nodeId}</Text>
                ) : (
                  <>
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Node Name:</Text>
                {this.props.statusText === "OK" ? (
                  <Text>{this.props.nodeName}</Text>
                ) : (
                  <>
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>Enode:</Text>
                {this.props.statusText === "OK" ? (
                  <Text textAlign="right" maxW="60%">
                    {this.props.enode}
                  </Text>
                ) : (
                  <>
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>RPC Url:</Text>
                {this.props.statusText === "OK" ? (
                  <Text>{this.props.rpcUrl}</Text>
                ) : (
                  <>
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
            <Divider />
            <Box m={5}>
              <Flex
                flexDirection="row"
                justifyContent="space-between"
                flexWrap="wrap"
              >
                <Text>IP Address:</Text>
                {this.props.statusText === "OK" ? (
                  <Text>{this.props.ip}</Text>
                ) : (
                  <>
                    <Skeleton w="50%" h="20px" />
                  </>
                )}
              </Flex>
            </Box>
          </Flex>
        </MotionContainer>
      </>
    );
  }
}

export default NodeDetails;

// <MotionTable
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ duration: 1 }}
//   variant="simple"
//   size="sm"
// >
//   <Tbody>
//     <Tr>
//       <Td>Client</Td>
//       <Td className="text-truncate cCapitalize">{this.props.client}</Td>
//     </Tr>
//     <Tr>
//       <Td>Node ID</Td>
//       <Td className="text-truncate">{this.props.nodeId}</Td>
//     </Tr>
//     <Tr>
//       <Td>Node Name</Td>
//       <Td className="text-truncate cCapitalize">{this.props.nodeName}</Td>
//     </Tr>
//     <Tr>
//       <Td>Enode</Td>
//       <Td>
//         <Text isTruncated>{this.props.enode}</Text>
//       </Td>
//     </Tr>
//     <Tr>
//       <Td>RPC Url</Td>
//       <Td className="text-truncate">{this.props.rpcUrl}</Td>
//     </Tr>
//     <Tr>
//       <Td>IP</Td>
//       <Td className="text-truncate cCapitalize">{this.props.ip}</Td>
//     </Tr>
//   </Tbody>
// </MotionTable>
