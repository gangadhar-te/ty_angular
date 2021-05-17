import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
// import { Product } from '../productInter.component';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {
  isLoading:boolean;
  message:string;
  error:string;
  constructor(private ps:ProductService) { }

  ngOnInit(): void {
  }

  onFormSubmit(addProductForm) {
    this.isLoading = true;
    console.log(addProductForm.value);
    this.ps.postProducts(addProductForm.value).subscribe(res => {
      addProductForm.reset()
   this.isLoading = false;
   if (!res.error) {
     this.message = 'Product added Successfully'
   }
   else {
     this.error = "Failed to add product please add it again"
   }
    },err => {
      this.error = 'Server Busy please try later'
    })
  }

  }
  

  
