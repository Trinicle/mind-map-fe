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
import { BehaviorSubject, map } from 'rxjs';
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
  readonly isTagsListEmpty = signal(true);

  private readonly tagsSubject = new BehaviorSubject<string[]>([]);
  readonly tags$ = this.tagsSubject.asObservable();
  readonly resultTags$ = new BehaviorSubject<string[]>([]);

  ngOnInit(): void {
    this.dashboardService.getTags().subscribe((tags) => {
      this.isTagsListEmpty.set(tags.length === 0);
      this.tagsSubject.next(tags);
      this.resultTags$.next(tags); // Initially show all tags
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

    const filteredTags = this.tagsSubject.value.filter((tag) =>
      tag.toLowerCase().includes(searchTerm)
    );
    this.isTagsListEmpty.set(filteredTags.length === 0);
    this.resultTags$.next(filteredTags);
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
