import { Form } from './components/Form';
import { useEffect, useMemo } from 'react';
import { ActivityList } from './components/ActivityList';
import { CalorieTracker } from './components/CalorieTracker';
import { useActivity } from './hooks/useActivity';

export function App() {
  const { state, dispatch } = useActivity();

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities]);

  const canRestarApp = () =>
    useMemo(() => state.activities.length > 0, [state.activities]);

  return (
    <>
      <header className='bg-lime-600 py-3 flex flex-row justify-around items-center'>
        <div className='max-w-4xl  flex justify-between'>
          <h1 className='text-center text-lg font-bold text-white uppercase'>
            Contador de Calorias
          </h1>
        </div>
        <button
          className='bg-red-500 p-3 rounded-full text-white hover:bg-red-300 disabled:opacity-10'
          disabled={!canRestarApp()}
          onClick={() => dispatch({ type: 'restart-app' })}
        >
          Reiniciar
        </button>
      </header>

      <section className='bg-lime-500 py-20 px-5'>
        <div className='max-w-4xl mx-auto'>
          <Form></Form>
        </div>
      </section>

      <section className='bg-gray-800 py-10'>
        <div className='max-w-4xl mx-auto'>
          <CalorieTracker></CalorieTracker>
        </div>
      </section>

      <section className='p-10 mx-auto max-w-4xl'>
        <ActivityList></ActivityList>
      </section>
    </>
  );
}
