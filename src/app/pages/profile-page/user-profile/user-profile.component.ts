import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { AllProjectsComponent } from '../../../dashboard/ecommerce/all-projects/all-projects.component';
import { RecentActivityComponent } from './recent-activity/recent-activity.component';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TotalOrdersComponent } from '../../../dashboard/ecommerce/total-orders/total-orders.component';
import { TotalCustomersComponent } from '../../../dashboard/ecommerce/total-customers/total-customers.component';
import { TotalRevenueComponent } from '../../../dashboard/ecommerce/total-revenue/total-revenue.component';
import { TotalSalesComponent } from '../../../dashboard/ecommerce/total-sales/total-sales.component';

@Component({
    selector: 'app-user-profile',
    standalone: true,
    imports: [
        RouterLink,
        MatCardModule,
        MatButtonModule,
        MatMenuModule,
        AllProjectsComponent,
        RecentActivityComponent,
        TotalOrdersComponent,
        TotalCustomersComponent,
        TotalRevenueComponent,
        AllProjectsComponent,
        TotalSalesComponent,
    ],
    templateUrl: './user-profile.component.html',
    styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent {
    // isToggled
    isToggled = false;

    constructor(public themeService: CustomizerSettingsService) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // Dark Mode
    toggleTheme() {
        this.themeService.toggleTheme();
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
