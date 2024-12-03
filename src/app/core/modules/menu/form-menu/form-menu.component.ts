import { Component, ElementRef,EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuModel } from 'src/app/core/models/menu.model';
import { BaseCatModel } from 'src/app/core/models/base-cat.model';
import { FileModel } from 'src/app/core/models/file.model';

@Component({
  selector: 'app-form-menu',
  templateUrl: './form-menu.component.html',
  styleUrls: ['./form-menu.component.scss']
})
export class FormMenuComponent implements OnInit {

  @Input() titleForm = '';
  @Input() isUpdateMenu = false;
  @Input() menuData?: MenuModel;
  @Input() typesMenu?: Array<BaseCatModel>; 
  @Output() ngMenuData = new EventEmitter<MenuModel>();
   
  menuForm?: FormGroup;
  isSubmit = false;
  idBussiness = 0;
  selected = 0;
  imagePreview: Array<string> = [];
  imageMenus: Array<FileModel> = [];

  @ViewChild('inputImage')inputElement!: ElementRef<HTMLInputElement>;

  optionStatus = [{id:4, name:"Activo"}, {id:5, name:"Inactivo"}]
  
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.buildFormMenu();
    if (this.isUpdateMenu) {
      console.log('Form Update');
      console.log(this.menuData);
      this.setDataToUpdate(this.menuData!);
    }
    
  }

  /**
   * Construye el Reactive Form angular
   */
  buildFormMenu(): void {
    this.menuForm = this.formBuilder.group({
      files: [[], []],
      status: ['', Validators.compose([Validators.required])],
      typeMenu: ['', Validators.compose([Validators.required])],
    });

    
  }

  /**
   * Cuando es actualizar, contruye el Reactive Form con datos que
   * provienen del componente padre
   * @param menuModel
   */
  setDataToUpdate(menuModel: MenuModel): void {
    this.menuForm?.get('status')?.setValue(menuModel.status);
    this.menuForm?.get('typeMenu')?.setValue(menuModel.typeMenu);

    this.menuForm?.controls['status'].setValue(menuModel.status);
    this.menuForm?.controls['typeMenu'].setValue(menuModel.typeMenu);

    this.menuForm?.updateValueAndValidity();
  }

  /**
   * Cuando la información del formulario es correcta emite un evento
   * con los datos del formulario
   */
  onSubmit(): void {
    console.log(this.menuForm?.valid);
    console.log(this.menuForm?.value);
    this.isSubmit = true;
    if (this.menuForm?.valid) {
   
      let type = this.typesMenu?.find(item => item.id == this.menuForm?.value.typeMenu);
      
      const menu: MenuModel = {
        files: this.menuForm.value.files,
        status: this.menuForm?.value.status,
        typeMenu: type
      }
      this.ngMenuData.emit(menu);
    }
  }

  /*Quita imagenes*/
  onRemoveImage(i: any){
    this.imagePreview.splice(i, 1);
    this.imageMenus.splice(i, 1);
    this.inputElement.nativeElement.value = '';
  }

  /* */
  onImageSelected(event: any) {
    if (event?.target?.files) {
      const files: Array<File> = event.target.files;
      Array.from(files).forEach((file, index) => {
        var reader = new FileReader();
        reader.onload = (e: any) => {
          const imageMenu = {
            mimeType: file.type,
            base: e.target.result
          }

          this.imageMenus.push(imageMenu);
          this.imagePreview.push(e.target.result);

          if (index == (files.length - 1)) {
            this.menuForm?.controls['files'].setValue(this.imageMenus);
            this.menuForm?.updateValueAndValidity();
          }
        }
        reader.readAsDataURL(file);

      });
      console.log(this.menuForm?.value);
    } else {
      console.log("Error en peso de imagen")
    }

  }

}
