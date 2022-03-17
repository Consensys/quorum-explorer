import { useState } from "react";
import { Container } from "@chakra-ui/react";
import PageHeader from "../Misc/PageHeader";

export default function Contracts({ config }) {
  const [selectedNode, setSelectedNode] = useState(config.nodes[0].name);

  const handleSelectNode = (e) => {
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
