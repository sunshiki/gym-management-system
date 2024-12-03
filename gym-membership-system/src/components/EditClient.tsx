import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClients } from '../context/ClientsContext';
import { Client } from '../types/Client';

const EditClient: React.FC = () => {
  const { clients, updateClient } = useClients();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<Client>>({});

  useEffect(() => {
    if (id) {
      const clientId = Number(id); // Преобразуем id в тип number
      const clientToEdit = clients.find(client => client.id === clientId);
      if (clientToEdit) {
        setFormData(clientToEdit);
      }
    }
  }, [id, clients]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (id) {
      const clientId = Number(id);
      updateClient(clientId, formData);
      navigate('/clients');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Редагування клієнта</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1">Ім'я</label>
          <input
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Телефон</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone || ''}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Статус</label>
          <select
            name="status"
            value={formData.status || 'Відсутній'}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Відсутній">Відсутній</option>
            <option value="В залі">В залі</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Номер шафи</label>
          <input
            type="number"
            name="lockerNumber"
            value={formData.lockerNumber || ''}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Зберегти зміни
        </button>
      </form>
    </div>
  );
};

export default EditClient;
