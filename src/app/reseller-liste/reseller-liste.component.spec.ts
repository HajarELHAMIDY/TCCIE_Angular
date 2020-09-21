import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResellerListeComponent } from './reseller-liste.component';

describe('ResellerListeComponent', () => {
  let component: ResellerListeComponent;
  let fixture: ComponentFixture<ResellerListeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResellerListeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResellerListeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
