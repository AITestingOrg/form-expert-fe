import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';
import { NgReduxRouterModule, NgReduxRouter } from '@angular-redux/router';
import { provideReduxForms } from '@angular-redux/form';

import { createLogger } from 'redux-logger';

import { IAppState } from '../models/app';
import { rootReducer } from './root.reducer';
import { ServicesModule } from '../services/services.module';
import { LabelMappingActions } from './label-mapping/label-mapping.actions';

@NgModule({
  imports: [
    CommonModule,
    NgReduxModule,
    NgReduxRouterModule,
    ServicesModule
  ],
  declarations: [],
  providers: [LabelMappingActions]
})
export class StateModule {
  constructor(
    public store: NgRedux<IAppState>,
    devTools: DevToolsExtension,
    ngReduxRouter: NgReduxRouter
  ) {
    store.configureStore(
      rootReducer,
      {},
      [ createLogger() ],
      devTools.isEnabled() ? [ devTools.enhancer() ] : []);

    if (ngReduxRouter) {
      ngReduxRouter.initialize();
    }

    provideReduxForms(store);
}
}
