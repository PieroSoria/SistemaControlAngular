import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderbashComponent } from './headerbash.component';

describe('HeaderbashComponent', () => {
  let component: HeaderbashComponent;
  let fixture: ComponentFixture<HeaderbashComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderbashComponent]
    });
    fixture = TestBed.createComponent(HeaderbashComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
