import { Component, OnInit } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  profits!: echarts.EChartsOption ;

  constructor(){}
  ngOnInit(): void {
    this.profits = {
      title: {
        text: 'Tổng doanh thu: 1000000',
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985',
          },
        },
      },
      legend: {
        data: ['Doanh thu'],
      },
      toolbox: {
        feature: {
          restore: { show: true },
          saveAsImage: {},
        },
      },
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },
      xAxis: [
        {
          type: 'category',
          name: 'Tháng',
          boundaryGap: false,
          data: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
          ],
        },
      ],
      yAxis: [
        {
          type: 'value',
          name: 'Tiền',
          position: 'left',
          alignTicks: true,
          axisLine: {
            show: true,
          },
          axisLabel: {
            formatter: '{value} đ',
          },
        },
      ],
      series: [
        {
          name: 'Doanh thu',
          type: 'line',
          stack: 'Total',
          tooltip: {
            formatter: '{value} đ',
          },
          emphasis: {
            focus: 'series',
          },

          // data :this.values
          data: [120, 1320, 101, 134, 90, 2300, 210, 120, 1302, 101, 1034, 90, 2030],
        },
      ],
    };
  }
}
