import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOptionsComponent } from './select-options-component';

describe('SelectOptionsComponent', () => {
  let component: SelectOptionsComponent;
  let fixture: ComponentFixture<SelectOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectOptionsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOptionsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
