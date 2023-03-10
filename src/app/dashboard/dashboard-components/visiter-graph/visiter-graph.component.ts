import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as Chartist from 'chartist';
import { ChartType, ChartEvent } from 'ng-chartist';
import { Pets } from 'src/app/Entities/pets';
import { PetService } from 'src/app/Services/pet.service';
import { ChartComponent } from "ng-apexcharts";
import {
	ApexNonAxisChartSeries,
	ApexResponsive,
	ApexChart
} from "ng-apexcharts";

declare var require: any;


export type ChartOptions = {
	series: ApexNonAxisChartSeries;
	chart: ApexChart;
	responsive: ApexResponsive[];
	labels: any;
};



@Component({
	selector: 'app-visiter-graph',
	templateUrl: './visiter-graph.component.html',
	styleUrls: ['./visiter-graph.component.css']
})
export class VisiterGraphComponent implements OnInit {

	pets: Pets[] = [];
	@ViewChild("chart") chart: ChartComponent | undefined;
	initialized: Boolean = false;
	// @ts-ignore: Object is possibly 'null'.

	public chartOptions: Partial<ChartOptions>;

	constructor(private petService: PetService) {
	}

	ngOnInit(): void {
		this.getAllPets();
	}

	getAllPets(): any {
		this.petService.getAllPets().subscribe((data) => {
			this.pets = data;
			this.groupByType(this.pets);
			let groupedList = this.groupByType(this.pets)
			const result: string[] = [];
			const result2: number[] = [];

			Object.keys(groupedList).forEach((prop) => {
				result.push(prop);
				result2.push(groupedList[prop].length)
			});

			this.initChart(result2, result)
			return { series: result2, labels: result }

		})
	}
	groupByType(array: Pets[]) {
		return array.reduce((r, a) => {
			// @ts-ignore: Object is possibly 'null'.
			r[a.category] = r[a.category] || [];
			// @ts-ignore: Object is possibly 'null'.
			r[a.category].push(a);
			return r;
		}, Object.create(null));
	}

	initChart(series: any[], labels: any[]) {
		this.chartOptions = {
			series: series,
			chart: {
				width: 380,
				type: "pie",
			},
			labels: labels,
			responsive: [
				{
					breakpoint: 480,
					options: {
						chart: {
							width: 200
						},
						legend: {
							position: "bottom"
						}
					}
				}
			]
		};
		this.initialized = true
	}

}
