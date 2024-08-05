import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

import {
    ApexAxisChartSeries,
    ApexChart,
    ChartComponent,
    ApexDataLabels,
    ApexPlotOptions,
    ApexYAxis,
    ApexLegend,
    ApexStroke,
    ApexXAxis,
    ApexFill,
    ApexTooltip,
    NgApexchartsModule,
    ApexGrid,
} from 'ng-apexcharts';

export type ChartOptions = {
    series: ApexAxisChartSeries;
    chart: ApexChart;
    dataLabels: ApexDataLabels;
    plotOptions: ApexPlotOptions;
    yaxis: ApexYAxis;
    xaxis: ApexXAxis;
    colors: string[];
    grid: ApexGrid;
    fill: ApexFill;
    tooltip: ApexTooltip;
    stroke: ApexStroke;
    legend: ApexLegend;
};

@Component({
    selector: 'app-projects-analysis',
    standalone: true,
    imports: [
        MatCardModule,
        MatMenuModule,
        MatButtonModule,
        RouterLink,
        NgApexchartsModule,
    ],
    templateUrl: './projects-analysis.component.html',
    styleUrl: './projects-analysis.component.scss',
})
export class ProjectsAnalysisComponent {
    @ViewChild('chart') chart: ChartComponent;
    public chartOptions: Partial<ChartOptions>;

    constructor() {
        this.chartOptions = {
            series: [
                {
                    name: 'Age',
                    data: [30, 50, 27, 16],
                },
            ],
            chart: {
                type: 'bar',
                height: 380,
                toolbar: {
                    show: false,
                },
            },
            plotOptions: {
                bar: {
                    columnWidth: '65%',
                },
            },
            dataLabels: {
                enabled: false,
            },
            colors: ['#873e23'],
            stroke: {
                width: 2,
                show: true,
                colors: ['transparent'],
            },
            xaxis: {
                categories: ['Under 25', '25-35', '35-50', '50+'],
                axisBorder: {
                    show: false,
                    color: '#e0e0e0',
                },
                axisTicks: {
                    show: true,
                    color: '#e0e0e0',
                },
                labels: {
                    show: true,
                    style: {
                        colors: '#919aa3',
                        fontSize: '14px',
                    },
                },
            },
            yaxis: {
                labels: {
                    show: true,
                    style: {
                        colors: '#919aa3',
                        fontSize: '14px',
                    },
                },
            },
            fill: {
                opacity: 1,
            },
            grid: {
                strokeDashArray: 5,
                borderColor: '#e0e0e0',
            },
            legend: {
                offsetY: 0,
                position: 'top',
                fontSize: '14px',
                horizontalAlign: 'center',
                labels: {
                    colors: '#919aa3',
                },
                itemMargin: {
                    horizontal: 10,
                    vertical: 0,
                },
            },
        };
    }
}
