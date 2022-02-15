import React from "react";
import arrow from "../../assets/img/arrow.svg";
import moment from "moment";
import uniqid from "uniqid";

export default function Header({
  today,
  prevHandler,
  todayHandler,
  nextHandler,
}) {
  // пустой массив для вывода дней недели
  const nameOfDay = [...Array(7)];
  const isCurrentYear = new Date().getFullYear();

  return (
    <div className="header">
      <div className="header__changeMonth">
        <button className="btn__changeMonth left" onClick={prevHandler}>
          <img src={arrow} alt="" />
        </button>
        <span onClick={todayHandler} className="monthName">
          {/* вывод текущего месяца + выводим год в зависимости от условия*/}
          {today.format("MMMM") + " "}
          {Number(isCurrentYear) === Number(today.format("YYYY")) ? (
            ""
          ) : (
            <span>{today.format("YYYY")}</span>
          )}
        </span>
        <button className="btn__changeMonth" onClick={nextHandler}>
          <img src={arrow} alt="" />
        </button>
      </div>
      {/* вывод дней недели moment.js */}
      <div className="header__days">
        {nameOfDay.map((i, index) => (
          <div key={uniqid()} className="header__item">
            {moment().day(index + 1).format("dddd")}
          </div>
        ))}
      </div>
    </div>
  );
}
