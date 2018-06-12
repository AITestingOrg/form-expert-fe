import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ApiService } from './api-service';
import { LabelMapping } from '../models/label-mapping';

@Injectable({
  providedIn: 'root'
})
export class LabelMappingService extends ApiService<LabelMapping> {
  constructor(protected http: Http) {
    super(http, 'mapping', 'labelmapping');
  }
}
