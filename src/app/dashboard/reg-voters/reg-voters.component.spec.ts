import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegVotersComponent } from './reg-voters.component';

describe('RegVotersComponent', () => {
  let component: RegVotersComponent;
  let fixture: ComponentFixture<RegVotersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegVotersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegVotersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
