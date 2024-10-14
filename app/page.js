"use client";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import NewsList from "@/components/NewsList";

export default function Home() {
  return (
    <>
      <div className="min-h-[94vh]">
        <Header />
        <NewsList />
      </div>
      <Footer />
    </>
  );
}
