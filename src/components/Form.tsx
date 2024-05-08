import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { categories } from '../data/data';
import { Activity } from '../types';
import { useActivity } from '../hooks/useActivity';

const initialState = {
  id: uuidv4(),
  category: 1,
  calories: 0,
  name: '',
};

export const Form = () => {
  const [activity, setActivity] = useState<Activity>(initialState);

  const { state, dispatch } = useActivity();

  useEffect(() => {
    if (state.activeId) {
      const selectedActivity = state.activities.filter(
        (stateActivity) => stateActivity.id === state.activeId
      )[0];
      setActivity(selectedActivity);
    }
  }, [state.activeId]);

  const handleChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
  ) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id);

    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories } = activity;
    return name.trim() !== '' && calories > 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: 'save-activity', payload: { newActivity: activity } });

    setActivity({
      ...initialState,
      id: uuidv4(),
    });
  };

  return (
    <form
      className='space-y-5 bg-white shadow p-10 rounded-lg'
      onSubmit={handleSubmit}
    >
      <div className='grid grid-cols-1 gap-3'>
        <label className='font-bold' htmlFor='category'>
          Categoria:
        </label>
        <select
          className='border border-slate-300 p-2 rounded-lg w-ul'
          id='category'
          value={activity.category}
          onChange={handleChange}
        >
          {categories.map((elem) => (
            <option key={elem.id} value={elem.id}>
              {elem.name}
            </option>
          ))}
        </select>
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label className='font-bold' htmlFor='name'>
          Actividad:
        </label>
        <input
          className='border border-slate-300 p-2 rounded-lg'
          type='text'
          id='name'
          placeholder='Ej.Comida, Jugo de Naranja , Ensalada , Ejercicio, Pesas , Bicicleta'
          value={activity.name}
          onChange={handleChange}
        />
      </div>

      <div className='grid grid-cols-1 gap-3'>
        <label className='font-bold' htmlFor='calories'>
          Calorias:
        </label>
        <input
          className='border border-slate-300 p-2 rounded-lg'
          type='number'
          id='calories'
          placeholder='Calorias'
          value={activity.calories}
          onChange={handleChange}
        />
      </div>

      <input
        type='submit'
        className='bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:opacity-10'
        value={activity.category === 1 ? 'Guardar Comida' : 'Guardar Ejercicio'}
        disabled={!isValidActivity()}
      />
    </form>
  );
};
