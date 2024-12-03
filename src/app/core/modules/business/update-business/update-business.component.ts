import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BusinessModel } from 'src/app/core/models/business.model';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-update-business',
  templateUrl: './update-business.component.html',
  styleUrls: ['./update-business.component.scss']
})
export class UpdateBusinessComponent implements OnInit {

  titlePage = 'Actualización de Negocio';

  constructor(
    private title: Title
  ) { }

  ngOnInit(): void {
    this.title.setTitle(`${this.titlePage} ${environment.page.suffix}`);
  }

  save(businessModel: BusinessModel) {

  }

}
