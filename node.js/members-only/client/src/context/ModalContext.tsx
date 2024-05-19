import React, {
  createContext,
  useState,
  ReactNode,
  useContext,
} from "react";

export type ModalContextType = {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  isNewMessageModalOpen:boolean;
  
  setIsNewMessageModalOpen: (isOpen: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);
export function useModalContext():ModalContextType{return useContext(ModalContext);} 

export default function ModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isNewMessageModalOpen, setIsNewMessageModalOpen] = useState(false);

  const value: ModalContextType = {
    isLoginModalOpen,
    setIsLoginModalOpen,
    isNewMessageModalOpen,
    setIsNewMessageModalOpen
  };

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}
