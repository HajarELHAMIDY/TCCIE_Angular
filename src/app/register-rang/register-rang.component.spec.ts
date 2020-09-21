import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRangComponent } from './register-rang.component';

describe('RegisterRangComponent', () => {
  let component: RegisterRangComponent;
  let fixture: ComponentFixture<RegisterRangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
