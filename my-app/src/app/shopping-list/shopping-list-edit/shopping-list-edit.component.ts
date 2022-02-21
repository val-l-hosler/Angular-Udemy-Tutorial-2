import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Ingredient} from "../../shared/ingredient.model";

@Component({
  selector: 'app-shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.css']
})
export class ShoppingListEditComponent implements OnInit {

  // ViewChild has to access the element directly inside it
  @ViewChild('nameInput', {static: false}) primaryNameInput: ElementRef;

  @ViewChild('amountInput', {static: false}) primaryAmountInput: ElementRef;

  @Output() newIngredient = new EventEmitter<Ingredient>();

  constructor() {
  }

  ngOnInit(): void {
  }

  addOnClick(): void {
    this.newIngredient.emit(
      new Ingredient(this.primaryNameInput.nativeElement.value,
        this.primaryAmountInput.nativeElement.value)
    );
  }
}
