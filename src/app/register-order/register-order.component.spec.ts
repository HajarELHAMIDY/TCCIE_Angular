import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterOrderComponent } from './register-order.component';

describe('RegisterOrderComponent', () => {
  let component: RegisterOrderComponent;
  let fixture: ComponentFixture<RegisterOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
