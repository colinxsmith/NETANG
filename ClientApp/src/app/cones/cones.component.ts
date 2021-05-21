import { Component, OnInit, Inject, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as d3 from 'd3';
@Component({
  selector: 'app-cones',
  templateUrl: './cones.component.html',
  styleUrls: ['./cones.component.css']
})
export class ConesComponent implements OnInit {
  DATA: Array<ConeData> = [];
  width = 200;
  height = 200;
  newC: Array<number> = [];
  newB: Array<number> = [];
  primal: number;
  dual: number;
  format = (n: number) => d3.format('0.4f')(n);
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private element: ElementRef) {
  }
  sendData(key = 'coneopt', sendObject = {} as Array<ConeData>) {
    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this.http.post<Array<ConeData>>(`${this.baseUrl}${key}`, sendObject, options);
  }
  over(e: MouseEvent, inout = false) {
    d3.select(e.target as HTMLInputElement & EventTarget).classed('over', inout);
  }
  sendStep() {
    const back = +(d3.select(this.element.nativeElement).select('input.step').node() as HTMLInputElement & Event).value;
    console.log(back, this.newB, this.newC);
    const cc: Array<ConeData> = [{
      step: back, c: this.newC.length === 0 ? this.DATA[0].c : this.newC,
      b: this.newB.length === 0 ? this.DATA[0].b : this.newB
    }] as Array<ConeData>;
    this.sendData('coneopt', cc)
      .subscribe(ddd => {
        console.log(ddd);
        this.DATA = ddd;
        this.calc();
      }, error => console.error(error));
  }
  newDatC(e: Array<number>) {
    this.newC = e;
  }
  newDatB(e: Array<number>) {
    this.newB = e;
  }
  ngOnInit() {
    this.init();
  }
  calc() {
    this.dual = 0;
    this.DATA[0].y.forEach((d, i) => this.dual += d * this.DATA[0].b[i]);
    this.primal = 0;
    this.DATA[0].x.forEach((d, i) => this.primal += d * this.DATA[0].c[i]);
  }
  init() {
    this.http.get<Array<ConeData>>(this.baseUrl + 'coneopt')
      .subscribe(ddd => {
        console.log(ddd);
        this.DATA = ddd;
        this.calc();
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
