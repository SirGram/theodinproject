import Nav from "../Nav";
import Footer from "../Footer";
import { ReactElement, useContext, ReactNode } from "react";
import { ModalContext, ModalContextType, useModalContext } from "../../context/ModalContext";
import LogInModal from "../modals/LogInModal";
import NewMessageModal from "../modals/NewMessageModal";
export function Layout({
  children,
}: {
  children: ReactNode;
}) {
  const { isLoginModalOpen, isNewMessageModalOpen } = useModalContext();
  return (
    <>
      <div className="flex flex-col relative h-full min-h-screen">
        <Nav />
        <main className="flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      {isLoginModalOpen && <LogInModal />}
      {isNewMessageModalOpen && <NewMessageModal />}
    </>
  );
}

export default Layout;
