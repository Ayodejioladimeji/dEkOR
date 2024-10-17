import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Categories from "@/components/categories";
import Marquee from "@/components/Marquee";
import Testimonial from "@/components/Testimonial";

export default function Home() {
  return (
    <Layout>
      <Hero />
      <Marquee />
      <Categories />
      <Products />
      <Testimonial />
    </Layout>
  );
}
