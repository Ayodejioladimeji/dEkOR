import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Categories from "@/components/categories";
import TopDeals from "@/components/TopDeals";
import Marquee from "@/components/Marquee";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <TopDeals />
    </Layout>
  );
}
