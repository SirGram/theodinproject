import Nav from "../Nav";
import Footer from "../Footer";
import { ReactElement, useContext } from "react";
import { ModalContext, ModalContextType } from "../../context/ModalContext";
import LogInModal from "../modals/LogInModal";
export function Layout({
  children,
}: {
  children: ReactElement[] | ReactElement;
}) {
  const context = useContext(ModalContext) as ModalContextType;
  const { isLoginModalOpen, setIsLoginModalOpen } = context;
  return (
    <>
      <div className="flex flex-col relative h-full min-h-screen">
        <Nav />
        <main className="flex flex-col flex-1">{children}</main>
        <Footer />
      </div>
      {isLoginModalOpen && <LogInModal />}
    </>
  );
}

export default Layout;
