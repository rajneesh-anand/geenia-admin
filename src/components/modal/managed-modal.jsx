import Modal from "@components/modal/modal";
import dynamic from "next/dynamic";
import { useModalAction, useModalState } from "@components/modal/modal.context";
const MessageForm = dynamic(() => import("@components/form/message-form"));

const ManagedModal = () => {
  const { isOpen, view, data } = useModalState();
  const { closeModal } = useModalAction();

  return (
    <Modal open={isOpen} onClose={closeModal}>
      {view === "MESSAGE_VIEW" && <MessageForm mobile={data} />}
    </Modal>
  );
};

export default ManagedModal;
