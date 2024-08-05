import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { HttpServicesService } from '../../../services/http-services.service';

@Component({
    selector: 'app-e-checkout',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        NgFor,
        NgIf,
        CommonModule,
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
    ],
    templateUrl: './e-checkout.component.html',
    styleUrl: './e-checkout.component.scss',
})
export class ECheckoutComponent {
    currentPage: number = 0;
    totalPages: number = 2;
    nextClicked: boolean = false;

    selectedOptions: any[] = [];

    templateOption: string | null = null;

    selectedFormOption: string | null = null;

    constructor(
        private router: Router,
        private supabaseService: HttpServicesService
    ) {}

    ngOnInit(): void {
        this.selectedOptions = history.state.selectedOptions || [];
    }

    onOptionClick(option: string): void {
        this.templateOption = option;
        this.fetchData(option);
    }

    selectedTemplateOptions: any[] = [];

    async fetchData(option: string) {
        this.selectedTemplateOptions =
            (await this.supabaseService.getTemplateOptions(option)) || [];
        console.log(this.selectedTemplateOptions);
    }

    previous(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.nextClicked = false;
        }
    }

    next(): void {
        if (this.currentPage == 0) {
            this.currentPage++;
            this.nextClicked = true;
        } else if (this.selectedFormOption) {
            console.log(this.selectedFormOption);
            this.router.navigate([
                '/ecommerce-page/categories',
                {
                    selectedFormOption: JSON.stringify(this.selectedFormOption),
                    selectedFormName: this.selectedFormName,
                },
            ]);
        }
    }

    selectedFormName: string | null = null;
    modalOpen = false;

    openModal(): void {
        this.modalOpen = true;
    }

    closeModal(): void {
        this.modalOpen = false;
    }

    onFormOptionSelect(option: string, name: string): void {
        this.selectedFormOption = option;
        this.selectedFormName = name;
        this.next();
    }
}
