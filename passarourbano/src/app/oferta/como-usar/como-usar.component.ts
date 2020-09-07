import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
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

     this.route.parent.params.subscribe((p : Params) => this.idOferta = p.id)

    this.descricao = await this.ofertaService.getDescricaoPorId(this.idOferta,'como-usar')
    
  }

}
