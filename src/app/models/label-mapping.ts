import { Record } from 'immutable';
import { IModel } from './model';

export type LabelMappingType = {
    id?: string,
    label: string,
    type: string,
    abstraction: string
};
export class LabelMapping extends Record({}) implements IModel {
    id: string;
    label: string;
    type: string;
    abstraction: string;

    constructor(params?: LabelMappingType) {
        params ? super(params) : super();
    }

    with(values: LabelMappingType) {
        return this.merge(values) as this;
    }
}
