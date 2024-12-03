import { Component, OnInit  } from '@angular/core';;
import { Title } from '@angular/platform-browser';
import { LandingPageModel } from 'src/app/core/models/landingPage';
import { BusinessService } from 'src/app/core/services/business/business.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})

export class LandingPageComponent implements OnInit{
  landingPageArray:  Array<LandingPageModel> = new Array<LandingPageModel>();
  validateSpinner: boolean = false;

  constructor(
    private title: Title,
    private businessService: BusinessService) { }

  ngOnInit(): void {
    this.title.setTitle('Landing Page | Menú 4.0');
    this.loadSpinner();
    this.getBussines();
  } 
  getBussines(){
    this.businessService.getByFilter().subscribe(data => {
      this.landingPageArray = data.data;
      this.loadSpinner();
    }, error => {
      console.log(error);
      this.landingPageArray = [];
      this.loadSpinner();
    });
  }

  loadSpinner(){
    this.validateSpinner= !this.validateSpinner;
  }

}
