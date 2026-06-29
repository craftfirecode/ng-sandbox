import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpResourcePost } from './http-resource-post';

describe('HttpResourcePost', () => {
  let component: HttpResourcePost;
  let fixture: ComponentFixture<HttpResourcePost>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpResourcePost],
    }).compileComponents();

    fixture = TestBed.createComponent(HttpResourcePost);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
