import { CalorieDisplat } from './CalorieDisplat';
import { useActivity } from '../hooks/useActivity';

export const CalorieTracker = () => {
  const { caloriasLose, resultCalories, caloriesConsumed } = useActivity();

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
