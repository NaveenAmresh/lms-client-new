import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import {CheckconnService} from '../../../services/checkconn.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass']
})
export class DashboardComponent implements OnInit {
  cards = [
    { title: '10', content: 'Issued Books', cols: 1, rows: 1, color: 'white', bgColor: 'red', icon: 'local_library',
      link: '../usersList' },
    { title: '2 | 4', content: 'Manage Users', cols: 1, rows: 1, color: 'white', bgColor: 'darkcyan', icon: 'verified_user',
      link: '../usersList'   },
    { title: '10000', content: 'Manage Books', cols: 1, rows: 1, color: 'white', bgColor: 'green', icon: 'book', link: '.'   },
    { title: '730', content: 'Fine Collected', cols: 1, rows: 1, color: 'white', bgColor: 'darkviolet', icon: 'money', link: '.'   }
  ];
  BarChart = [];

  constructor(private _check: CheckconnService) {
    this._check.check();
  }

  ngOnInit() {
    this.BarChart = new Chart('barChart', {
      type: 'horizontalBar',
      responsive: true,
      data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
          label: '% of Votes',
          data: [9, 7, 2, 1, 4, 10],
          backgroundColor: [
            'rgba(255, 99, 132, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(255, 206, 86, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 159, 64, 0.5)',
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          hoverBorderColor: [
            'rgba(255, 99, 132, 0)',
            'rgba(54, 162, 235, 0)',
            'rgba(255, 206, 86, 0)',
            'rgba(75, 192, 192, 0)',
            'rgba(153, 102, 255, 0)',
            'rgba(255, 159, 64, 0)'
          ],
          hoverBackgroundColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 2
        }]
      },
      options: {
        title: {
          text: 'Bar Chart',
          display: true
        },
        scales: {
          yAxes: [{
            barPercentage: 1
          }],
          xAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }
}
