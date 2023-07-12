import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js/auto'

@Component({
  selector: 'app-gestor-estadistica',
  templateUrl: './gestor-estadistica.component.html',
  styleUrls: ['./gestor-estadistica.component.css']
})
export class GestorEstadisticaComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    (async function() {
      const data = [
        { year: 2010, count: 10 },
        { year: 2011, count: 20 },
        { year: 2012, count: 15 },
        { year: 2013, count: 25 },
        { year: 2014, count: 22 },
        { year: 2015, count: 30 },
        { year: 2016, count: 28 },
      ];
    
      new Chart(
       "miEstadistica" ,
        {
          type: 'bar',
          data: {
            labels: data.map(row => row.year),
            datasets: [
              {
                label: 'miEstadistica',
                data: data.map(row => row.count)
              },
              {
                label: 'miEstadistica',
                data: data.map(row => row.count)
              }
            ]
          }
        }
      );
    })();
  }

}
