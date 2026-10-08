import { useState } from 'react';
import { X } from 'lucide-react';

const TIME_OPTIONS = {
  morning: '09:00',
  lunch: '12:00',
  afternoon: '15:00',
  dinner: '18:30',
};

const Popup = ({ selectedPlaces, onClose, onAddSchedule }) => {
  const [scheduleForms, setScheduleForms] = useState(
    selectedPlaces.map((place) => ({
      placeId: place.id,
      day: 'DAY 1',
      timeSlot: 'lunch',
    }))
  );

  const handleDayChange = (placeId, day) => {
    setScheduleForms((prev) =>
      prev.map((item) => (item.placeId === placeId ? { ...item, day } : item))
    );
  };

  const handleTimeChange = (placeId, timeSlot) => {
    setScheduleForms((prev) =>
      prev.map((item) =>
        item.placeId === placeId ? { ...item, timeSlot } : item
      )
    );
  };

  const handleSubmit = () => {
    const schedules = scheduleForms.map((form) => {
      const place = selectedPlaces.find((place) => place.id === form.placeId);

      return {
        day: form.day,
        time: TIME_OPTIONS[form.timeSlot],
        title: place.name,
        desc: place.description || '',
        address: place.address || '',
      };
    });

    onAddSchedule(schedules);
    onClose();
  };

  return (
    <div className="box__layer">
      <button
        type="button"
        className="button__close"
        onClick={onClose}
        aria-label="닫기"
      >
        <X size={26} strokeWidth={1.8} />
      </button>

      <p className="text__title">일정 추가</p>

      {selectedPlaces.map((place) => {
        const currentSchedule = scheduleForms.find(
          (item) => item.placeId === place.id
        );

        return (
          <div className="box__place" key={place.id}>
            <strong>{place.name}</strong>

            <select
              name={`day-${place.id}`}
              value={currentSchedule.day}
              onChange={(e) => handleDayChange(place.id, e.target.value)}
            >
              <option value="DAY 1">DAY 1</option>
              <option value="DAY 2">DAY 2</option>
            </select>

            <div className="box__time">
              <label htmlFor={`morning-${place.id}`}>
                <input
                  type="radio"
                  name={`time-${place.id}`}
                  id={`morning-${place.id}`}
                  value="morning"
                  checked={currentSchedule.timeSlot === 'morning'}
                  onChange={(e) => handleTimeChange(place.id, e.target.value)}
                />
                <span>아침</span>
              </label>

              <label htmlFor={`lunch-${place.id}`}>
                <input
                  type="radio"
                  name={`time-${place.id}`}
                  id={`lunch-${place.id}`}
                  value="lunch"
                  checked={currentSchedule.timeSlot === 'lunch'}
                  onChange={(e) => handleTimeChange(place.id, e.target.value)}
                />
                <span>점심</span>
              </label>

              <label htmlFor={`afternoon-${place.id}`}>
                <input
                  type="radio"
                  name={`time-${place.id}`}
                  id={`afternoon-${place.id}`}
                  value="afternoon"
                  checked={currentSchedule.timeSlot === 'afternoon'}
                  onChange={(e) => handleTimeChange(place.id, e.target.value)}
                />
                <span>오후</span>
              </label>

              <label htmlFor={`dinner-${place.id}`}>
                <input
                  type="radio"
                  name={`time-${place.id}`}
                  id={`dinner-${place.id}`}
                  value="dinner"
                  checked={currentSchedule.timeSlot === 'dinner'}
                  onChange={(e) => handleTimeChange(place.id, e.target.value)}
                />
                <span>저녁</span>
              </label>
            </div>
          </div>
        );
      })}

      <button type="button" className="button__submit" onClick={handleSubmit}>
        일정에 추가
      </button>
    </div>
  );
};

export default Popup;
