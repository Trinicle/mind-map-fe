import { Component, ElementRef, signal, viewChild } from '@angular/core';
import { provideIcons } from '@ng-icons/core';
import { NgIconComponent } from '@ng-icons/core';
import { tdesignArrowUp, tdesignPlus } from '@ng-icons/tdesign-icons';

@Component({
  selector: 'app-chat',
  imports: [NgIconComponent],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
  providers: [provideIcons({ tdesignPlus, tdesignArrowUp })],
})
export class ChatComponent {
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
