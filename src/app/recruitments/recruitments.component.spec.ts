import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruitmentsComponent } from './recruitments.component';

describe('RecruitmentsComponent', () => {
  let component: RecruitmentsComponent;
  let fixture: ComponentFixture<RecruitmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecruitmentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruitmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
