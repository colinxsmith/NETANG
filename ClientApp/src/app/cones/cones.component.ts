import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as d3 from 'd3';
@Component({
  selector: 'app-cones',
  templateUrl: './cones.component.html',
  styleUrls: ['./cones.component.css']
})
export class ConesComponent implements OnInit {
  DATA: ConeData[] = [];
  width = 200;
  height = 200;
  format = (n: number) => d3.format('0.4f')(n);
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    http.get<ConeData[]>(baseUrl + 'coneopt').subscribe(result => {
      this.DATA = result;
    }, error => console.error(error));
  }

  ngOnInit() { }
}
interface ConeData {
  x: Array<number>;
  y: Array<number>;
  z: Array<number>;
  b: Array<number>;
  c: Array<number>;
  tau: number;
  kappa: number;
}
