import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsformComponent } from './jobsform.component';

describe('JobsformComponent', () => {
  let component: JobsformComponent;
  let fixture: ComponentFixture<JobsformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobsformComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobsformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
