import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-topic',
  imports: [],
  templateUrl: './topic.component.html',
  styleUrl: './topic.component.css',
})
export class TopicComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  onClose() {
    this.router.navigate(['network'], { relativeTo: this.route.parent });
  }
}
