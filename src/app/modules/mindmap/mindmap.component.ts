import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { OverviewComponent } from './overview/overview.component';
import { RouterOutlet } from '@angular/router';
import { NetworkStore } from './network-store';
import { NetworkService } from './network.service';

@Component({
  selector: 'app-map',
  imports: [OverviewComponent, RouterOutlet],
  providers: [NetworkStore, NetworkService],
  templateUrl: './mindmap.component.html',
  styleUrl: './mindmap.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MindMapComponent implements OnInit {
  ngOnInit(): void {}
}
