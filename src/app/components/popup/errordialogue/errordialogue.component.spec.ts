import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ErrordialogueComponent } from './errordialogue.component';

describe('ErrordialogueComponent', () => {
  let component: ErrordialogueComponent;
  let fixture: ComponentFixture<ErrordialogueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ErrordialogueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrordialogueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
