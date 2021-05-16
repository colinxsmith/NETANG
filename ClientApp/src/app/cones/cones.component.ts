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
  width = 500;
  height = 500;
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  scaleZ = d3.scaleLinear();
  format = (n: number) => d3.format('2.4f')(n);
  formatL = (n: number) => d3.format('2.1f')(n);
  abshack = Math.abs;
  translatehack = (x: number, y: number, r = 0) => `translate(${x},${y}) rotate(${r})`;
  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {

    http.get<ConeData[]>(baseUrl + 'coneopt').subscribe(result => {
      this.DATA = result;
      this.scaleX
        .domain([0, this.DATA[0].x.length])
        .range([this.width * 0.1, this.width * 0.9]);
      this.scaleY
        .domain([-1, 1])
        .range([this.height * 0.9, this.height * 0.1]);
      this.scaleZ
        .domain([d3.min(this.DATA[0].z), d3.max(this.DATA[0].z)])
        .range([this.height * 0.9, this.height * 0.1]);
    }, error => console.error(error));
  }

  ngOnInit() {
  }
  info(e: MouseEvent, x: number, y: number, inout = false) {
    const tip = d3.select('app-cones').select('div.mainTip');
    const origin = (d3
      .select('app-cones')
      .node() as HTMLElement).getBoundingClientRect(); //Try to get position correct when the picture has scrollbars.
    const here = d3.select(e.target as any);
    if (inout) {
      here.style('opacity', 0.5);
      tip //The tooltip
        .style('left', `${e.clientX -origin.left+0.5*this.width/this.DATA[0].x.length}px`)
        .style('top', `${e.clientY -origin.top}px`)
        .style('opacity', 1)
        .style('display', 'inline-block')
        .html(`x:${x} ${this.format(y)}`);
    } else {
      here.style('opacity', 1);
      tip.style('opacity', 0).style('display', 'none');
    }
  }
}
interface ConeData {
  x: Array<number>,
  y: Array<number>,
  z: Array<number>
}