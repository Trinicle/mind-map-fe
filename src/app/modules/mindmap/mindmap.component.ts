import { Component } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-map',
  imports: [OverviewComponent, RouterOutlet],
  templateUrl: './mindmap.component.html',
  styleUrl: './mindmap.component.css',
})
export class MindMapComponent {}
