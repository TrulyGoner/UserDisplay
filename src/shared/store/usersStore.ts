import { createStore } from './createStore';
import { usersReducer, usersInitialState } from '../../entities/user/model/usersReducer';

export const usersStore = createStore(usersReducer, usersInitialState);
