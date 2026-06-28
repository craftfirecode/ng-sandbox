import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutSlot } from './layout-slot';

describe('LayoutSlot', () => {
  let component: LayoutSlot;
  let fixture: ComponentFixture<LayoutSlot>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutSlot],
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutSlot);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
