import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardService } from '../dashboard/dashboard.service';
import { MindMapService } from './mindmap.service';

@Component({
  selector: 'app-map',
  imports: [],
  providers: [MindMapService],
  templateUrl: './mindmap.component.html',
  styleUrl: './mindmap.component.css',
})
export class MindMapComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly mindMapService = inject(MindMapService);

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.mindMapService.getMap(id);
    });
  }
}
