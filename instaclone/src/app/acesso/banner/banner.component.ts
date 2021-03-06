import { Component, OnInit} from '@angular/core';
import { trigger, state, style,transition,animate } from '@angular/animations';
import { Imagem } from './imagem.model';


@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css'],
  animations: [
    trigger('banner', [
      state('escondido', style({
        opacity: 0
      })),
      state('visivel', style({
        opacity: 1
      })),
      transition('escondido <=> visivel', animate('1s ease-in')),
    ])
  ]
})
export class BannerComponent implements OnInit {

  public estado: string = 'escondido'
  public imagens : Imagem[] = [
    { estado: 'visivel', 'url': '/assets/banner-acesso/img_1.png'},
    { estado: 'escondido', 'url': '/assets/banner-acesso/img_2.png'},
    { estado: 'escondido', 'url': '/assets/banner-acesso/img_3.png'},
    { estado: 'escondido', 'url': '/assets/banner-acesso/img_4.png'},
    { estado: 'escondido', 'url': '/assets/banner-acesso/img_5.png'},
  ]

  constructor() { }

  ngOnInit() {
    setTimeout(() => this.logicaRotacao() , 2000);
  }
  public mudarEstado(): void {
    this.estado = this.estado == 'visivel' ? 'escondido' : 'visivel'
  }


  public logicaRotacao(): void {

    let idx : number
    for (let index = 0; index < this.imagens.length; index++) {
      const element = this.imagens[index];


      if(element.estado === 'visivel'){
        element.estado = 'escondido'

        idx = index === 4 ? 0 : index +1
        break
      }
    }

    this.imagens[idx].estado = 'visivel'
    setTimeout(() => this.logicaRotacao() , 2000);
  }
}
