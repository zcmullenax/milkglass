import { Routes } from '@angular/router';
import { LandingPage } from './Components/landing-page/landing-page';
import { AboutComponent } from './Components/about-component/about-component';
import { CurrentPreOrderComponent } from './Components/current-pre-order-component/current-pre-order-component';
import { GalleryComponent } from './Components/gallery-component/gallery-component';

export const routes: Routes = [
    { path: '', component: LandingPage },
    { path: 'about', component: AboutComponent },
    { path: 'current', component: CurrentPreOrderComponent },
    { path: 'gallery', component: GalleryComponent }
];
