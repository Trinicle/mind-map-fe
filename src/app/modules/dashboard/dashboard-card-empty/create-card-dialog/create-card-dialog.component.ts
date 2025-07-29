import {
  Component,
  ElementRef,
  inject,
  signal,
  viewChild,
} from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';
import { DashboardService } from '../../dashboard.service';
import { DashboardCardPostRequest } from '../../dashboard-models';

@Component({
  selector: 'app-create-card-dialog',
  imports: [ReactiveFormsModule, NgIcon],
  templateUrl: './create-card-dialog.component.html',
  styleUrl: './create-card-dialog.component.css',
  providers: [provideIcons({ heroXMark })],
})
export class CreateCardDialogComponent {
  private readonly dashboardService = inject(DashboardService);

  readonly form = new FormGroup({
    title: new FormControl(''),
    tags: new FormControl<string[]>([]),
    description: new FormControl(''),
    date: new FormControl<string>(''),
    transcript: new FormControl<File | null>(null),
  });
  readonly tag = new FormControl('');
  readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  onFileSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files?.[0];
    if (file) {
      this.form.patchValue({
        transcript: file,
      });
    }
  }

  onAddTag() {
    const newTag = this.tag.value;
    const tagsControl = this.form.controls.tags;
    const tags = tagsControl.value ?? [];

    if (newTag && !tags.includes(newTag)) {
      tagsControl.setValue([...(tagsControl.value ?? []), newTag]);
      this.tag.reset();
    }
  }

  onDeleteTag(tag: string) {
    const tagsControl = this.form.controls.tags;
    const tags = tagsControl.value ?? [];
    tagsControl.setValue(tags.filter((t) => t !== tag));
  }

  public showModal() {
    this.dialog().nativeElement.showModal();
  }

  protected onClose() {
    this.dialog().nativeElement.close();
  }

  onSubmit() {
    const { title, tags, description, date, transcript } = this.form.value;

    if (!transcript || !title || !date) {
      return;
    }

    const request: DashboardCardPostRequest = {
      title: title,
      tags: tags ?? [],
      description: description ?? '',
      date: new Date(date),
      file: transcript,
    };

    this.onClose();
    this.dashboardService.createCard(request).subscribe();
  }
}
