import {
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  resource,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardCardSearchRequest, DashboardTags } from '../dashboard-models';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-search.component.html',
  styleUrl: './dashboard-search.component.css',
})
export class DashboardSearchComponent implements OnInit {
  readonly dashboardService = inject(DashboardService);
  readonly dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  readonly tagFilter = signal<string>('');
  readonly form = new FormGroup({
    title: new FormControl<string>(''),
    tags: new FormControl<string[]>([]),
    date: new FormControl<string>(''),
  });

  readonly tags = signal<DashboardTags[]>([]);
  readonly filteredTags = computed(() => {
    return this.tags().filter((tag) =>
      tag.name.toLowerCase().includes(this.tagFilter().toLowerCase())
    );
  });

  readonly isDropdownVisible = signal(false);

  ngOnInit(): void {
    this.dashboardService.getTags().subscribe({
      next: (tags) => this.tags.set(tags),
    });
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
    const searchTerm = input.value.toLowerCase();

    this.tagFilter.set(searchTerm);
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
