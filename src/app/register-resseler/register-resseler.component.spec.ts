import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterResselerComponent } from './register-resseler.component';

describe('RegisterResselerComponent', () => {
  let component: RegisterResselerComponent;
  let fixture: ComponentFixture<RegisterResselerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterResselerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterResselerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
