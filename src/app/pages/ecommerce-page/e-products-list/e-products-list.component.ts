import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { HttpServicesService } from '../../../services/http-services.service';
@Component({
    selector: 'app-ecommerce-page',
    standalone: true,
    imports: [
        RouterOutlet,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatTableModule,
        NgIf,
        MatCheckboxModule,
        MatTooltipModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatPaginatorModule,
    ],

    templateUrl: './e-products-list.component.html',
    styleUrl: './e-products-list.component.scss',
})
export class EProductsListComponent {
    displayedColumns: string[] = [
        'select',
        'campaignID',
        'name',

        'startDate',
        'dueDate',
        'sold',
        'redeemed',
        'action',
    ];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    selection = new SelectionModel<PeriodicElement>(true, []);

    @ViewChild(MatPaginator) paginator: MatPaginator;
    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }
    /** Whether the number of selected elements matches the total number of rows. */
    isAllSelected() {
        const numSelected = this.selection.selected.length;
        const numRows = this.dataSource.data.length;
        return numSelected === numRows;
    }

    /** Selects all rows if they are not all selected; otherwise clear selection. */
    toggleAllRows() {
        if (this.isAllSelected()) {
            this.selection.clear();
            return;
        }
        this.selection.select(...this.dataSource.data);
    }

    /** The label for the checkbox on the passed row */
    checkboxLabel(row?: PeriodicElement): string {
        if (!row) {
            return `${this.isAllSelected() ? 'deselect' : 'select'} all`;
        }
        return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${
            row.id + 1
        }`;
    }

    // Search Filter
    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    // Popup Trigger
    classApplied = false;
    toggleClass() {
        this.classApplied = !this.classApplied;
    }

    constructor(
        public themeService: CustomizerSettingsService,
        private supabaseService: HttpServicesService
    ) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // isToggled
    isToggled = false;

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }

    ngOnInit() {
        this.fetchData();
    }

    async fetchData() {
        try {
            const dataInputs = await this.supabaseService.getInputs();
            const elements = dataInputs.map((data) => ({
                id: data.id,
                name: data.name,
                highlights: data.highlights,
                description: data.description,
                details: data.details,
                dueDate: data.end_date,
                startDate: '2024-06-20',
                sold: 40,
                redeemed: 12,
                action: {
                    view: 'visibility',
                    edit: 'edit',
                    delete: 'delete',
                },
                isActive: data.isActive,
            }));
            this.dataSource.data = elements;
            console.log('Data fetched successfully:', this.dataSource.data);
        } catch (error) {
            console.error('Error fetching security users:', error);
        }
    }

    //delete user

    async deleteUser(id: any) {
        try {
            const deleted = await this.supabaseService.updateInput(id);

            // Update dataSource after successful deletion
            this.dataSource.data = this.dataSource.data.filter(
                (user) => user.isActive === true
            );
            console.log(`User with ID ${id} deleted successfully.`);
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    }
}

const ELEMENT_DATA: PeriodicElement[] = [];

export interface PeriodicElement {
    id: number;
    name: string;
    highlights: string;
    description: string;
    details: any;
    dueDate: string;
    startDate: string;
    action: any;
    sold: number;
    redeemed: number;
    isActive: boolean;
}
