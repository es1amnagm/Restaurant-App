import React from "react";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
function Home() {
  return (
    <>
      <Header />
      <main>
        <section className="relative w-full h-[300px] bg-[url('foods.webp')] bg-cover bg-center rounded-xl overflow-hidden">
          <div className="absolute bottom-4 right-4 text-white text-3xl font-bold bg-black/40 px-3 py-1 rounded">
            استمتع بألذ الأطباق الشرقية الأصيلة
          </div>
        </section>
      </main>
    </>
  );
}

export default Home;
