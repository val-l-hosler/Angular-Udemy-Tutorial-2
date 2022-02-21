import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() displayRecipes = new EventEmitter<boolean>();
  @Output() displayList = new EventEmitter<boolean>()

  recipes = false;
  list = false;

  constructor() {
  }

  ngOnInit(): void {
  }

  onClick(link: string): void {
    if (link === 'recipes') {
      this.recipes = true;
      this.list = false;

      this.displayRecipes.emit(this.recipes);
      this.displayList.emit(this.list);

    } else if (link === 'list') {
      this.recipes = false;
      this.list = true;

      this.displayRecipes.emit(this.recipes);
      this.displayList.emit(this.list);
    }
  }
}
