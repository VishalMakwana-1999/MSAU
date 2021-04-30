import { TestBed } from '@angular/core/testing';

import { OnboardeeService } from './onboardee.service';
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { OnboardeeModel } from './models/onboardee';
describe('OnboardeeService', () => {
  let service: OnboardeeService;
  let httpMock: HttpTestingController;
  const ob: OnboardeeModel = {
    demandId: 1,
    fname: "VishalEdited",
    lname: "Makwana",
    startDate: "01-06-2021",
    bgcStatus: "Idle",
    managerId: 12,
    location: "Mumbai",
    etaCompletion: "10",
    email: "vishal.makwana@accolitedigital.com",
    dob: "01-10-1999",
    onboardStatus: "0",
    skills: {
      skillList: [
        {
          id: 25,
          demandId: 1,
          skillName: "Java",
          level: "Novice"
        }
      ]
    },
    phone: 9653484023
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OnboardeeService]
    });
    service = TestBed.inject(OnboardeeService);
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve onboardees from server', () => {
    const dummy = [{ demandId: 1, fname: "Vishal", lname: "Makwana" },
    { demandId: 2, fname: "Yash", lname: "Javeri" }]
    service.fetchOnboardees().subscribe((ob: any) => {
      expect(ob.length).toBe(2);
      expect(ob).toEqual(dummy)
    })

    const req = httpMock.expectOne("/api/fetch_onboardees");

    expect(req.request.method).toBe('GET');

    req.flush(dummy)
  })

  it('should retrieve Manager Trends', () => {
    const dummy = {
      manager: ['Yash', 'Vishal'],
      count: [10, 20]
    }
    service.fetchManagerTrends().subscribe((trend: any) => {
      expect(trend).toEqual(dummy)
      expect(trend.manager.length).toBe(trend.count.length)
    })
    const req = httpMock.expectOne("/api/managerTrends")
    expect(req.request.method).toBe('GET');
    req.flush(dummy)
  })
  it('should retrieve Location Trends', () => {
    const dummy = {
      location: ['Mumbai', 'Delhi'],
      count: [10, 20]
    }
    service.fetchLocation().subscribe((trend: any) => {
      expect(trend).toEqual(dummy)
      expect(trend.location.length).toBe(trend.count.length)
    })
    const req = httpMock.expectOne("/api/location")
    expect(req.request.method).toBe('GET');
    req.flush(dummy)
  })
  it('should retrieve Skill Trends', () => {
    const dummy = {
      skills: ['Python', 'Java'],
      count: [10, 20]
    }
    service.fetchSkills().subscribe((trend: any) => {
      expect(trend).toEqual(dummy)
      expect(trend.skills.length).toBe(trend.count.length)
    })
    const req = httpMock.expectOne("/api/skills")
    expect(req.request.method).toBe('GET');
    req.flush(dummy)
  })
  it('should retrieve Year Trends', () => {
    const dummy = {
      year: ['2020', '2021'],
      count: [10, 20]
    }
    service.fetchYearTrends().subscribe((trend: any) => {
      expect(trend).toEqual(dummy)
      expect(trend.year.length).toBe(trend.count.length)
    })
    const req = httpMock.expectOne("/api/yearTrends")
    expect(req.request.method).toBe('GET');
    req.flush(dummy)
  })
  it('should find an onboardee by id', () => {
    const dummy = { demandId: 12, fname: 'Vishal', lname: 'Makwana' }
    service.fetchOnboardees_byId(12)
      .subscribe((ob: any) => {

        expect(ob).toBeTruthy();
        expect(ob.demandId).toBe(12);

      });

    const req = httpMock.expectOne('/api/fetch_onboardees/12');

    expect(req.request.method).toEqual("GET");

    req.flush(dummy);

  });
  it('should add the onboardee data', () => {

    const res =
      { Status: 200, Message: "Onboardee Added Successfully" };

    service.createOnboardee(ob)
      .subscribe((res: any) => {

        expect(res.Status).toBe(200);

      });

    const req = httpMock.expectOne('/api/create');

    expect(req.request.method).toEqual("POST");

    expect(req.request.body.demandId)
      .toEqual(ob.demandId);

    req.flush(res)

  });

  it('should give an error if adding onboardee fails', () => {

    const res =
      { Status: 204, Message: "Email Already exists" };


    service.createOnboardee(ob)
      .subscribe((res: any) => {
        expect(res.Status).toBe(204)
      }
      );

    const req = httpMock.expectOne('/api/create');

    expect(req.request.method).toEqual("POST");

    req.flush(res);
  });

  it('should edit the onbaordee details', () => {

    const res =
      { Status: 200, Message: "Onboardee Details Edited Successfully" };

    service.updateOnboardee(ob)
      .subscribe((res: any) => {

        expect(res.Status).toBe(200);

      });

    const req = httpMock.expectOne('/api/update');

    expect(req.request.method).toEqual("POST");

    expect(req.request.body.demandId)
      .toEqual(ob.demandId);

    req.flush(res)

  });

  it('should give an error if updating onboardee fails', () => {

    const res =
      { Status: 204, Message: "Email Already exists" };


    service.updateOnboardee(ob)
      .subscribe((res: any) => {
        expect(res.Status).toBe(204)
      }
      );

    const req = httpMock.expectOne('/api/update');

    expect(req.request.method).toEqual("POST");

    req.flush(res);
  });

  it('should delete onboardee successfully', () => {

    const res =
      { Status: 200, Message: "Onboardeee Deleted Successfully" };


    service.deleteOnboardee_byId(12)
      .subscribe((res: any) => {
        expect(res.Status).toBe(200)
      }
      );

    const req = httpMock.expectOne('/api/delete/12');

    expect(req.request.method).toEqual("GET");

    req.flush(res);
  });

  it('should fetch Managers', () => {
    const managers = [{ managerId: 1, managerFname: 'Vishal', managerLname: "Makwana" },
    { managerId: 2, managerFname: 'Vishal', managerLname: "Makwana" }]
    service.fetchManagers().subscribe((res: any) => {
      expect(res.length).toBe(managers.length)
      expect(res).toEqual(managers)
    })
    const req = httpMock.expectOne('/api/fetch_managers');

    expect(req.request.method).toBe('GET');

    req.flush(managers)
  })

  it('should search Onboardees', () => {
    const ob = [{ demandId: 1, fname: "Vishal", lname: "Makwana" },
    { demandId: 12, fname: "Vishal", lname: "Makwana" }]

    service.searchOnboardee('vish').subscribe((res: any) => {
      expect(res.length).toBe(ob.length)
      expect(res).toEqual(ob)
    })

    const req = httpMock.expectOne('/api/fetch_onboardees/search/vish');

    expect(req.request.method).toBe('GET');
    req.flush(ob);
  })
});
