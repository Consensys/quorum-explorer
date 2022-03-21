import { useState } from "react";
import { QuorumConfig } from "../Types/QuorumConfig";
import CodeEditor from "@uiw/react-textarea-code-editor";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  chakra,
  FormControl,
  FormLabel,
  Button,
  FormHelperText,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";

interface IProps {
  config: QuorumConfig;
}

const ChakraCodeArea = chakra(CodeEditor);

export default function ContractsIndex(props: IProps) {
  const lightMode = "gray.100";
  const darkMode = "gray.200";
  const codeTextArea = useColorModeValue(lightMode, darkMode);
  const toast = useToast();

  const [code, setCode] = useState(
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
  const [buttonLoading, setButtonLoading] = useState(false);

  const HandleClick = async (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setButtonLoading(true);
    toast({
      title: "Deployed Contract!",
      description: "The contract was successfully deployed @ address: ",
      status: "success",
      duration: 5000,
      position: "bottom",
      isClosable: true,
    });
    await new Promise((r) => setTimeout(r, 1000));
    console.log(code);
    setButtonLoading(false);
  };

  return (
    <>
      <Tabs mt={5} isFitted isLazy variant="enclosed">
        <TabList mb="1em">
          <Tab>Interact</Tab>
          <Tab>Deploy</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p>Interact with contracts here!</p>
          </TabPanel>
          <TabPanel>
            <FormControl as="form" onSubmit={HandleClick}>
              <FormLabel htmlFor="email">Solidity Contract Code</FormLabel>
              <ChakraCodeArea
                value={code}
                language="sol"
                placeholder="Please enter SOL code."
                onChange={(evn) => setCode(evn.target.value)}
                padding={15}
                borderRadius="lg"
                borderWidth={2}
                backgroundColor={codeTextArea}
                fontSize={16}
              />
              <FormHelperText>Click below to deploy!</FormHelperText>
              <Button
                isLoading={buttonLoading}
                loadingText="Deploying..."
                type="submit"
              >
                Deploy
              </Button>
            </FormControl>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}
