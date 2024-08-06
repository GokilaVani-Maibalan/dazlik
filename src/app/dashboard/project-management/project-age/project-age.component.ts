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
    constructor(private supabaseService: HttpServicesService) {
        this.chartOptions = {
            series: [],
            chart: {
                type: 'donut',
                height: 450,
            },
            labels: [],
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
            colors: ['#669900', '#c4ff4d'], // Adjust colors based on your needs
            tooltip: {
                y: {
                    formatter: function (val) {
                        return val + '%';
                    },
                },
            },
        };
    }

    ngOnInit() {
        this.loadGenderData();
    }

    async loadGenderData() {
        try {
            const data = await this.supabaseService.getGenderDistribution();
            if (data.length) {
                this.updateChartOptions(data);
            }
        } catch (error) {
            console.error('Error loading gender data:', error);
        }
    }

    updateChartOptions(data: any[]) {
        const maleCount = data.find((d) => d.gender === 'Male')?.count || 0;
        const femaleCount = data.find((d) => d.gender === 'Female')?.count || 0;

        this.chartOptions.series = [maleCount, femaleCount];
        this.chartOptions.labels = ['Male', 'Female'];

        if (this.chart) {
            this.chart.updateOptions(this.chartOptions);
        }
    }
}
