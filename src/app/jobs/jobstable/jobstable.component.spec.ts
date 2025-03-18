import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobstableComponent } from './jobstable.component';

describe('JobstableComponent', () => {
  let component: JobstableComponent;
  let fixture: ComponentFixture<JobstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JobstableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JobstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
