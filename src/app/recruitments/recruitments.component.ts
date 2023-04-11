import {Component, OnInit} from '@angular/core';
import {RecruitmentsService} from '../services/recruitments.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Recruitment} from '../types/recruitments';

type FormKeys = 'companyName' | 'workPlace' | 'notes' | 'dateOfCompanyReply'

@Component({
	selector: 'app-recruitments',
	templateUrl: './recruitments.component.html',
	styleUrls: ['./recruitments.component.scss']
})

export class RecruitmentsComponent implements OnInit {

	recruitmentsForm = new FormGroup({
		companyName: new FormControl('', [Validators.required]),
		workPlace: new FormControl('', [Validators.required]),
		notes: new FormControl('', [Validators.required]),
		dateOfCompanyReply: new FormControl('', [Validators.required])
	});
	recruitments: Recruitment[] = [];
	itemToEdit: Recruitment | undefined = undefined;

	constructor(private recruitmentsService: RecruitmentsService) {
	}

	ngOnInit() {
		this.recruitmentsService.get().subscribe({
			next: data => this.recruitments = data as Recruitment[]
		});
	}

	isFieldValidatedCorrectly(fieldName: FormKeys) {
		return !!this.recruitmentsForm.controls[fieldName].errors && this.recruitmentsForm.controls[fieldName].touched;
	}

	onSubmit() {
		this.recruitmentsForm.markAllAsTouched();
		if (this.recruitmentsForm.valid) {
			if (this.itemToEdit) {
				this.recruitmentsService.update(this.itemToEdit.id!, {...this.itemToEdit, ...this.recruitmentsForm.value} as Recruitment).subscribe();
			} else {
				this.recruitmentsService.create(this.recruitmentsForm.value as Recruitment).subscribe();
			}
		}
	}

	onCancel() {
		this.itemToEdit = undefined;
		this.recruitmentsForm.reset();
	}

	delete(id: string) {
		this.recruitmentsService.delete(id).subscribe();
	}

	edit(id: string) {
		const currentRecruitment = this.recruitments.find(i => i.id === id);
		if (currentRecruitment) {
			this.itemToEdit = currentRecruitment;
			this.recruitmentsForm.setValue({
				companyName: currentRecruitment.companyName,
				workPlace: currentRecruitment.workPlace,
				notes: currentRecruitment.notes,
				dateOfCompanyReply: currentRecruitment.dateOfCompanyReply
			});
		}
	}
}
