import { Injectable, inject } from '@angular/core';
import { HousingLocation } from '../interfaces/housing-location';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HousingService {
  protected housingLocationList: HousingLocation[] = []
  httpClient = inject(HttpClient)
  url = 'http://localhost:3000/locations'
  constructor() {
  }

  getHousingLocationList(): Observable<HousingLocation[]>{
    return this.httpClient.get(this.url) as Observable<HousingLocation[]> ;
  }

  getHousingLocationById (id:Number):Observable<HousingLocation|undefined>{
    return this.httpClient.get(`${this.url}/${id}`) as Observable<HousingLocation|undefined>;
  }

  submitApplication(firstname: string, lastname: string, email: string){
    console.log(firstname, lastname, email);
  }
}
