import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed } from '@angular/core/testing';

import { Department } from '../models/department.model';
import { DepartmentService } from './department.service';

const testDepartments: Department[] = [
  {
    departmentId: 1,
    departmentName: "A",
    departmentCode: "Aa"
  },
  {
    departmentId: 2,
    departmentName: "B",
    departmentCode: "Bb"
  }
]

describe('DepartmentService', () => {
  let httpTestingController: HttpTestingController;
  let departmentService: DepartmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    departmentService = TestBed.inject(DepartmentService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(departmentService).toBeTruthy();
  });

  it('#getDepartments should return all departments (HttpClient called once)', (done: DoneFn) => {
    const expectedDepartments: Department[] = testDepartments;

    departmentService.getDepartments().subscribe({
      next: departments => {
        expect(departments).toEqual(expectedDepartments);
        done();
      },
      error: done.fail
    });

    const req = httpTestingController.expectOne('api/departments');
    expect(req.request.method).toEqual('GET');
    req.flush(expectedDepartments);
  });

  it('#getProductsByQuery should return undefined on error', (done: DoneFn) => {
    departmentService.getDepartments().subscribe({
      next: departments => {
        expect(departments).toBeUndefined();
        done();
      },
      error: done.fail
    });

    const errorEvent: ErrorEvent = new ErrorEvent('404');
    httpTestingController.expectOne('api/departments').error(errorEvent);
  });
});
