import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-600 text-white p-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Система управления клиентами</h1>
        <div>
          <Link to="/" className="mr-4 hover:underline">Главная</Link>
          <Link to="/clients" className="mr-4 hover:underline">Клиенты</Link>
          <Link to="/add-client" className="hover:underline">Добавить клиента</Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
