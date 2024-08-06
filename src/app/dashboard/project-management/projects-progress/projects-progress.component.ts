import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

import {
    ChartComponent,
    ApexNonAxisChartSeries,
    ApexResponsive,
    ApexChart,
    ApexLegend,
    NgApexchartsModule,
    ApexDataLabels,
    ApexTooltip,
} from 'ng-apexcharts';
import { HttpServicesService } from '../../../services/http-services.service';

export type ChartOptions = {
    series: ApexNonAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    legend: ApexLegend;
    responsive: ApexResponsive[];
    labels: any;
    tooltip: ApexTooltip;
    colors: string[];
};

@Component({
    selector: 'app-projects-progress:not(p)',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        NgApexchartsModule,
    ],
    templateUrl: './projects-progress.component.html',
    styleUrl: './projects-progress.component.scss',
})
export class ProjectsProgressComponent {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor(private supabaseService: HttpServicesService) {
        this.chartOptions = {
            series: [],
            chart: {
                height: 450,
                type: 'donut',
            },
            labels: [
                'New Customers',
                'Returning Customers',
                'Current Customers',
            ],
            legend: {
                offsetY: 11,
                fontSize: '14px',
                position: 'bottom',
                horizontalAlign: 'center',
                labels: {
                    colors: '#919aa3',
                },
                itemMargin: {
                    horizontal: 12,
                    vertical: 7,
                },
            },
            dataLabels: {
                enabled: false,
                style: {
                    fontSize: '14px',
                },
                dropShadow: {
                    enabled: false,
                },
            },
            colors: ['#00cae3', '#0e7aee', '#796df6'],
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + '%';
                    },
                },
            },
        };
    }

    async ngOnInit() {
        try {
            const customerData = await this.supabaseService.getCustomerData();
            this.updateChartOptions(customerData);
        } catch (error) {
            console.error('Error fetching customer data:', error);
        }
    }

    updateChartOptions(data: any[]) {
        const newCustomers = data
            .filter((d) => d.type === 'new')
            .reduce((sum: number, d: any) => sum + d.count, 0);

        const returningCustomers = data
            .filter((d) => d.type === 'returning')
            .reduce((sum: number, d: any) => sum + d.count, 0);

        const currentCustomers = data
            .filter((d) => d.type === 'current')
            .reduce((sum: number, d: any) => sum + d.count, 0);

        this.chartOptions.series = [
            newCustomers,
            returningCustomers,
            currentCustomers,
        ];
        console.log(this.chartOptions.series);
    }
}
