import { Action } from 'redux';
import { List } from 'immutable';
import { IModel } from '../models/model';
import { Injectable } from '@angular/core';
import { dispatch } from '@angular-redux/store';

export interface IMetaType {
    type: string;
}

export const ACTIONS = {
    LOAD_STARTED: 'LOAD_STARTED',
    LOAD_SUCCEEDED: 'LOAD_SUCCEEEDED',
    LOAD_FAILED: 'LOAD_FAILED'
};

export interface IAction extends Action {
    meta: IMetaType;
    payload: List<IModel>;
    error: {};
}

@Injectable()
export class Actions<T extends IModel> {
    loadStarted = (type: IMetaType): IAction => ({
        type: ACTIONS.LOAD_STARTED,
        meta: type,
        payload: null,
        error: {}
    })

    loadSucceeded = (type: IMetaType, payload: List<T>): IAction => ({
        type: ACTIONS.LOAD_SUCCEEDED,
        meta: type,
        payload,
        error: {}
    })

    loadFailed = (type: IMetaType, error): IAction => ({
        type: ACTIONS.LOAD_FAILED,
        meta: type,
        payload: null,
        error,
    })
}
