import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClients } from '../context/ClientsContext';

const AddClient: React.FC = () => {
  const { addClient } = useClients();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<{
    name: string;
    phone: string;
    lockerNumber?: number; // Опциональное поле для номера шкафа
    status: 'Відсутній' | 'В залі'; // Ограниченный тип для status
    hasTrainer: boolean; // Поле для выбора, с тренером или без
    startDate: string; // Обязательное поле
    endDate: string; // Обязательное поле
    hasLocker: boolean; // Обязательное поле
    isTrainer: boolean; // Новый флаг для определения, тренер это или клиент
  }>({
    name: '',
    phone: '',
    lockerNumber: undefined,
    status: 'Відсутній',
    hasTrainer: false,
    startDate: '', // Инициализация пустым значением
    endDate: '', // Инициализация пустым значением
    hasLocker: false, // Инициализация по умолчанию
    isTrainer: false, // Инициализация флага, чтобы понять, тренер ли это
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheckboxChange = () => {
    if (!formData.isTrainer) {
      setFormData({
        ...formData,
        hasTrainer: !formData.hasTrainer,
      });
    }
  };

  const handleRoleChange = (role: 'Клієнт' | 'Тренер') => {
    const isTrainer = role === 'Тренер';
    setFormData({
      ...formData,
      isTrainer,
      hasTrainer: false, // Сбрасываем, так как тренер не может иметь тренера
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addClient(formData);
    navigate('/clients');
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Додати нового клієнта</h2>
      <div className="mb-4 flex justify-center">
        <button
          onClick={() => handleRoleChange('Клієнт')}
          className={`py-2 px-4 rounded ${
            !formData.isTrainer ? 'bg-blue-500 text-white' : 'bg-gray-300 text-gray-700'
          } hover:bg-blue-600 mr-2`}
        >
          Клієнт
        </button>
        <button
          onClick={() => handleRoleChange('Тренер')}
          className={`py-2 px-4 rounded ${
            formData.isTrainer ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
          } hover:bg-green-600`}
        >
          Тренер
        </button>
      </div>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 rounded shadow-md">
        <div className="mb-4">
          <label className="block mb-1">Ім'я</label>
          <input
            type="text"
            name="name"
            value={formData.name}
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
            value={formData.phone}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Номер шафки</label>
          <input
            type="number"
            name="lockerNumber"
            value={formData.lockerNumber || ''}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Статус</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full"
          >
            <option value="Відсутній">Відсутній</option>
            <option value="В залі">В залі</option>
          </select>
        </div>
        {!formData.isTrainer && (
          <div className="mb-4 flex items-center">
            <label className="mr-2">З тренером:</label>
            <input
              type="checkbox"
              checked={formData.hasTrainer}
              onChange={handleCheckboxChange}
              className="border p-2"
            />
          </div>
        )}
        <div className="mb-4">
          <label className="block mb-1">Дата початку</label>
          <input
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Дата закінчення</label>
          <input
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
            className="border p-2 w-full"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Додати клієнта
        </button>
      </form>
    </div>
  );
};

export default AddClient;
