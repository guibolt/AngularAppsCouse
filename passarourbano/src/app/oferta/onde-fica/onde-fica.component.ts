import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'app/ofertas.services';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-onde-fica',
  templateUrl: './onde-fica.component.html',
  styleUrls: ['./onde-fica.component.css'],
  providers:[
    OfertasService
  ]
})
export class OndeFicaComponent implements OnInit {

  private idOferta: string 
  public descricao: string

  constructor(private ofertaService : OfertasService, private route: ActivatedRoute) { }

  async ngOnInit() {
    
    this.route.parent.params.subscribe((p : Params) => this.idOferta = p.id)

    this.descricao = await this.ofertaService.getDescricaoPorId(this.idOferta,'onde-fica')
  }

}
