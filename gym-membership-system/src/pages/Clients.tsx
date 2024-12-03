import React from 'react';
import { useClients } from '../context/ClientsContext';
import { Link } from 'react-router-dom';

const Clients: React.FC = () => {
  const { clients, removeClient, updateClientStatus } = useClients();

  const getDateClass = (endDate: string) => {
    const currentDate = new Date();
    const expirationDate = new Date(endDate);
    const daysLeft = Math.floor((expirationDate.getTime() - currentDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysLeft <= 7 && daysLeft >= 0) {
      return 'text-red-600 font-bold'; // Подсветка красным
    }
    return 'text-gray-500'; // Обычный стиль
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center text-black">Список клієнтів</h1>
      <div className="flex justify-center mb-4">
        <Link to="/add-client" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
          Додати клієнта
        </Link>
      </div>
      <ul role="list" className="divide-y divide-gray-300">
        {clients.map((client) => (
          <li key={client.id} className="flex justify-between gap-x-6 py-5">
            <div className="min-w-0 flex-auto">
              <p className="text-sm font-semibold text-black">{client.name}</p>
              <p className="mt-1 truncate text-xs text-gray-500">{client.phone}</p>
            </div>
            <div className="flex flex-col items-end">
              <p className="text-sm text-black">
                Статус: {client.status === 'В залі' ? 'В залі' : 'Не в залі'}
              </p>
              <button
                onClick={() => updateClientStatus(client.id)}
                className="mt-2 bg-blue-500 text-white py-1 px-3 rounded hover:bg-blue-600"
              >
                Поменять
              </button>
              <p className="mt-1 text-xs text-gray-500">
                Номер шафи: {client.lockerNumber ? client.lockerNumber : 'Невідомо'}
              </p>
              {/* Подсветка даты окончания абонемента */}
              <p className={`mt-1 text-xs ${getDateClass(client.endDate)}`}>
                Закінчення абонемента: {client.endDate}
              </p>
              {/* Отображаем "Тренер" только если это тренер */}
              {client.isTrainer ? (
                <p className="mt-1 text-xs text-gray-500 font-semibold text-green-600">Тренер</p>
              ) : (
                <p className="mt-1 text-xs text-gray-500">
                  {client.hasTrainer ? 'Тренировка с тренером' : 'Клієнт'}
                </p>
              )}
            </div>
            <div className="flex gap-x-2">
              <Link
                to={`/edit-client/${client.id}`}
                className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-600"
              >
                Редагувати
              </Link>
              <button
                onClick={() => removeClient(client.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Видалити
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clients;
