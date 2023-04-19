import { React } from "react";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import Head from "next/head";

function MainLayout({ children }) {
  return (
    <>
      <Head>
        <title>Romantiko Barbershop</title>
        <meta
          name="description"
          content="Romantiko Barbershop's Official Website"
        />
        {/** Need to change ico - lenard */}
        <link rel="icon" href="/favico.png" />
      </Head>

      <Header />
      <div id="mainContainer">{children}</div>
      <Footer />
    </>
  );
}

export default MainLayout;
