import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyCounterComponent } from './weekly-counter.component';

describe('WeeklyCounterComponent', () => {
  let component: WeeklyCounterComponent;
  let fixture: ComponentFixture<WeeklyCounterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WeeklyCounterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WeeklyCounterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
