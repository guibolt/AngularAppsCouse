import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'app/ofertas.services';

@Component({
  selector: 'app-como-usar',
  templateUrl: './como-usar.component.html',
  styleUrls: ['./como-usar.component.css'],
  providers: [
    OfertasService
  ]
})
export class ComoUsarComponent implements OnInit {

  private idOferta: string 
  public descricao: string

  constructor(
    private route : ActivatedRoute, 
     private ofertaService : OfertasService
     ) { }

  async ngOnInit() {

    this.idOferta = this.route.parent.snapshot.params['id']

    this.descricao = await this.ofertaService.getDescricaoPorId(this.idOferta,'como-usar')
    
  }

}
