import { Component, OnInit } from '@angular/core';
import { Oferta } from 'app/shared/oferta.model';
import { OfertasService } from 'app/ofertas.services';

@Component({
  selector: 'app-restaurantes',
  templateUrl: './restaurantes.component.html',
  styleUrls: ['./restaurantes.component.css'],
  providers:[
    OfertasService
  ]
})
export class RestaurantesComponent implements OnInit {

  constructor( private ofertasService: OfertasService) { }
  public restauranteOfertas : Oferta[]


  async ngOnInit() {
    await this.ofertasService.getOfertasPorCategoria('restaurante').then((resp)=> this.restauranteOfertas = resp)
  }

}
