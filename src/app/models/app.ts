import { IState } from './model';

export interface IAppState {
    [type: string]: IState;
    routes?: any;
}
