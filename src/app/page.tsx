'use client';
import AnimatedRoomMap from "./CaramelRoom/AnimatedRoomMap";
import DoorButton from "./CaramelRoom/DoorButton";
import { Modal, ModalContent, useDisclosure } from "@nextui-org/modal";
import Paper from "./assets/paper-design/PaperBehind.png";
import PaperBackground from "./PaperPage/PaperBackground";


export default function Home() { 
  const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <DoorButton onClick={onOpen} />
        <Modal placement="top" isOpen={isOpen} onOpenChange={onOpenChange} size='md' classNames={{
          base: "outline-white/100",
          backdrop: "blur backdrop-opacity-50",
        }}>
        <ModalContent className="shadow-none relative outline outline-1 outline-transparent outline-offset-2 bg-outline_purple/0 items-center rounded-lg max-w-fit">
          <AnimatedRoomMap/>
        </ModalContent>
      </Modal>
      </div>
    </main>
  );
}
