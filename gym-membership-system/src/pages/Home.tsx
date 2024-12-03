import React from "react";
import { Link } from "react-router-dom";
import Stats from "../components/Stats";

const Home: React.FC = () => {
  return (
    <div className="p-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">Вітаємо у системі управління клієнтами</h2>
      <p className="mb-6 text-center">Оберіть розділ для продовження.</p>
      
      <div className="flex justify-center mb-6">
        <Stats />
      </div>
      
      {/* <div className="flex justify-center">
        <Link
          to="/add-client"
          className="bg-green-500 text-white py-2 px-6 rounded shadow hover:bg-green-600 transition"
        >
          Додати клієнта
        </Link>
      </div> */}
    </div>
  );
};

export default Home;
