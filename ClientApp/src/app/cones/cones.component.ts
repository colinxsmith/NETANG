import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private element: ElementRef) {
  }
  sendData(key = 'coneopt', sendObject = {} as ConeData[]) {
    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.http.post<ConeData[]>(`${this.baseUrl}${key}`, sendObject, options);
  }
  sendStep() {
    const back = +(d3.select(this.element.nativeElement).select('input').node() as HTMLInputElement & Event).value;
    const cc:Array<ConeData> = [{ step: back }]as ConeData[];
    this.sendData('coneopt', cc )
      .subscribe(ddd => {
          this.DATA = ddd;
      }, error => console.error(error));
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.http.get<ConeData[]>(this.baseUrl + 'coneopt')
    .subscribe(ddd => {
        console.log(ddd);
          this.DATA = ddd;
      }, error => console.error(error));
  }
}
interface ConeData {
  x: Array<number>;
  y: Array<number>;
  z: Array<number>;
  b: Array<number>;
  c: Array<number>;
  tau: number;
  kappa: number;
  step: number;
}
