import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThirdScreenComponent } from './third-screen.component';

describe('ThirdScreenComponent', () => {
  let component: ThirdScreenComponent;
  let fixture: ComponentFixture<ThirdScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThirdScreenComponent]
    });
    fixture = TestBed.createComponent(ThirdScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
