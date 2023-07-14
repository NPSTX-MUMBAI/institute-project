/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CollectionService } from './collection.service';

describe('Service: Collection', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CollectionService]
    });
  });

  it('should ...', inject([CollectionService], (service: CollectionService) => {
    expect(service).toBeTruthy();
  }));
});
