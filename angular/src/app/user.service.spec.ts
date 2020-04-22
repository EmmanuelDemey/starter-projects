import { TestBed, async } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { UserService } from './user.service';

describe('UserService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let service: UserService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(UserService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', async(() => {
    service.getCurrentUser().subscribe((user) => {
      expect(user).toEqual({ username: 'fake' });
    });

    const req = httpTestingController.expectOne('/assets/mocks/user.json');

    req.flush({
      username: 'fake',
    });

    httpTestingController.verify();
  }));
});
