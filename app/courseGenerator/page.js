import React from "react";
import Header from "./_components/Header";
import Hero from "./_components/Hero";

function Home() {
  return (
    <div className="min-h-screen bg-[#FDF8F3]">
      {/* header */}
      <Header />

      {/* hero */}
      <Hero />
    </div>
  );
}

export default Home;
