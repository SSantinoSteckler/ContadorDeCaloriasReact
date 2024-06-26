import { Activity } from '../types';
import { categories } from '../data/data';
import { useMemo } from 'react';
import { PencilSquareIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useActivity } from '../hooks/useActivity';

export const ActivityList = () => {
  const { state, dispatch } = useActivity();
  const { activities } = state;

  const categoryName = useMemo(
    () => (category: Activity['category']) =>
      categories.map((cat) => (cat.id === category ? cat.name : '')),
    [activities]
  );

  return (
    <>
      <h2 className='text-4xl font-bold text-slate-600 text-center '>
        Comida y Actividades
      </h2>

      {activities.length === 0 ? (
        <p className='text-center m-7 text-3xl'>No hay actividades aun...</p>
      ) : (
        activities.map((activity) => (
          <div
            key={activity.id}
            className='px-5 py-10 bg-white mt-5 flex justify-between items-center shadow-2xl'
          >
            <div className='space-y-2 relative'>
              <p
                className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                  activity.category === 1 ? 'bg-lime-500' : 'bg-orange-500'
                }`}
              >
                {categoryName(+activity.category)}
              </p>
              <p className='text-2xl font-bold pt-5'>{activity.name}</p>
              <p className='font-black text-4xl text-lime-500'>
                {activity.calories} {''}
                <span>Calorias</span>
              </p>
            </div>
            <div>
              <button>
                <PencilSquareIcon
                  className='h-8 w-8 text-gray-800'
                  onClick={() =>
                    dispatch({
                      type: 'set-activeId',
                      payload: { id: activity.id },
                    })
                  }
                ></PencilSquareIcon>
              </button>
              <button>
                <XCircleIcon
                  className='h-8 w-8 text-red-600'
                  onClick={() =>
                    dispatch({
                      type: 'delete-activity',
                      payload: { id: activity.id },
                    })
                  }
                ></XCircleIcon>
              </button>
            </div>
          </div>
        ))
      )}
    </>
  );
};
