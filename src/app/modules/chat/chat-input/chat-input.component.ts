import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { tdesignPlus, tdesignArrowUp } from '@ng-icons/tdesign-icons';

@Component({
  selector: 'app-chat-input',
  imports: [NgIconComponent],
  providers: [provideIcons({ tdesignPlus, tdesignArrowUp })],
  templateUrl: './chat-input.component.html',
  styleUrl: './chat-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatInputComponent {
  onInput(event: Event) {
    const div = event.target as HTMLDivElement;

    console.log(div.innerHTML);
    if (
      div.innerHTML === '<p></p>' ||
      div.innerHTML === '<p><br></p>' ||
      div.innerHTML === '<br>' ||
      div.innerHTML === '<div><br></div>'
    ) {
      div.innerHTML = '';
    }
  }
}
