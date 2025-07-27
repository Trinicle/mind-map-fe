import { Component, ElementRef, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { heroXMark } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-create-card-dialog',
  imports: [ReactiveFormsModule, NgIcon],
  templateUrl: './create-card-dialog.component.html',
  styleUrl: './create-card-dialog.component.css',
  providers: [provideIcons({ heroXMark })],
})
export class CreateCardDialogComponent {
  protected readonly form = new FormGroup({
    title: new FormControl(''),
    tags: new FormControl<string[]>([]),
    description: new FormControl(''),
    date: new FormControl<Date | null>(null),
  });
  protected tag = new FormControl('');
  protected readonly dialog =
    viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected onAddTag() {
    const newTag = this.tag.value;
    const tagsControl = this.form.controls.tags;
    const tags = tagsControl.value ?? [];

    if (newTag && !tags.includes(newTag)) {
      tagsControl.setValue([...(tagsControl.value ?? []), newTag]);
      this.tag.reset();
    }
  }

  protected onDeleteTag(tag: string) {
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

  protected onSubmit() {
    console.log(this.form.value);
  }
}
