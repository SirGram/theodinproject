import React, { ReactNode } from "react";
import Nav from './Nav'



function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="min-h-screen flex flex-col relative">
        <Nav text='admin'/>
        <main className="container flex flex-col md:flex-row gap-8 justify-center flex-1  ">
         
            {children}
         
        </main>
      </div>
    </>
  );
}

export default Layout;
