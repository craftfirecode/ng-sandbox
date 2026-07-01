import { Component } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { ZardMenuImports } from '@/shared/components/menu';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import {
  lucideBookOpen,
  lucideChevronDown,
  lucideChevronRight,
  lucideFileText,
  lucideInfo,
  lucideUsers,
} from '@ng-icons/lucide';

@Component({
  selector: 'app-menu',
  imports: [NgIcon, ZardMenuImports, ZardButtonComponent, ZardDividerComponent],
  templateUrl: './menu.html',
  styleUrl: './menu.css',
  viewProviders: [
    provideIcons({
      lucideChevronDown,
      lucideChevronRight,
      lucideBookOpen,
      lucideFileText,
      lucideInfo,
      lucideUsers,
    }),
  ],
})
export class ZardDemoMenuDefaultComponent {
  log(item: string) {
    console.log('Navigate to:', item);
  }
}

export class Menu {}
