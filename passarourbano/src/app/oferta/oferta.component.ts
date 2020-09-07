import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { OfertasService } from 'app/ofertas.services';
import { Oferta } from 'app/shared/oferta.model';


@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[
    OfertasService
  ]
})
export class OfertaComponent implements OnInit,OnDestroy {

  public ofertaEscolhida : Oferta
  public lstImagens : any[]

  private idOferta: string
  constructor( 
    private route : ActivatedRoute,
    private ofertasService: OfertasService
   ) {}

  ngOnDestroy(): void {

  }

  async ngOnInit() {
    // Pegando utilziando o subscribe 
     //this.route.params.subscribe((p: any) => this.idOferta = p)

    //Pegando valor pelo snapshop da rota
    this.route.params.subscribe((params: Params) => {

       this.ofertasService.getOfertaPorId(params.id).then((resp) => this.ofertaEscolhida = resp);
    })
    this.setaListaImagens()
  }
 
  private setaListaImagens() : void {
    this.lstImagens = this.ofertaEscolhida.imagens.slice(1)
  }
}
