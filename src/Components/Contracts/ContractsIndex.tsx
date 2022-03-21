import React from "react";
import { QuorumConfig } from "../Types/QuorumConfig";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  chakra,
} from "@chakra-ui/react";

interface IProps {
  config: QuorumConfig;
}

const ChakraCodeArea = chakra(CodeEditor);

export default function ContractsIndex(props: IProps) {
  const [code, setCode] = React.useState(
    `pragma solidity ^0.7.0;
contract SimpleStorage {
  uint public storedData;
  event stored(address _to, uint _amount);

  constructor(uint initVal) public {
    emit stored(msg.sender, initVal);
    storedData = initVal;
  }

  function set(uint x) public {
    emit stored(msg.sender, x);
    storedData = x;
  }

  function get() view public returns (uint retVal) {
    return storedData;
  }
}`
  );
  return (
    <>
      <Tabs isFitted isLazy variant="enclosed">
        <TabList mb="1em">
          <Tab>Interact</Tab>
          <Tab>Deploy</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Interact with contracts here!</p>
          </TabPanel>
          <TabPanel>
            <ChakraCodeArea
              value={code}
              language="sol"
              placeholder="Please enter SOL code."
              onChange={(evn) => setCode(evn.target.value)}
              padding={15}
              borderRadius="lg"
              borderWidth={2}
              backgroundColor="gray.200"
              fontSize={16}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
