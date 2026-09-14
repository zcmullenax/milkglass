import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentPreOrderComponent } from './current-pre-order-component';

describe('CurrentPreOrderComponent', () => {
  let component: CurrentPreOrderComponent;
  let fixture: ComponentFixture<CurrentPreOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrentPreOrderComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CurrentPreOrderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
