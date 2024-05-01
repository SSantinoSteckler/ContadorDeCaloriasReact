import { useMemo } from 'react';
import { Activity } from '../types';
import { CalorieDisplat } from './CalorieDisplat';

type ActivityTraker = {
  activities: Activity[];
};

export const CalorieTracker = ({ activities }: ActivityTraker) => {
  const caloriesConsumed = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const caloriasLose = useMemo(
    () =>
      activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [activities]
  );

  const resultCalories = useMemo(
    () => caloriesConsumed - caloriasLose,
    [activities]
  );

  return (
    <>
      <h2 className='text-4xl font-black text-white text-center'>
        Resumen de Caloriass
      </h2>

      <div className='flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10'>
        <CalorieDisplat
          calories={caloriesConsumed}
          text='Consumidas'
        ></CalorieDisplat>

        <CalorieDisplat
          calories={caloriasLose}
          text='Perdidas'
        ></CalorieDisplat>

        <CalorieDisplat
          calories={resultCalories}
          text='Resultado calorico'
        ></CalorieDisplat>
      </div>
    </>
  );
};
