import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import { DashboardCardSearchRequest } from '../dashboard-models';
import { map, of } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-search.component.html',
  styleUrl: './dashboard-search.component.css',
})
export class DashboardSearchComponent implements OnInit {
  private readonly dashboardService = inject(DashboardService);
  readonly form = new FormGroup({
    title: new FormControl<string>(''),
    tags: new FormControl<string[]>([]),
    date: new FormControl<string>(''),
  });

  readonly dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  readonly isDropdownVisible = signal(false);
  tags$ = of<string[]>([]);
  resultTags$ = of<string[]>([]);

  ngOnInit(): void {
    this.tags$ = this.dashboardService.getTags();
    this.tags$.subscribe();
  }

  onBlur() {
    const { title, tags, date } = this.form.value;

    const request: DashboardCardSearchRequest = {
      title: title ?? '',
      tags: tags ?? [],
      date: date ?? '',
    };

    // this.dashboardService.getFilteredCards(request);
  }

  onInputChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.resultTags$ = this.tags$.pipe(
      map((tags) =>
        tags.filter((tag) =>
          tag.toLowerCase().includes(input.value.toLowerCase())
        )
      )
    );
  }

  onFocus() {
    this.isDropdownVisible.set(true);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.dropdown()?.nativeElement.contains(event.target as Node)) {
      this.isDropdownVisible.set(false);
    }
  }
}
