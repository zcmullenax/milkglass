import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupDateSelectorComponent } from './pickup-date-selector-component';

describe('PickupDateSelectorComponent', () => {
  let component: PickupDateSelectorComponent;
  let fixture: ComponentFixture<PickupDateSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickupDateSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickupDateSelectorComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
