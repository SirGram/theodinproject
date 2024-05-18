import { useContext } from "react";
import SubmitButton from "../../components/SubmitButton";
import Layout from "../../components/layout/layout";
import Messages from "./Messages";
import React from "react";

import {ModalContext, ModalContextType} from '../../context/ModalContext';
import SignInModal from "../../components/modals/LogInModal";

export default function Home() {
  
  return (
    <Layout>
      <Messages />
      <div className="w-full flex justify-center mt-6">
      <SubmitButton text='Create new message'/></div>
     

    </Layout>
  );
}
