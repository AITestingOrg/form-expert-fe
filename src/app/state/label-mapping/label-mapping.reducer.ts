import { Action } from 'redux';
import { IState } from '../../models/model';
import { TYPES } from '../../models/types';
import { createReducer, INITIAIL_STATE } from '../reducer';


export function createLabelMappingReducer() {
    return function Reducer(state: IState = INITIAIL_STATE, a: Action) {
        return createReducer({ type: TYPES.LABEL_MAPPING })(state, a);
    };
}
