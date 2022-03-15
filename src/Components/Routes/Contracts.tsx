import { useState, useEffect } from "react";
import { Container, Divider } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";
import { QuorumConfig, QuorumNode } from "../Types/QuorumConfig";

interface IProps {
  config: QuorumConfig;
}

export default function Contracts ({ config }: IProps ) {

  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);

  const handleSelectNode = (e: any) => {
    console.log(e);
    setSelectedNode(e.target.value);
    //nodeInfoHandler(e);
  };

  return (
    <>
      <Container maxW={{ base: "container.sm", md: "container.xl" }}>
        <PageHeader
          title="Contracts"
          config={config}
          selectNodeHandler={handleSelectNode}
        />
      </Container>
    </>
  );
}
