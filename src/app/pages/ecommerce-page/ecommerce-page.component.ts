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
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
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

    templateUrl: './ecommerce-page.component.html',
    styleUrl: './ecommerce-page.component.scss',
})
export class EcommercePageComponent {
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

    constructor(public themeService: CustomizerSettingsService) {
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
}

const ELEMENT_DATA: PeriodicElement[] = [
    {
        id: 11234,
        name: 'American Food',
        highlights: 'Food with american styles',
        description: 'This is the first campaign',

        details: [
            {
                id: 1,
                option_name: 'Breakfast or lunch Mon-Fri',
                price: {
                    regular_price: '$50',
                    discount_price: '$20',
                    discount: '45%',
                    monthly_voucher: 50,
                },
            },
        ],
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
        dueDate: '27-07-2024',
        startDate: '27-06-2024',
        sold: 20,
        redeemed: 14,
    },
    {
        id: 27146,
        name: ' Indian Cuisine',
        highlights: 'Food with Indian styles',
        description: 'This is the second campaign',

        details: [
            {
                id: 1,
                option_name: 'Breakfast or lunch Mon-Fri',
                price: {
                    regular_price: '$50',
                    discount_price: '$20',
                    discount: '45%',
                    monthly_voucher: 50,
                },
            },
            {
                id: 2,
                option_name: 'Breakfast or lunch Sat,Sun',
                price: {
                    regular_price: '$70',
                    discount_price: '$20',
                    discount: '25%',
                    monthly_voucher: 30,
                },
            },
        ],
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
        dueDate: '30-07-2024',
        startDate: '27-06-2024',
        sold: 30,
        redeemed: 17,
    },
    {
        id: 36418,
        name: ' Chinese Cuisine',
        highlights: 'Food with Chinese styles',
        description: 'This is the third campaign',

        details: [
            {
                id: 1,
                option_name: 'Breakfast or lunch Mon-Fri',
                price: {
                    regular_price: '$50',
                    discount_price: '$20',
                    discount: '45%',
                    monthly_voucher: 50,
                },
            },
        ],
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
        dueDate: '28-07-2024',
        startDate: '27-06-2024',
        sold: 15,
        redeemed: 3,
    },
    {
        id: 47410,
        name: ' Spanish Cuisine',
        highlights: 'Food with Spanish styles',
        description: 'This is the fourth campaign',

        details: [
            {
                id: 1,
                option_name: 'Breakfast or lunch Mon-Fri',
                price: {
                    regular_price: '$70',
                    discount_price: '$20',
                    discount: '25%',
                    monthly_voucher: 30,
                },
            },
            {
                id: 2,
                option_name: 'Breakfast or lunch Sat,Sun',
                price: {
                    regular_price: '$30',
                    discount_price: '$20',
                    discount: '15%',
                    monthly_voucher: 50,
                },
            },
            {
                id: 3,
                option_name: 'Breakfast or lunch Sat,Sun',
                price: {
                    regular_price: '$70',
                    discount_price: '$20',
                    discount: '25%',
                    monthly_voucher: 30,
                },
            },
        ],
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
        dueDate: '28-07-2024',
        startDate: '27-06-2024',
        sold: 10,
        redeemed: 2,
    },
    {
        id: 56419,
        name: ' Micro Needling',
        highlights: 'Makeup',
        description: 'This is the fifth campaign',

        details: [
            {
                id: 1,
                option_name: 'Breakfast or lunch Mon-Fri',
                price: {
                    regular_price: '$70',
                    discount_price: '$20',
                    discount: '25%',
                    monthly_voucher: 30,
                },
            },
            {
                id: 2,
                option_name: 'Breakfast or lunch Sat,Sun',
                price: {
                    regular_price: '$30',
                    discount_price: '$20',
                    discount: '15%',
                    monthly_voucher: 50,
                },
            },
        ],
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
        dueDate: '23-07-2024',
        startDate: '27-06-2024',
        sold: 10,
        redeemed: 4,
    },
    {
        id: 63498,
        name: ' Permanent MAKEUP',
        highlights: 'Makeup permanently',
        description: 'This is the sixth campaign',

        details: [
            {
                id: 1,
                option_name: 'Breakfast or lunch Mon-Fri',
                price: {
                    regular_price: '$30',
                    discount_price: '$20',
                    discount: '15%',
                    monthly_voucher: 50,
                },
            },
            {
                id: 2,
                option_name: 'Breakfast or lunch Sat,Sun',
                price: {
                    regular_price: '$70',
                    discount_price: '$20',
                    discount: '25%',
                    monthly_voucher: 30,
                },
            },
        ],
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
        dueDate: '29-07-2024',
        startDate: '27-06-2024',
        sold: 20,
        redeemed: 15,
    },
    {
        id: 74238,
        name: ' Indian Cuisine',
        highlights: 'Food with Indian styles',
        description: 'This is the sevent campaign',

        details: [
            {
                id: 1,
                option_name: 'Breakfast or lunch Mon-Fri',
                price: {
                    regular_price: '$70',
                    discount_price: '$20',
                    discount: '25%',
                    monthly_voucher: 30,
                },
            },
        ],
        action: {
            view: 'visibility',
            edit: 'edit',
            delete: 'delete',
        },
        dueDate: '27-07-2024',
        startDate: '27-06-2024',
        sold: 10,
        redeemed: 6,
    },
];

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
}
