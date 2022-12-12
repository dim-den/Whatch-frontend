import { ReplaceableComponentsService } from '@abp/ng.core';
import { eThemeLeptonXComponents } from '@abp/ng.theme.lepton-x';
import { Component } from '@angular/core';
import { EmptyComponent } from './shared/empty/empty.component';

@Component({
  selector: 'app-root',
  template: `
    <abp-loader-bar></abp-loader-bar>
    <abp-dynamic-layout></abp-dynamic-layout>
  `,
})
export class AppComponent {
  constructor(
    private replaceableComponents: ReplaceableComponentsService // injected the service
  ) {
    this.replaceableComponents.add({
      component: EmptyComponent,
      key: eThemeLeptonXComponents.Footer,
    });
  }
}
