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
import { FileUploadModule } from '@iplab/ngx-file-upload';
import { NgxEditorModule, Editor, Toolbar } from 'ngx-editor';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { HttpServicesService } from '../../../services/http-services.service';
import { NgClass, NgFor, NgIf } from '@angular/common';

import { NavbarComponent } from '../../../common/navbar/navbar.component';

@Component({
    selector: 'app-e-create-category',
    standalone: true,
    imports: [
        MatCardModule,
        NavbarComponent,
        NgIf,
        MatMenuModule,
        NgClass,
        NgFor,
        MatButtonModule,
        RouterLink,
        FormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        FileUploadModule,
        NgxEditorModule,
    ],
    templateUrl: './e-create-category.component.html',
    styleUrl: './e-create-category.component.scss',
})
export class ECreateCategoryComponent {
    currentPage: number = 0;
    totalPages: number = 5;
    selectedTab: number | null = null;
    selectedTabItems: any[] = [];
    nextClicked: boolean = false;
    hoveredTab: number | null = null;
    selectedOther: boolean = false;
    selectedOption: boolean[] = [];
    availedServices: any[] = [];

    selectItem(service: any) {
        if (!this.selectedTabItems.includes(service)) {
            this.selectedTabItems.push(service);
        } else {
            this.deselectTab(service);
        }
    }

    deselectTab(tab: any) {
        this.selectedTabItems = this.selectedTabItems.filter((t) => t !== tab);
    }

    isTabSelected(tab: any): boolean {
        return this.selectedTabItems.includes(tab);
    }

    selectOption(index: number): void {
        this.selectedOption[index] = true;
        this.availedServices = this.selectedOption.filter(
            (item) => item === true
        );
    }

    deselectOption(index: number): void {
        this.selectedOption[index] = false;
        this.availedServices = this.selectedOption.filter(
            (item) => item === true
        );
    }
    toggleOption(index: number): void {
        this.selectedOption[index] = !this.selectedOption[index];
    }

    handleAddServiceClick() {
        this.changePage(2);
    }

    changePage(pageNumber: number) {
        this.currentPage = pageNumber;
    }
    selectTab(index: number): void {
        this.selectedTab = index;
        this.selectedOther = false;
    }

    selectOtherTab(): void {
        this.selectedTab = null;
        this.selectedOther = true;
    }

    hoverTab(index: number | null): void {
        this.hoveredTab = index;
    }
    previous(): void {
        if (this.currentPage > 0) {
            this.currentPage--;
            this.nextClicked = false;
        }
        if (this.selectedTabItems.length != 0) {
            this.selectedTabItems = [];
        }
    }

    next(): void {
        if (this.currentPage < this.totalPages - 1) {
            this.currentPage++;
            this.nextClicked = true;
        }
    }
    searchTerm: string = '';
    showSuggestions: boolean = false;
    suggestions: string[] = [
        'Apple',
        'Banana',
        'Cherry',
        'Date',
        'Elderberry',
        'Fig',
        'Grape',
        'Honeydew',
        'Kiwi',
        'Lemon',
    ];
    filteredSuggestions: string[] = [];
    selectedItems: string[] = [];

    continue(): void {
        const selectedOptions = this.selectedLevel3Items.filter(
            (tab, index) => this.selectedOption[index]
        );
        this.router.navigate(['/ecommerce-page/checkout'], {
            state: { selectedOptions },
        });
        console.log(selectedOptions);
    }

    onInputChange(): void {
        this.filteredSuggestions = this.suggestions.filter((suggestion) =>
            suggestion.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
        this.showSuggestions = this.searchTerm.length > 0;
    }

    selectSuggestion(suggestion: string): void {
        this.selectedItems.push(suggestion);
        this.searchTerm = '';
        this.showSuggestions = false;
    }

    services: any[] = [];
    selectedLevel2Items: any[] = [];
    selectedOptions: any[] = [];

    selectedLevel3Items: any[] = [];
    constructor(
        private supabaseService: HttpServicesService,
        private router: Router,
        private dialog: MatDialog
    ) {
        this.selectedOption = new Array(this.selectedLevel3Items.length).fill(
            false
        );
    }

    ngOnInit() {
        this.loadItems();
    }

    async loadItems() {
        this.services = (await this.supabaseService.getItems()) || [];
    }

    async level2_services(service_name: string) {
        this.selectedLevel2Items =
            (await this.supabaseService.getLevel2Services(service_name)) || [];
    }

    async options(level2_service_name: string) {
        this.selectedOptions =
            (await this.supabaseService.getOptions(level2_service_name)) || [];
        this.selectedOptions.forEach((item) => {
            this.selectedLevel3Items.push(item);
        });
    }

    modalOpen = false;

    openModal(): void {
        this.modalOpen = true;
    }

    closeModal(): void {
        this.modalOpen = false;
    }
}
