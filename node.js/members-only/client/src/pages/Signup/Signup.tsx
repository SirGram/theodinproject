import React, { MouseEvent, useState } from "react";
import Layout from "../../components/layout/layout";
import SignupForm from "./SignupForm";
const Signup = () => {
  return (
    <Layout>
      <section>
        <h1 className="text-center mb-10 font-semibold">Sign Up</h1>
      <SignupForm />
      </section>
    </Layout>
  );
};

export default Signup;
