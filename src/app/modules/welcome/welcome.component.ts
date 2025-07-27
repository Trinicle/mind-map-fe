import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { tdesignTreeRoundDotFilled } from '@ng-icons/tdesign-icons';
import { bootstrapRobot } from '@ng-icons/bootstrap-icons';
import { akarLinkChain } from '@ng-icons/akar-icons';
import { heroMagnifyingGlass } from '@ng-icons/heroicons/outline';

@Component({
  selector: 'app-welcome',
  imports: [CommonModule, RouterModule, NgIcon],
  providers: [
    provideIcons({
      tdesignTreeRoundDotFilled,
      bootstrapRobot,
      akarLinkChain,
      heroMagnifyingGlass,
    }),
  ],
  templateUrl: './welcome.component.html',
  styleUrl: './welcome.component.css',
})
export class WelcomeComponent {
  features = [
    {
      title: 'Interactive Topic Tree',
      description:
        'Break down conversations into organized categories and subtopics',
      icon: 'tdesignTreeRoundDotFilled',
    },
    {
      title: 'AI-Powered Insights',
      description:
        'Extract key points and generate relevant follow-up questions',
      icon: 'bootstrapRobot',
    },
    {
      title: 'Resource Linking',
      description: 'Highlight and connect related documents and resources',
      icon: 'akarLinkChain',
    },
    {
      title: 'Easy Review',
      description: 'Make meetings easier to review, search, and act on',
      icon: 'heroMagnifyingGlass',
    },
  ];

  scrollToFeatures() {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }
}
