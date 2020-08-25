import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscribenosComponent } from './escribenos.component';

describe('EscribenosComponent', () => {
  let component: EscribenosComponent;
  let fixture: ComponentFixture<EscribenosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscribenosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscribenosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
