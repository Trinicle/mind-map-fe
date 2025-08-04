import {
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardCardSearchRequest, DashboardTags } from '../dashboard-store';
import { CommonModule } from '@angular/common';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-dashboard-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-search.component.html',
  styleUrl: './dashboard-search.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardSearchComponent implements OnInit {
  readonly dashboardService = inject(DashboardService);
  readonly dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  readonly tagFilter = signal<string>('');
  readonly form = new FormGroup({
    title: new FormControl<string>(''),
    activeTags: new FormControl<string[]>([]),
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
    const { title, activeTags, date } = this.form.value;

    const request: DashboardCardSearchRequest = {
      title: title ?? '',
      tags: activeTags ?? [],
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

  onTagChange(event: Event, tag: DashboardTags) {
    const checkbox = event.target as HTMLInputElement;
    const activeTags = this.form.value.activeTags;
    if (checkbox.checked) {
      activeTags?.push(tag.name);
    } else {
      activeTags?.splice(activeTags.indexOf(tag.name), 1);
    }

    console.log(this.form.value.activeTags);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.dropdown()?.nativeElement.contains(event.target as Node)) {
      this.isDropdownVisible.set(false);
    }
  }
}
