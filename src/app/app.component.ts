import { Component } from '@angular/core';
import { CharacterListComponent } from './character-list/character-list.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [CharacterListComponent]
})
export class AppComponent {
  title = 'rick-and-morty-app';
}
