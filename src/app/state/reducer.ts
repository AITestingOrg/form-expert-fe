import { List } from 'immutable';
import { IAction, IMetaType, ACTIONS } from './actions';
import { IState, IModel } from '../models/model';
import { Action } from 'redux';

export const INITIAIL_STATE: IState = {
    items: List<IModel>(),
    loading: false,
    error: null
};

export function createReducer(type: IMetaType) {
    return function Reducer(state: IState = INITIAIL_STATE,
      a: Action): IState {

      const action = a as IAction;
      if (!action.meta || action.meta.type !== type.type) {
        return state;
      }

      switch (action.type) {
        case ACTIONS.LOAD_STARTED:
          return {
            ...state,
            items: List<IModel>(),
            loading: true,
            error: null,
          };
        case ACTIONS.LOAD_SUCCEEDED:
          return {
            ...state,
            items: action.payload,
            loading: false,
            error: null,
          };
        case ACTIONS.LOAD_FAILED:
          return {
            ...state,
            items: List<IModel>(),
            loading: false,
            error: action.error,
          };
      }

      return state;
    };
  }
