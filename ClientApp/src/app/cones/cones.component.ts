import { Component, OnInit, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cones',
  templateUrl: './cones.component.html',
  styleUrls: ['./cones.component.css']
})
export class ConesComponent implements OnInit {
  DATA: ConeData[] = [];
  width = 500;
  height = 500;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    http.get<ConeData[]>(baseUrl + 'coneopt').subscribe(result => {
      this.DATA = result;
    }, error => console.error(error));
  }

  ngOnInit() {}
}
interface ConeData {
  x: Array<number>;
  y: Array<number>;
  z: Array<number>;
}
