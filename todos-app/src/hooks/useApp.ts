import { useContext } from 'react';
import { AppContext, AppContextType, AppDispatchContext } from '../contexts/AppContext';

export function useApp(): AppContextType {
  return useContext(AppContext);
}

export function useAppDispatch(): any {
  return useContext(AppDispatchContext);
}
