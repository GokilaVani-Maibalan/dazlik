import { CommonModule, NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpServicesService } from '../../../services/http-services.service';

@Component({
    selector: 'app-e-categories',
    standalone: true,
    imports: [
        MatCardModule,
        CommonModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        MatPaginatorModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
    ],
    templateUrl: './e-categories.component.html',
    styleUrl: './e-categories.component.scss',
})
export class ECategoriesComponent {
    selectedSection: number = 1;
    businessInfoOpen: boolean = false;
    businessInfoSection: number = 1;
    count: number = 0;
    vouchercount: number = 0;
    bookingcount: number = 0;
    limitcount: number = 0;
    selectedFormOption: any[] = [];
    isModalOpen = false;
    showOptions = [false, false, false, false, false];
    modalContentType: string | null = null;
    modalContentIndex: number = 0;
    selectedVoucherOption: string | null = null;
    futureDate: string = '';
    selectedPhotoOption: string | null = null;
    calculateFutureDate() {
        const today = new Date();
        const future = new Date(today);
        future.setDate(today.getDate() + 2);

        this.futureDate = this.formatDate(future);
    }

    formatDate(date: Date): string {
        const day = ('0' + date.getDate()).slice(-2);
        const month = ('0' + (date.getMonth() + 1)).slice(-2);
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    }

    toggleOptions(index: number) {
        this.showOptions[index] = !this.showOptions[index];
    }
    onOptionClick(option: string) {
        console.log(option);
    }
    onValidOptionClick(option: string) {
        console.log(option);
    }
    onNextClick() {
        if (this.selectedSection === 8) {
            this.saveToDatabase();
            // this.selectedSection++;
            this.router.navigate(['/ecommerce-page']);
        }
        if (this.selectedSection === 1) {
            this.storeInput('options', this.selectedFormOption);
            this.selectedSection++;
        } else {
            this.selectedSection++;
        }
    }

    onPrevClick() {
        if (this.selectedSection > 1) {
            this.selectedSection--;
        }
    }

    onPrevInfoClick() {
        if (this.businessInfoSection === 1) {
            this.selectedSection--;
        } else {
            this.businessInfoSection--;
        }
    }
    onNextInfoClick() {
        if (this.businessInfoSection === 5) {
            this.selectedSection++;
        } else {
            this.businessInfoSection++;
        }
    }

    onVoucherOptionSelect(option: string): void {
        console.log(option);
        this.selectedVoucherOption = option;
        console.log(this.selectedVoucherOption);
    }

    constructor(
        private route: ActivatedRoute,
        private supabaseService: HttpServicesService,
        private router: Router
    ) {}

    selectedFormName: string | null = null;
    ngOnInit(): void {
        this.calculateFutureDate();
        this.route.paramMap.subscribe((params) => {
            const optionString = params.get('selectedFormOption');
            const nameString = params.get('selectedFormName');
            if (optionString) {
                this.selectedFormOption = JSON.parse(optionString);
            }
            if (nameString) {
                this.selectedFormName = nameString;
            }
            console.log(this.selectedFormName);
        });
        this.storeInput('name', this.selectedFormName);
    }

    openModal(type: string, index: number): void {
        this.modalContentType = type;
        this.modalContentIndex = index;
        this.isModalOpen = true;
    }

    closeModal(): void {
        this.isModalOpen = false;
        this.modalContentType = null;
    }

    removeModal(): void {
        this.selectedFormOption.splice(this.modalContentIndex, 1);
        this.isModalOpen = false;
        alert('Option removed');
        this.modalContentType = null;
    }

    onPhotoSelect(option: string): void {
        this.selectedPhotoOption = option;
        console.log(this.selectedPhotoOption);
    }
    onHelpClick() {
        alert('Help clicked');
    }

    onPreviewClick() {
        alert('Preview clicked');
    }

    onSaveExitClick() {
        alert('Save & Exit clicked');
    }

    increment() {
        this.count++;
    }

    decrement() {
        if (this.count > 0) {
            this.count--;
        }
    }

    incrementLimit() {
        this.limitcount++;
    }

    decrementLimit() {
        if (this.limitcount > 0) {
            this.limitcount--;
        }
    }

    decrementBookingOption() {
        if (this.bookingcount > 0) {
            this.bookingcount--;
        }
    }
    incrementBookingOption() {
        this.bookingcount++;
    }

    incrementvoucher() {
        this.vouchercount++;
    }

    decrementvoucher() {
        if (this.vouchercount > 0) {
            this.vouchercount--;
        }
    }

    selectSection(section: number): void {
        this.selectedSection = section;
    }

    toggleBusinessInfo() {
        this.businessInfoOpen = !this.businessInfoOpen;
    }

    selectBusinessInfo(info: number) {
        this.businessInfoSection = info;
    }

    storedInputs: { [key: string]: any } = { selectedCheckboxes: [] };

    storeInput(key: string, value: any): void {
        this.storedInputs[key] = value;
        console.log(this.storedInputs);
    }

    toggleCheckbox(option: string) {
        if (this.storedInputs['selectedCheckboxes'].includes(option)) {
            this.storedInputs['selectedCheckboxes'] = this.storedInputs[
                'selectedCheckboxes'
            ].filter((item: any) => item !== option);
        } else {
            this.storedInputs['selectedCheckboxes'].push(option);
        }
    }

    //Photo upload
    uploadedPhotos: { src: string | ArrayBuffer | null; main: boolean }[] = [];

    onFileSelected(event: any): void {
        const file = event.target.files[0];
        this.readFile(file);
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        const file = event.dataTransfer?.files[0];
        if (file) {
            this.readFile(file);
        }
    }

    onDragOver(event: DragEvent): void {
        event.preventDefault();
    }

    readFile(file: File): void {
        const reader = new FileReader();
        reader.onload = (e: any) => {
            const photo = {
                src: e.target.result,
                main: this.uploadedPhotos.length === 0,
            };
            this.uploadedPhotos.push(photo);
            this.storeInput('photos', this.uploadedPhotos);
        };
        reader.readAsDataURL(file);
    }

    setAsMainPhoto(index: number): void {
        this.uploadedPhotos.forEach((photo, i) => (photo.main = i === index));
        this.storeInput('photos', this.uploadedPhotos);
    }

    deletePhoto(index: number): void {
        this.uploadedPhotos.splice(index, 1);
        this.storeInput('photos', this.uploadedPhotos);
    }

    async saveToDatabase(): Promise<void> {
        const data = {
            name: this.storedInputs['name'],
            voucher: this.storedInputs['voucher'],
            website: this.storedInputs['website'],
            highlights: this.storedInputs['highlights'],
            repurchase: this.storedInputs['repurchase'],
            description: this.storedInputs['description'],
            businessdesc: this.storedInputs['businessdesc'],
            Checkboxes: this.storedInputs['selectedCheckboxes'],
            options: this.storedInputs['options'],
            photos: this.storedInputs['photos'],
        };

        try {
            const response = await this.supabaseService.saveInputs(data);
            console.log('Data saved successfully:', response);
        } catch (error) {
            console.error('Error saving data:', error);
        }
    }
}
