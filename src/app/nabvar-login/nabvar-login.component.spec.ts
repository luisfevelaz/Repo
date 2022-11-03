import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NabvarLoginComponent } from './nabvar-login.component';

describe('NabvarLoginComponent', () => {
  let component: NabvarLoginComponent;
  let fixture: ComponentFixture<NabvarLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NabvarLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NabvarLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
