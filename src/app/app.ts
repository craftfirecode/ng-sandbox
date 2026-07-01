import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NgIcon, provideIcons, type IconName } from '@ng-icons/core';
import {
  lucideCalendar,
  lucideChevronRight,
  lucideChevronsUpDown,
  lucideFolder,
  lucideHouse,
  lucideInbox,
  lucideLogOut,
  lucidePanelLeft,
  lucideSearch,
  lucideSettings,
  lucideUser,
} from '@ng-icons/lucide';

import { ZardAvatarComponent } from '@/shared/components/avatar';
import { ZardBreadcrumbImports } from '@/shared/components/breadcrumb/breadcrumb.imports';
import { ZardButtonComponent } from '@/shared/components/button';
import { ZardDividerComponent } from '@/shared/components/divider';
import { LayoutImports } from '@/shared/components/layout/layout.imports';
import { ZardMenuImports } from '@/shared/components/menu/menu.imports';
import { ZardTooltipImports } from '@/shared/components/tooltip';

interface MenuItem {
  icon: IconName;
  label: string;
  href?: string;
  submenu?: { label: string }[];
}

@Component({
  selector: 'app-root',
  imports: [
    LayoutImports,
    ZardButtonComponent,
    ZardBreadcrumbImports,
    ZardMenuImports,
    ZardTooltipImports,
    ZardDividerComponent,
    ZardAvatarComponent,
    NgIcon,
    RouterOutlet,
    RouterLink,
  ],
  templateUrl: './app.html',
  styleUrl: './app.css',
  viewProviders: [
    provideIcons({
      lucideHouse,
      lucideInbox,
      lucideFolder,
      lucideChevronRight,
      lucideChevronsUpDown,
      lucideUser,
      lucideSettings,
      lucideLogOut,
      lucidePanelLeft,
      lucideCalendar,
      lucideSearch,
    }),
  ],
})
export class App {
  protected readonly title = signal('concept');

  readonly sidebarCollapsed = signal(false);

  mainMenuItems: MenuItem[] = [
    { icon: 'lucideHouse', label: 'Home', href: '/' },
    { icon: 'lucideInbox', label: 'About', href: '/about' },
  ];

  workspaceMenuItems: MenuItem[] = [
    {
      icon: 'lucideFolder',
      label: 'Projects',
      submenu: [{ label: 'Design System' }, { label: 'Mobile App' }, { label: 'Website' }],
    },
    { icon: 'lucideCalendar', label: 'Calendar' },
    { icon: 'lucideSearch', label: 'Search' },
  ];

  toggleSidebar() {
    this.sidebarCollapsed.update((collapsed) => !collapsed);
  }

  onCollapsedChange(collapsed: boolean) {
    this.sidebarCollapsed.set(collapsed);
  }
}
