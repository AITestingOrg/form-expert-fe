import { combineReducers } from 'redux';
import { composeReducers, defaultFormReducer } from '@angular-redux/form';
import { routerReducer } from '@angular-redux/router';

import { createLabelMappingReducer } from './label-mapping/label-mapping.reducer';

export const rootReducer = composeReducers(
  defaultFormReducer(),
  combineReducers({
    labelMapping: createLabelMappingReducer(),
    router: routerReducer,
}));
