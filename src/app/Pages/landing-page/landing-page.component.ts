import { Component,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { LandingNavComponent } from '../../Components/navbar/landing-nav/landing-nav.component';
import { LandingFooterComponent } from '../../Components/footer/landing-footer/landing-footer.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [LandingNavComponent,LandingFooterComponent],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class LandingPageComponent {

}
