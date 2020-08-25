import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MediosInstitucionalesComponent } from './medios-institucionales.component';

describe('MediosInstitucionalesComponent', () => {
  let component: MediosInstitucionalesComponent;
  let fixture: ComponentFixture<MediosInstitucionalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MediosInstitucionalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MediosInstitucionalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
