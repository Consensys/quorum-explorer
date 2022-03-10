import React, { Component } from 'react';
import { Table, Thead, Tbody, Th, Tr, Td, Text, } from "@chakra-ui/react";

interface IProps {
  client: string;
  nodeId: string;
  nodeName: string;
  enode: string;
  rpcUrl: string;
  ip: string;
}

interface IState {
}

class NodeDetails extends Component<IProps, IState> {

  constructor(props: IProps){
    super(props);
  }

  render(){
    return (
        <Table variant='simple' size='sm'>
        <Tbody>
            <Tr>
            <Td>Client</Td>
            <Td className="text-truncate cCapitalize">{this.props.client}</Td>
            </Tr>
            <Tr>
            <Td>Node ID</Td>
            <Td className="text-truncate cCapitalize">{this.props.nodeId}</Td>
            </Tr>
            <Tr>
            <Td>Node Name</Td>
            <Td className="text-truncate cCapitalize">{this.props.nodeName}</Td>
            </Tr>
            <Tr>
            <Td>Enode</Td>
            <Td><Text isTruncated>{this.props.enode}</Text></Td>
            </Tr>
            <Tr>
            <Td>RPC Url</Td>
            <Td className="text-truncate cCapitalize">{this.props.rpcUrl}</Td>
            </Tr>
            <Tr>
            <Td>IP</Td>
            <Td className="text-truncate cCapitalize">{this.props.ip}</Td>
            </Tr>
        </Tbody>
        </Table>


    );
  }

}

export default NodeDetails;


