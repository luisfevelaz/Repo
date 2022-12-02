import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowpdfComponent } from './showpdf.component';

describe('ShowpdfComponent', () => {
  let component: ShowpdfComponent;
  let fixture: ComponentFixture<ShowpdfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowpdfComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowpdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
