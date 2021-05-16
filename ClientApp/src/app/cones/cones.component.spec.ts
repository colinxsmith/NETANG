import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConesComponent } from './cones.component';

describe('ConesComponent', () => {
  let component: ConesComponent;
  let fixture: ComponentFixture<ConesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
