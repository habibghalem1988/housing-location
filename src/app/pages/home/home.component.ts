import { Component, OnDestroy, inject } from '@angular/core';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingLocation } from '../../interfaces/housing-location';
import { HousingService } from '../../services/housing.service';
import { HttpClientModule } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HousingLocationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnDestroy {
  housingService: HousingService = inject(HousingService);
  housingLocationList: HousingLocation[] = [];
  filteredHousingLocationList: HousingLocation[] = [];
  housingLocationListSubscription: Subscription;

  constructor(){
    this.housingLocationListSubscription = this.housingService.getHousingLocationList().subscribe({next: housingLocationList=>{
      this.housingLocationList = housingLocationList;
      this.filteredHousingLocationList = housingLocationList;
    }, error:err=>{
      console.log(err);
    }},);
  }

  applyFilter(text:string){
    this.filteredHousingLocationList = this.housingLocationList
    .filter(housingLocation=>housingLocation?.name.toLocaleLowerCase().includes(text.toLocaleLowerCase()));
  }
  ngOnDestroy(): void {
    this.housingLocationListSubscription.unsubscribe();
  }

}
