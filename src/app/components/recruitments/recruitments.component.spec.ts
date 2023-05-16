import { HttpClientModule } from "@angular/common/http";
import { ComponentFixture, fakeAsync, TestBed, tick } from "@angular/core/testing";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppRoutingModule } from "src/app/app-routing.module";
import { AngularMaterialModule } from "src/app/modules/material.module";
import { RecruitmentsComponent } from "./recruitments.component";
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from "@angular/forms";
import { Recruitment } from "src/app/types/recruitments";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

const COMPANY_NAME = "kompania"
const mockResponse = [
	{
		ownerId: 15,
		id: "15",
		companyName: COMPANY_NAME,
		workPlace: "workPlace",
		city: "city",
		notes: "notes",
		dateOfCompanyReply: "test",
		linkToApplication: "test"
	}
]


describe('RecruitmentsComponent', () => {
	let component: RecruitmentsComponent;
	let fixture: ComponentFixture<RecruitmentsComponent>;

	const mockRecruitments: Recruitment[] = [
		{
			ownerId: 15,
			id: "15",
			companyName: COMPANY_NAME,
			workPlace: "workPlace",
			city: "city",
			notes: "notes", 
			dateOfCompanyReply: "test",
			linkToApplication: "test"
		}
	];



	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [RecruitmentsComponent],
			imports: [HttpClientModule, HttpClientTestingModule, AngularMaterialModule, BrowserAnimationsModule, AppRoutingModule, ReactiveFormsModule],
			providers: [provideMockStore({ initialState: { recruitments: mockRecruitments, todoLists: [] } })]
		})
			.compileComponents();

		fixture = TestBed.createComponent(RecruitmentsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should show element from store in recruitments variable and in html structure', fakeAsync(() => {

		const httpMock = TestBed.inject(HttpTestingController);

		const req = httpMock.expectOne('http://localhost:5001/api/recruitment');
		req.flush(mockResponse);
		component.ngOnInit();
		tick();

		fixture.detectChanges();
		component.recruitments.subscribe({
			next: data => {
				expect(data.length).toBe(1)
				expect(data[0].companyName).toBe(COMPANY_NAME)
			}
		})


		expect(fixture.debugElement.nativeElement.textContent.includes(COMPANY_NAME)).toBeTruthy() 
	}));

});
