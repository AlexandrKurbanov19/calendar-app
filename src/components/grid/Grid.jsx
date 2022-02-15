import moment from 'moment';
import React from 'react';
import '../../index.scss';
import uniqid from 'uniqid';


export default function Grid({startDay, totalDays, events}) {

  
	const day = startDay.clone().subtract(1, 'day');
	const daysMap = [...Array(totalDays)].map(() => day.add(1, 'day').clone())
  // проверка на текущую дату
  const isCurrentDay = (day) => moment().isSame(day, 'day');
  

  return (
    <div className='grid'>
      {daysMap.map((weekItem) => (
        <div  key={uniqid()} className={moment().isSame(weekItem, 'day') ? "grid__item current" : "grid__item" && moment().isAfter(weekItem, 'day') ? "grid__item last" : "grid__item"  && (weekItem.day() === 0 || weekItem.day() === 6 ? "grid__item weekend" : "grid__item")} >
        
        <div className='grid__item-card'>
        {
											isCurrentDay(weekItem) ? (
												<p className='current'>{weekItem.format('D')}</p>
											) : (
											<p>	{weekItem.format('D')}</p>
											)
										}
                    <ul className="grid__item-event-list">
                      {
                        events.filter(event => event.date >= weekItem.format('X') && event.date <= weekItem.clone().endOf('day').format('X'))
                        .map((ev) => (<li key={ev.id} className={`event__item ${ev.type}`}>{ev.name}</li>) )
                      }
                      
                    </ul>
        </div>
                    
        </div>
      ))
      }
    
    </div>
  );
}
