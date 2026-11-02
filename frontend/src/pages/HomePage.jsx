import { useState } from "react";
import Hero from "../components/Hero";
import MangoVarieties from "../components/MangoVarieties";
import About from "../components/About";
import Testimonials from "../components/Testimonials";
import OrderForm from "../components/OrderForm";

export default function HomePage() {
  const [selectedMango, setSelectedMango] = useState(null);

  const handleSelectMango = (mango) => {
    setSelectedMango(mango);
  };

  return (
    <main className="overflow-x-hidden">
      <Hero />
      <MangoVarieties onSelectMango={handleSelectMango} />
      <About />
      <Testimonials />
      <OrderForm selectedMango={selectedMango} />
    </main>
  );
}
