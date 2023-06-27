import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-pie-chart',
    templateUrl: './pie-chart.component.html',
    styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
    data: any;

    options: any;

    ngOnInit() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');

        this.data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        '#754ECF',
                        '#01A9F1',
                        '#f0ccff',

                        // documentStyle.getPropertyValue('--blue-500'),
                        // documentStyle.getPropertyValue('--yellow-500'),
                        // documentStyle.getPropertyValue('--green-500'),
                    ],
                    hoverBackgroundColor: ['#754ECF', '#01A9F1', '#f0ccff'],
                },
            ],
        };

        this.options = {
            cutout: '60%',
            plugins: {
                legend: {
                    labels: {
                        color: textColor,
                    },
                },
            },
        };
    }
}
