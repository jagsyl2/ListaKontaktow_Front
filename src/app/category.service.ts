import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Category } from './models/category';
import { Subcategory } from './models/subcategory';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  base_url = 'http://localhost:10500/api/categories'

  constructor(private httpClient: HttpClient) { }

  getCategoriesList() {
    return this.httpClient.get<Array<Category>>(this.base_url);
  }

  getSubcategoriesListById(id: number) {
    return this.httpClient.get<Array<Subcategory>>(this.base_url + '/' + id);
  }
}
