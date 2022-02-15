import moment from "moment";
import React from "react";
import "../../index.scss";
import uniqid from "uniqid";

export default function Grid({ startDay, totalDays, events }) {
  const day = startDay.clone().subtract(1, "day");
  const daysMap = [...Array(totalDays)].map(() => day.add(1, "day").clone());

  // проверка на текущую дату, прошедшие дни и выходные
  const isCurrentDay = (day) => moment().isSame(day, "day");
  const isAfterDay = (day) => moment().isAfter(day, "day");
  const isWeekend = (day) => day.day() === 0 || day.day() === 6;
  
  // возвращаю нужный клас
  const changeClassName = (day) => {
    if (isCurrentDay(day)) {
      return "current";
    } else if (isAfterDay(day)) {
      return "last";
    } else if (isWeekend(day)) {
      return "weekend";
    }
  };

  return (
    <div className="grid">
      {daysMap.map((weekItem) => (
        <div
          key={uniqid()}
          className={`grid__item ${changeClassName(weekItem)}`}
        >
          <div className="grid__item-card">
            {isCurrentDay(weekItem) ? (
              <p className="current">{weekItem.format("D")}</p>
            ) : (
              <p> {weekItem.format("D")}</p>
            )}
            <ul className="grid__item-event-list">
              {events
                .filter(
                  (event) =>
                    event.date >= weekItem.format("X") &&
                    event.date <= weekItem.clone().endOf("day").format("X")
                )
                .map((ev) => (
                  <li key={ev.id} className={`event__item ${ev.type}`}>
                    {ev.name}
                  </li>
                ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
}
