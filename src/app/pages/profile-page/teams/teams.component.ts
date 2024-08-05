import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { CustomizerSettingsService } from '../../../customizer-settings/customizer-settings.service';
import { TotalOrdersComponent } from '../../../dashboard/ecommerce/total-orders/total-orders.component';
import { TotalCustomersComponent } from '../../../dashboard/ecommerce/total-customers/total-customers.component';
import { TotalRevenueComponent } from '../../../dashboard/ecommerce/total-revenue/total-revenue.component';
import { AllProjectsComponent } from '../../../dashboard/ecommerce/all-projects/all-projects.component';
import { TotalSalesComponent } from '../../../dashboard/ecommerce/total-sales/total-sales.component';
@Component({
    selector: 'app-teams',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        MatProgressBarModule,
        TotalOrdersComponent,
        TotalCustomersComponent,
        TotalRevenueComponent,
        AllProjectsComponent,
        TotalSalesComponent,
    ],
    templateUrl: './teams.component.html',
    styleUrl: './teams.component.scss',
})
export class TeamsComponent {
    // isToggled
    isToggled = false;

    constructor(public themeService: CustomizerSettingsService) {
        this.themeService.isToggled$.subscribe((isToggled) => {
            this.isToggled = isToggled;
        });
    }

    // RTL Mode
    toggleRTLEnabledTheme() {
        this.themeService.toggleRTLEnabledTheme();
    }
}
