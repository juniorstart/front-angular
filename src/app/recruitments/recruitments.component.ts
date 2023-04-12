import {Component, OnInit} from '@angular/core';
import {RecruitmentsService} from '../services/recruitments.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Recruitment} from '../types/recruitments';
import {AppState} from '../types/appState';
import {select, Store} from '@ngrx/store';
import * as RecruitmentsActions from "../store/actions/recruitments.action"
import {recruitmentsSelector} from '../store/selectors/recruitments.selectors';
import { Observable } from 'rxjs';

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
	recruitments: Observable<Recruitment[]>;
	itemToEdit: Recruitment | undefined = undefined;

	constructor(private recruitmentsService: RecruitmentsService, private store: Store<AppState>) {
	}

	ngOnInit() {
		this.recruitmentsService.get().subscribe({
			next: data => {
				this.recruitments = this.store.pipe(select(recruitmentsSelector))
				this.store.dispatch(RecruitmentsActions.setRecruitments({recruitments: data as Recruitment[]}))
			}
		});
	}

	isFieldValidatedCorrectly(fieldName: FormKeys) {
		return !!this.recruitmentsForm.controls[fieldName].errors && this.recruitmentsForm.controls[fieldName].touched;
	}

	onSubmit() {
		if (this.recruitmentsForm.valid) {
			if (this.itemToEdit) {
				const editedRecruitment = {...this.itemToEdit, ...this.recruitmentsForm.value} as Recruitment
				this.recruitmentsService.update(this.itemToEdit.id!, editedRecruitment).subscribe({
					next: () => {
						this.store.dispatch(RecruitmentsActions.updateRecruitment({id: this.itemToEdit!.id!, recruitment: editedRecruitment}))
					}
				});
			} else {
				this.recruitmentsService.create(this.recruitmentsForm.value as Recruitment).subscribe({
					next: (data) => {
						this.store.dispatch(RecruitmentsActions.addRecruitment({ recruitment: data as Recruitment}))
					}
				});
			}
		} else {
			this.recruitmentsForm.markAllAsTouched();
		}
	}

	onCancel() {
		this.itemToEdit = undefined;
		this.recruitmentsForm.reset();
	}

	delete(id: string) {
		this.recruitmentsService.delete(id).subscribe({
			next: () => {
				this.store.dispatch(RecruitmentsActions.deleteRecruitment({id}))
			}
		});
	}

	edit(id: string) {
		this.recruitments.subscribe({
			next: recs => {
				const currentRecruitment = recs.find(i => i.id === id)
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
		})
	}
}
