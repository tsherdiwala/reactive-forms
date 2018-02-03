import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, FormGroup } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  get total(): number {
    let value = 0
    let productFormArray = this.cartForm.get('products') as FormArray
    productFormArray.controls.forEach((productFG: FormGroup, index: number) => {
      let productQuantity = productFG.get('quantity').value;
      if(productQuantity){
        value += (
          parseInt(productQuantity) * 
          this.cart.products[index].price
        );
      }
    })
    return value
  }

  cart: Cart = {
    products: [
      {
        id: 1,
        name: "Product 1",
        quantity: 2,
        price: 10
      },
      {
        id: 2,
        name: "Product 2",
        quantity: 3,
        price: 20
      }
    ]
  }

  cartForm: FormGroup = this.fb.group({products: this.fb.array([])})

  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {
    const productFormGroups = this.cart.products.map(product => {
      let {id, quantity} = product;
      return this.fb.group({id, quantity})
    });
    this.cartForm = this.fb.group({
      products: this.fb.array(productFormGroups)
    });

    this.cartForm.get('products').valueChanges.subscribe(
      value => console.log(JSON.stringify(value))
    );

    let productsInForm = this.cartForm.get('products') as FormArray
    console.log();
  }
}

interface Cart {
  products: Product[]
}

interface Product {
  id: number
  name: string
  price: number
  quantity?: number
}
