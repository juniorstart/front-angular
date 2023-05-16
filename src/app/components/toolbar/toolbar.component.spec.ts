import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AngularMaterialModule } from 'src/app/modules/material.module';
import { AuthService } from 'src/app/services/auth.service';

import { ToolbarComponent } from './toolbar.component';


const TITLE_NAME  = "Junior Start"

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>; 
  let mockAuthService: any; 

  beforeEach(async () => {
    mockAuthService = jasmine.createSpyObj(['isLoggedIn']);
    await TestBed.configureTestingModule({
      declarations: [ ToolbarComponent ],
      imports: [HttpClientModule, AngularMaterialModule],
      providers: [{provide: AuthService, useValue: mockAuthService}]
    })
    .compileComponents();


    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show title in the toolbar', () => {

    const titleElement = fixture.nativeElement.querySelector("span")
    expect(titleElement.textContent).toBe(TITLE_NAME);
  });


  it('should show logout button in the toolbar', () => {
    mockAuthService.isLoggedIn.and.returnValue(true);
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector("button")
    expect(buttonElement).toBeTruthy();
    expect(buttonElement.textContent).toBe("Logout");
  });

  it('should not show logout button in the toolbar', () => {
    mockAuthService.isLoggedIn.and.returnValue(false);
    fixture.detectChanges();

    const buttonElement = fixture.nativeElement.querySelector("button")
    expect(buttonElement).not.toBeTruthy();
  });
});
