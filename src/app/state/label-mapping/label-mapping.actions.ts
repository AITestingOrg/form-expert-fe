import { Actions, IMetaType } from '../actions';
import { LabelMapping } from '../../models/label-mapping';
import { Injectable } from '@angular/core';
import { LabelMappingService } from '../../services/label-mapping.service';
import { TYPES } from '../../models/types';
import { NgRedux } from '@angular-redux/store';
import { IAppState } from '../../models/app';

@Injectable()
export class LabelMappingActions extends Actions<LabelMapping> {
    type: IMetaType = { type: TYPES.LABEL_MAPPING };

    constructor(protected labelMappingService: LabelMappingService, private ngRedux: NgRedux<IAppState>) {
        super();
    }

    getAllMappings() {
        this.ngRedux.dispatch(this.loadStarted(this.type));
        const obs = this.labelMappingService.getAll();
        obs.subscribe(mappings => {
            this.ngRedux.dispatch(this.loadSucceeded(this.type, mappings));
        }, err => {
            this.ngRedux.dispatch(this.loadFailed(this.type, err));
        });
    }
}
