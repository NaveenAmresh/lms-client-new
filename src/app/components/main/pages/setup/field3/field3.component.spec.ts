import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Field3Component } from './field3.component';

describe('Field3Component', () => {
  let component: Field3Component;
  let fixture: ComponentFixture<Field3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Field3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Field3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
