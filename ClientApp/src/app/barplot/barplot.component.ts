import { Component, Input, OnInit, a } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-barplot',
  templateUrl: './barplot.component.html',
  styleUrls: ['./barplot.component.css']
})
export class BarplotComponent implements OnInit {
  @Input() DATA: Array<number> = [];
  @Input() width = 500;
  @Input() height = 500;
  @Input() title = '';
  abshack = Math.abs;
  scaleX = d3.scaleLinear();
  scaleY = d3.scaleLinear();
  format = (n: number) => d3.format('2.4f')(n);
  formatL = (n: number) => d3.format('2.1f')(n);
  translatehack = (x: number, y: number, r = 0) => `translate(${x},${y}) rotate(${r})`;
  constructor() { }

  ngOnInit() {
    this.scaleX
      .domain([0, this.DATA.length])
      .range([this.width * 0.1, this.width * 0.9]);
    this.scaleY
      .domain([d3.min(this.DATA), d3.max(this.DATA)])
      .range([this.height * 0.9, this.height * 0.1]);
  }

  info(e: MouseEvent, x: number, y: number, inout = false) {
    const tip = d3.select('app-barplot').select('div.mainTip');
    const origin = (d3
      .select('app-cones')
      .node() as HTMLElement).getBoundingClientRect(); // Try to get position correct when the picture has scrollbars.
    const here = d3.select(e.target);
    if (inout) {
      here.style('opacity', 0.5);
      tip // The tooltip
        .style('left', `${e.clientX - 60 - 0 * origin.left + 0 * this.width / this.DATA.length}px`)
        .style('top', `${e.clientY - origin.top}px`)
        .style('opacity', 1)
        .style('display', 'inline-block')
        .html(`x:${x} ${this.format(y)}`);
    } else {
      here.style('opacity', 1);
      tip.style('opacity', 0).style('display', 'none');
    }
  }
}
