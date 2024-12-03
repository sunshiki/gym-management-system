export interface Client {
    id: number;
    name: string;
    phone: string;
    status: 'В залі' | 'Відсутній'; // Новое поле для статуса клиента
    startDate: string;
    endDate: string;
    hasLocker: boolean;
    lockerNumber?: number; // Поле для номера шкафа
    hasTrainer: boolean; // Добавьте это свойство
    isTrainer:boolean;
  }
  