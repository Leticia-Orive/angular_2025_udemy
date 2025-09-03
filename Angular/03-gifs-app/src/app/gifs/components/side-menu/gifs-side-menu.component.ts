import {Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import GifsSideMenuHeaderComponent from './side-menu-header/gifs-side-menu-header.component';
import GifsSideMenuOptionsComponent from './side-menu-options/gifs-side-menu-options.component';


@Component({
  selector: 'app-gifs-side-menu',
  imports: [RouterOutlet,GifsSideMenuOptionsComponent, GifsSideMenuHeaderComponent],
  templateUrl: './gifs-side-menu.component.html',

})
export default class GifsSideMenuComponent { }
