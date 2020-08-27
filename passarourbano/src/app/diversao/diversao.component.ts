import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'app/ofertas.services';
import { Oferta } from 'app/shared/oferta.model';

@Component({
  selector: 'app-diversao',
  templateUrl: './diversao.component.html',
  styleUrls: ['./diversao.component.css'],
  providers:[
    OfertasService
  ]
})
export class DiversaoComponent implements OnInit {

  constructor(public ofertasService: OfertasService) { }
  public diversaoOfertas: Oferta[]
  async ngOnInit() {
    await this.ofertasService.getOfertasPorCategoria('diversao')
    .then((resp) => this.diversaoOfertas = resp)
  }

}
