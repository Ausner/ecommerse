import Head from "next/head";
import Layout from "../components/layout";
import Hero from "@/components/hero";
import Services from "@/components/services";
import Menu from "@/components/menu";
import css from "../styles/home.module.css";
import { client } from "@/lib/client";

export default function Home({pizzas}) {
  return (
    <Layout>
      <div className={css.container}>
        <Head>
          <title>All Pizza</title>
          <meta name="description" content="Generated by create next app" />
          <link rel="icon" href="/Logo.png" />
        </Head>
        {/* body */}
        <main>
          <Hero/>   
          <Services/> 
          <Menu pizzas={pizzas} />
        </main>
      </div>
    </Layout> 
  );
}

export const getServerSideProps = async () => {
  const query = '*[_type == "pizza"]';
  const pizzas = await client.fetch(query);
  return {
    props: {
      pizzas
    }
  }
}

