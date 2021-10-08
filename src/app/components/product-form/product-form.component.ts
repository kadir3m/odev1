import {Component, OnInit, ViewChild} from '@angular/core';
import {ProductDto} from '../model/product.dto';
import {EntityConfig, ExplorerService} from '../../services/explorer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryEnum} from '../enum/category.enum';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  @ViewChild('productForm', {static: false}) productForm: any;
  entity: ProductDto;
  name = ''
  price = 0;
  id: any;
  mode = 'view' || 'edit' || 'add';
  isReadOnly = false;
  isSubmitted = false;
  categoryOptions: any = [];
  constructor(private explorerService: ExplorerService,
              private router: Router) {
    this.entity = {};
    this.mode === 'add';
    this.explorerService.entityConfigStream$.subscribe((res: EntityConfig )=> {
      this.mode = res.mode || 'add';
      if (['edit', 'view'].includes(this.mode)) {
        this.entity = res.product;
      }
    })
  }

  ngOnInit(): void {
    this.categoryOptions = [
      {
        description: 'TELEFON',
        value: CategoryEnum.PHONE
       },
      {
        description: 'TABLET',
        value: CategoryEnum.TABLET
      },
      {
        description: 'BİLGİSAYAR',
        value: CategoryEnum.COMPUTER
      }
      ]
    if (['edit', 'view'].includes(this.mode)) {
      if (this.mode === 'view') {
        this.isReadOnly = true
      }
    } else {
      this.entity.category = CategoryEnum.PHONE;
    }
  }

  addProduct() {
    this.isSubmitted = true;
    if (this.productForm.valid) {
      Object.assign(this.entity, {id: length + 1})
      this.explorerService.addProduct(this.entity);
      this.router.navigateByUrl('/parent');
    }
  }
  editProduct() {
    this.router.navigateByUrl('/parent');
  }
  close() {
    this.router.navigateByUrl('/parent');
  }
}
