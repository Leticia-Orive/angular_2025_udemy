import { Component } from '@angular/core';
import { FeaturedPostsComponent } from '../../components/featured-posts/featured-posts.component';

@Component({
  selector: 'app-home',
  imports: [FeaturedPostsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

}
