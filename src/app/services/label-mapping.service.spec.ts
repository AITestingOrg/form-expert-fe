import { TestBed, inject } from '@angular/core/testing';

import { LabelMappingService } from './label-mapping.service';

describe('LabelMappingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LabelMappingService]
    });
  });

  it('should be created', inject([LabelMappingService], (service: LabelMappingService) => {
    expect(service).toBeTruthy();
  }));
});
