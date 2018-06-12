import { List } from 'immutable';

export interface IModel {
    id: string;
}

export interface IState {
    items: List<IModel>;
    loading: boolean;
    error: any;
}
