'use client';
import { Button } from "@nextui-org/button";
import AnimatedRoomMap from "./CaramelRoom/AnimatedRoomMap";
import DoorButton from "./CaramelRoom/DoorButton";
import { Modal, ModalContent, ModalFooter, useDisclosure } from "@nextui-org/modal";


export default function Home() { 
  const {isOpen, onOpen, onOpenChange} = useDisclosure(); 


  const onClick = () => {
    console.log('Button clicked!');
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>
        <DoorButton onClick={onOpen}/>
        <Modal placement="top-center" isOpen={isOpen} onOpenChange={onOpenChange} size='md' classNames={{
          base: "outline-white/100",
          backdrop: "blur bg-transparent"
        }}>
        <ModalContent className="relative outline outline-1 outline-white/100 outline-offset-2 bg-outline_purple items-center rounded-lg max-w-fit">
          <AnimatedRoomMap/>
        </ModalContent>
      </Modal>
      </div>
    </main>
  );
}
