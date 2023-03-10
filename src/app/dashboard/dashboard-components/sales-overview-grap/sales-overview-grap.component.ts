import { Component, ViewChild, OnInit } from "@angular/core";
import {
	ApexAxisChartSeries,
	ApexChart,
	ChartComponent,
	ApexDataLabels,
	ApexXAxis,
	ApexPlotOptions
} from "ng-apexcharts";
import { Treatment } from "src/app/Entities/treatments";
import { PetService } from 'src/app/Services/pet.service';
export type ChartOptions = {
	series: ApexAxisChartSeries;
	chart: ApexChart;
	dataLabels: ApexDataLabels;
	plotOptions: ApexPlotOptions;
	xaxis: ApexXAxis;
};

@Component({
	selector: 'app-sales-overview-grap',
	templateUrl: './sales-overview-grap.component.html',
	styleUrls: ['./sales-overview-grap.component.css']
})
export class SalesOverviewGrapComponent implements OnInit {
	@ViewChild("chart") chart: ChartComponent | undefined;
	initialized: Boolean = false;
	// @ts-ignore: Object is possibly 'null'.

	public chartOptions: Partial<ChartOptions>;
	treatments: Treatment[] = [];

	ngOnInit() { this.getAllPets() }
	constructor(private petService: PetService) {
	}


	getAllPets() {
		this.petService.getAllTreatments().subscribe((data) => {
			this.treatments = data;
			let groupedList = this.groupByType(this.treatments)
			const result: string[] = [];
			const result2: number[] = [];
			Object.keys(groupedList).forEach((prop) => {
				result.push(prop);
				result2.push(groupedList[prop].length)
			});
			this.initChart(result2, result)
		})
	}
	groupByType(array: Treatment[]) {
		return array.reduce((r, a) => {

			// @ts-ignore: Object is possibly 'null'.
			r[a.type] = r[a.type] || [];
			// @ts-ignore: Object is possibly 'null'.

			a.type && r[a.type].push(a);

			return r;

		}, Object.create(null));
	}

	initChart(series: any[], labels: any[]) {
		this.chartOptions = {
			
			series: [
				{
					name: "basic",
					data: series
				}
			],
			chart: {
				type: "bar",
				height: 350
			},
			plotOptions: {
				bar: {
					horizontal: true
				}
			},
			dataLabels: {
				enabled: false
			},
			xaxis: {
				categories: labels,
			
			}
		};
		this.initialized = true
	}
}


