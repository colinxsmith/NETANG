import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
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
      const cc: ConeData = { x: this.DATA[0].x, step: 68 };
      this.sendData('coneopt', this.DATA[0]);
      this.sendData('coneopt', cc);
    }, error => console.error(error));
  }

  sendData(key = 'coneopt', sendObject = {} as ConeData) {
    const options = {
      headers: new HttpHeaders()
        .set('Content-Type', 'application/json')
    };
    return this
      .http
      .post<ConeData>(`${this.baseUrl}${key}`, sendObject, options)
      .subscribe(ddd => {
        console.log(ddd);
        return ddd;
      })
      ;
  }

  ngOnInit() {
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
