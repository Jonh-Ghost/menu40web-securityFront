import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loggin = true;
  constructor(
    private appComponent: AppComponent
  ) { }

  ngOnInit(): void {
    this.appComponent.ngOnInit();
  }

}
