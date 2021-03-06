// (C) Copyright 2015 Martin Dougiamas
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

import { Component, Input, Output, OnInit, OnDestroy, ElementRef, EventEmitter, ContentChild, TemplateRef,
    ViewChild } from '@angular/core';
import { CoreTabsComponent } from './tabs';
import { Content } from 'ionic-angular';

/**
 * A tab to use inside core-tabs. The content of this tab will be displayed when the tab is selected.
 *
 * You must provide either a title or an icon for the tab.
 *
 * The tab content MUST be surrounded by ng-template. This component uses ngTemplateOutlet instead of ng-content because the
 * latter executes all the code immediately. This means that all the tabs would be initialized as soon as your view is
 * loaded, leading to performance issues.
 *
 * Example usage:
 *
 * <core-tabs selectedIndex="1">
 *     <core-tab [title]="'core.courses.timeline' | translate" (ionSelect)="switchTab('timeline')">
 *         <ng-template> <!-- This ng-template is required. -->
 *             <!-- Tab contents. -->
 *         </ng-template>
 *     </core-tab>
 * </core-tabs>
 */
@Component({
    selector: 'core-tab',
    template: '<ng-container *ngIf="loaded" [ngTemplateOutlet]="template"></ng-container>'
})
export class CoreTabComponent implements OnInit, OnDestroy {
    @Input() title?: string; // The tab title.
    @Input() icon?: string; // The tab icon.
    @Input() badge?: string; // A badge to add in the tab.
    @Input() badgeStyle?: string; // The badge color.
    @Input() enabled?: boolean = true; // Whether the tab is enabled.
    @Input() show?: boolean = true; // Whether the tab should be shown.
    @Input() id?: string; // An ID to identify the tab.
    @Output() ionSelect: EventEmitter<CoreTabComponent> = new EventEmitter<CoreTabComponent>();

    @ContentChild(TemplateRef) template: TemplateRef<any> // Template defined by the content.
    @ContentChild(Content) scroll: Content;

    element: HTMLElement; // The core-tab element.
    loaded = false;

    constructor(private tabs: CoreTabsComponent, element: ElementRef) {
        this.element = element.nativeElement;
    }

    /**
     * Component being initialized.
     */
    ngOnInit() {
        this.tabs.addTab(this);
    }

    /**
     * Component destroyed.
     */
    ngOnDestroy() {
        this.tabs.removeTab(this);
    }

    /**
     * Select tab.
     */
    selectTab() {
        this.element.classList.add('selected');

        this.loaded = true;
        this.ionSelect.emit(this);

        // Setup tab scrolling.
        setTimeout(() => {
            if (this.scroll) {
                this.scroll.getScrollElement().onscroll = (e) => {
                    this.tabs.showHideTabs(e);
                }
            }
        }, 1);
    }

    /**
     * Unselect tab.
     */
    unselectTab() {
        this.element.classList.remove('selected');
    }
}
