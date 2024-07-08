import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Categories from "@/components/categories";
import TopDeals from "@/components/TopDeals";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <Layout>
      <Hero />
      {/* <Categories /> */}
      {/* <Products /> */}
      {/* <TopDeals /> */}
    </Layout>
  );
}
