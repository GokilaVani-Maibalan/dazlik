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
    selector: 'app-project-age',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        NgApexchartsModule,
    ],
    templateUrl: './project-age.component.html',
    styleUrl: './project-age.component.scss',
})
export class ProjectAgeComponent {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [70, 30],
            chart: {
                height: 450,
                type: 'donut',
            },
            labels: ['Male', 'Female'],
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
            colors: ['#669900', '#c4ff4d'],
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + '%';
                    },
                },
            },
        };
    }
}
