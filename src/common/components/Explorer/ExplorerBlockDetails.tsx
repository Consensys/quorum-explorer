import {
  Button,
  Text,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faExpand } from "@fortawesome/free-solid-svg-icons";
import { QuorumBlock } from "../../types/Explorer";

interface IProps {
  block: QuorumBlock;
  setIsPaused: any;
}

export default function ExplorerBlockDetails({ block, setIsPaused }: IProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const openModal = () => {
    setIsPaused(true);
    onOpen();
  };
  const closeModal = () => {
    setIsPaused(false);
    onClose();
  };
  return (
    <>
      <Button p={0} m={0} onClick={openModal}>
        <FontAwesomeIcon icon={faExpand as IconProp} />
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={closeModal}
        size="2xl"
        closeOnOverlayClick={true}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Block Information</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text fontSize="xs" isTruncated textAlign="left">
              Block: {parseInt(block.number, 16)}
            </Text>{" "}
            <Text fontSize="xs" isTruncated textAlign="left">
              Miner: {block.miner}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Hash: {block.hash}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Transactions: {block.transactions.length}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Uncles: {block.uncles.length}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Size: {parseInt(block.size, 16)}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Gas Used: {parseInt(block.gasUsed, 16)}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Timestamp: {new Date(parseInt(block.timestamp, 16)).toString()}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              State Root: {block.stateRoot}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Receipt Root: {block.receiptsRoot}
            </Text>
            <Text fontSize="xs" isTruncated textAlign="left">
              Tx Root: {block.transactionsRoot}
            </Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={closeModal}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
