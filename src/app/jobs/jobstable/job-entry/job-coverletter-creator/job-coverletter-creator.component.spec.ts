import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobCoverletterCreatorComponent } from './job-coverletter-creator.component';

describe('JobCoverletterCreatorComponent', () => {
  let component: JobCoverletterCreatorComponent;
  let fixture: ComponentFixture<JobCoverletterCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobCoverletterCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobCoverletterCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
