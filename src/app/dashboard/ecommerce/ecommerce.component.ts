import { Component } from '@angular/core';
import { TotalSalesComponent } from './total-sales/total-sales.component';
import { TotalRevenueComponent } from './total-revenue/total-revenue.component';
import { TotalCustomersComponent } from './total-customers/total-customers.component';
import { SalesOverviewComponent } from './sales-overview/sales-overview.component';
import { TotalOrdersComponent } from './total-orders/total-orders.component';
import { TopSellingProductsComponent } from './top-selling-products/top-selling-products.component';
import { TransactionsHistoryComponent } from './transactions-history/transactions-history.component';
import { RecentOrdersComponent } from './recent-orders/recent-orders.component';
import { TopSellersComponent } from './top-sellers/top-sellers.component';
import { OrderSummaryComponent } from './order-summary/order-summary.component';
import { RevenueComponent } from './revenue/revenue.component';
import { TopSalesLocationsComponent } from './top-sales-locations/top-sales-locations.component';
import { AverageDailySalesComponent } from './average-daily-sales/average-daily-sales.component';
import { ProfitComponent } from './profit/profit.component';
import { BestSellerOfTheMonthComponent } from './best-seller-of-the-month/best-seller-of-the-month.component';
import { NewCustomersThisMonthComponent } from './new-customers-this-month/new-customers-this-month.component';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AllProjectsComponent } from './all-projects/all-projects.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { CustomizerSettingsService } from '../../customizer-settings/customizer-settings.service';
@Component({
    selector: 'app-ecommerce',
    standalone: true,
    imports: [
        RouterOutlet,
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        TotalSalesComponent,
        AllProjectsComponent,
        RouterLinkActive,
        TotalRevenueComponent,
        TotalOrdersComponent,
        TotalCustomersComponent,
        SalesOverviewComponent,
        TopSellingProductsComponent,
        TransactionsHistoryComponent,
        RecentOrdersComponent,
        TopSellersComponent,
        OrderSummaryComponent,
        RevenueComponent,
        TopSalesLocationsComponent,
        AverageDailySalesComponent,
        ProfitComponent,
        BestSellerOfTheMonthComponent,
        NewCustomersThisMonthComponent,
        RouterLink,
    ],
    templateUrl: './ecommerce.component.html',
    styleUrl: './ecommerce.component.scss',
})
export class EcommerceComponent {
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
