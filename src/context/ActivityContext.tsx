import { ReactNode, createContext, useReducer, useMemo } from 'react';
import {
  ActivityActions,
  activityReducer,
  initialState,
  ActivityState,
} from '../reducers/activity-reducer';

type ActivityProviderProps = {
  children: ReactNode;
};

type ActivityContextProps = {
  state: ActivityState;
  dispatch: React.Dispatch<ActivityActions>;
  caloriesConsumed: number;
  caloriasLose: number;
  resultCalories: number;
};

export const ActivityContext = createContext<ActivityContextProps>(null!);

export const ActivityProvider = ({ children }: ActivityProviderProps) => {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  const caloriesConsumed = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 1 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const caloriasLose = useMemo(
    () =>
      state.activities.reduce(
        (total, activity) =>
          activity.category === 2 ? total + activity.calories : total,
        0
      ),
    [state.activities]
  );

  const resultCalories = useMemo(
    () => caloriesConsumed - caloriasLose,
    [state.activities]
  );

  return (
    <ActivityContext.Provider
      value={{
        state,
        dispatch,
        caloriasLose,
        caloriesConsumed,
        resultCalories,
      }}
    >
      {children}
    </ActivityContext.Provider>
  );
};
