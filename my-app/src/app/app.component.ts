import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  parentRecipesBool: boolean;
  parentListBool: boolean;

  setRecipeBool(recipeBool: boolean): void {
    this.parentRecipesBool = recipeBool;
  }

  setListBool(listBool: boolean): void {
    this.parentListBool = listBool;
  }
}
