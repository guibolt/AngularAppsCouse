import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'app/ofertas.services';
import { ActivatedRoute } from '@angular/router';

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
    
    this.idOferta = this.route.parent.snapshot.params['id']

    this.descricao = await this.ofertaService.getDescricaoPorId(this.idOferta,'onde-fica')
  }

}
