import { Component } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { NetworkComponent } from './network/network.component';

@Component({
  selector: 'app-map',
  imports: [OverviewComponent, NetworkComponent],
  templateUrl: './mindmap.component.html',
  styleUrl: './mindmap.component.css',
})
export class MindMapComponent {}
