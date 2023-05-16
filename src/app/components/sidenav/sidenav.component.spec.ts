import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavComponent } from './sidenav.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {AngularMaterialModule} from '../../modules/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../../app-routing.module';


describe('SidenavComponent', () => { 
  let component: SidenavComponent;
  let fixture: ComponentFixture<SidenavComponent>;
  let mockAuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavComponent ],
      imports: [HttpClientModule, AngularMaterialModule, BrowserAnimationsModule, AppRoutingModule]
    })
    .compileComponents();

    mockAuthService = jasmine.createSpyObj(['isLoggedIn']);
    mockAuthService.isLoggedIn.and.returnValue(false);
    fixture = TestBed.createComponent(SidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show logged in sidebar items', () => {

    spyOn(component, 'isLoggedIn').and.returnValue(true);
    fixture.detectChanges();

    const navigationLinks = fixture.nativeElement.querySelectorAll('a');

    expect(navigationLinks[0].textContent).toContain("Recruitments")
    expect(navigationLinks[1].textContent).toContain("ToDo Lists")
  });

  it('should show guest sidebar items', () => {

    spyOn(component, 'isLoggedIn').and.returnValue(false);
    fixture.detectChanges();

    const navigationLinks = fixture.nativeElement.querySelectorAll('a');

    expect(navigationLinks[0].textContent).toContain("Login") 
    expect(navigationLinks[1].textContent).toContain("Register")
  });
});
