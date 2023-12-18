import { Component, OnDestroy, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HousingService } from '../../services/housing.service';
import { HousingLocation } from '../../interfaces/housing-location';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
  @if (housingLocation) {
    <article>
      <img class="listing-photo" [src]="housingLocation.photo">
      <section class="listing-description">
        <h2 class="listing-heading">{{housingLocation.name}}</h2>
        <p class="listing-location">{{housingLocation.city}}, {{housingLocation.state}}</p>
      </section>
      <section class="listing-features">
        <h2 class="section-heading">About this housing location</h2>
        <ul>
          <li> Units available: {{housingLocation.availableUnits}}</li>
          <li> Doses this location have wifi: {{housingLocation.wifi?'yes':'no'}}</li>
        </ul>
      </section>
      <section class="listing-apply">
        <h2 class="section-heading"> Applay now to live here</h2>
        <form [formGroup]="applyForm" (submit)="submitApplication()">
          <label for="first-name">First Name</label>
          <input id="first-name" type="text" formControlName="firstname">
          <label for="last-name">Last Name</label>
          <input id="last-name" type="text" formControlName="lastname">
          <label for="email">Email</label>
          <input id="Email" type="email" formControlName="email">
          <button type="submit" class="primary">Applay now</button>
        </form>
      </section>
    </article>
  }@else {
    <p>We are sorry! this article is no more available</p>
  }

  `,
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnDestroy{

  route: ActivatedRoute = inject(ActivatedRoute);
  housingService: HousingService = inject(HousingService);
  housingLocation: HousingLocation|undefined;
  housingLocationSubscribtion: Subscription;
  applyForm = new FormGroup({
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    email: new FormControl('')
  })
  constructor(){
    const housingLocationId = Number(this.route.snapshot.params['id']);
    this.housingLocationSubscribtion = this.housingService.getHousingLocationById(housingLocationId).subscribe({next: housingLocation=>{
      this.housingLocation = housingLocation;
    }, error:err=>{
      console.log(err);
    }});
  }
  ngOnDestroy(): void {
    this.housingLocationSubscribtion.unsubscribe()
  }
  submitApplication(){
    this.housingService.submitApplication(
      this.applyForm.value.firstname??'',
      this.applyForm.value.lastname??'',
      this.applyForm.value.email??''
    );
  }
}
