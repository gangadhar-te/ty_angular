import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductService } from '../product.service';
import { Product } from '../productInter.component';

@Component({
  selector: 'app-display-product',
  templateUrl: './display-product.component.html',
  styleUrls: ['./display-product.component.css']
})
export class DisplayProductComponent implements OnInit {
  products : Product[];
  isLoading : boolean;
  message : string;
  error: string;
  selectedProductToEdit: Product;
  productUpdating = false;
  constructor(private ps:ProductService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.isLoading = true;
    this.ps.getAllProducts().subscribe(res => {
      if (!res.error) {
      console.log(res);
      this.isLoading = false;
      this.products = res.products;
     
      }
      else {
        this.error = "Failed to load the products"
      }
    }, err => {
      this.error = "Server Error"
      this.isLoading= false;
    })
  }

  deleteProduct(product:Product) {
    this.isLoading = true;
    const confirmation = confirm("Are you sure to delete the product????")
    if(confirmation) {
      this.ps.deleteProduct(product._id).subscribe(res => {
        if(!res.error) {
          this.isLoading =false;
          // this.products.splice(this.products.indexOf(product),1)
          this.message = 'Product deleted successfully'
        }
        else {
          this.error = "Product deletion failed"
        }
      },err => {
        this.error = "Server error"
      })
    }
  }
  @ViewChild('modalCloseButton',{static:true})
  modalCloseButton:ElementRef

  onEditProduct(product) {
   this.selectedProductToEdit = {...product}
   console.log(this.selectedProductToEdit);
  }

  onFormSubmit() {
  this.isLoading=true;
  this.productUpdating = true;
  this.ps.updateProduct(this.selectedProductToEdit).subscribe(res => {
    if(!res.error) {
      this.isLoading=false;
      // this.productUpdating = false;
      this.modalCloseButton.nativeElement.click()
      this.message='Product Updated Successfully'
      this.products.splice(this.products.findIndex(element => element._id===res.response._id)
        ,1,res.response)

    }
    else {
      this.error = 'Product updation failed'
    }
  },err => {
    this.error = 'server error'
  })
  }
}
