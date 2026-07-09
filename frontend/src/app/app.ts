import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NxWelcome } from './nx-welcome';
import { CfpFormComponent } from './cfp-form/cfp-form.component';

@Component({
  imports: [NxWelcome, RouterModule, CfpFormComponent],
  selector: 'app-root',
  template: `
    <app-nx-welcome></app-nx-welcome>
    <app-cfp-form></app-cfp-form>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class App {
  protected title = 'frontend';
}
