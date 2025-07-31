import {
  Component,
  ElementRef,
  HostListener,
  inject,
  OnInit,
  resource,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DashboardService } from '../dashboard.service';
import {
  DashboardCardSearchRequest,
  DashboardTagsResponseSchema,
} from '../dashboard-models';
import { CommonModule } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { getApiUrl } from '../../../shared/api/route';

@Component({
  selector: 'app-dashboard-search',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard-search.component.html',
  styleUrl: './dashboard-search.component.css',
})
export class DashboardSearchComponent implements OnInit {
  readonly dropdown = viewChild<ElementRef<HTMLDivElement>>('dropdown');
  readonly tagFilter = signal<string>('');
  readonly form = new FormGroup({
    title: new FormControl<string>(''),
    tags: new FormControl<string[]>([]),
    date: new FormControl<string>(''),
  });

  readonly tags = httpResource<string[]>(
    () => ({
      url: getApiUrl(`/dashboard/mindmap/tags`),
      params: {
        name: this.tagFilter(),
      },
    }),
    {
      defaultValue: [],
      parse: (value) => DashboardTagsResponseSchema.parse(value).data,
    }
  );
  readonly isDropdownVisible = signal(false);

  ngOnInit(): void {}

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
