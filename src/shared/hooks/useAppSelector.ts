import { useSelector, TypedUseSelectorHook } from 'react-redux';

import { AppStateType } from '../../App/store';

export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector;
