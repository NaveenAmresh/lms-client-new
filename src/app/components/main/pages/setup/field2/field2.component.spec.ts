import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Field2Component } from './field2.component';

describe('Field2Component', () => {
  let component: Field2Component;
  let fixture: ComponentFixture<Field2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Field2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Field2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
