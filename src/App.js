import { React, useState } from 'react';
import moment from 'moment';
import ruLocale from 'moment/locale/ru';
import Header from './components/header/Header';
import Grid from './components/grid/Grid';

// количество: 6 недель на 7 дней
const totalDays = 42;

function App() {
  // выборка русского языка работает вместе с верхним импортом ru
  moment.locale('ru');
  window.app = moment();
  const [today, setToday] = useState(moment());
  // получаем первый день месяца
  const startDay = today.clone().startOf('month').startOf('week');

  // состояние для ивентов
  // -events - Array - массив с объектами событий для отображения. Объекты событий имеют следующие свойства: id, название, дата, тип.
  // Для теста достаточно сделать события 3 типов: зеленое, красное и оранжевое. Тип события влияет только на цвет отображения.

  const [events, setEvents] = useState([
    { id: 1, name: 'Купить носки', date: 1644846380, type: 'orange' },
    { id: 2, name: 'Записаться к врачу', date: 1645969580, type: 'green' },
    { id: 3, name: 'Подарить жене подарок', date: 1646468409, type: 'red' },
    { id: 4, name: 'Сьездить на собес', date: 1648196409, type: 'orange' },
    { id: 5, name: 'СДелать тз', date: 1650874809, type: 'green' },
    { id: 6, name: 'Сходить на секцию', date: 1650874809, type: 'red' },
    { id: 7, name: 'Моя днюшка :)', date: 1645278380, type: 'green' },
  ]);

  // переключение месяцев
  const prevHandler = () => setToday((prev) => prev.clone().subtract(1, 'month'));
  const todayHandler = () => setToday(moment());
  const nextHandler = () => setToday((prev) => prev.clone().add(1, 'month'));

  return (
    <div className="main">
      <Header
        today={today}
        prevHandler={prevHandler}
        todayHandler={todayHandler}
        nextHandler={nextHandler}
      />

      <Grid startDay={startDay} today={today} totalDays={totalDays} events={events} />
    </div>
  );
}

export default App;
