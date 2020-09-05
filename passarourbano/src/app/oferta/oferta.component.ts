import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
   //  this.route.params.subscribe((p: any) => this.idOferta = p)

    //Pegando valor pelo snapshop da rota
    this.idOferta = this.route.snapshot.params['id']

    await this.ofertasService.getOfertaPorId(this.idOferta).then((resp)=> this.ofertaEscolhida = resp)
    this.setaListaImagens()
  }
 
  private setaListaImagens() : void {
    this.lstImagens = this.ofertaEscolhida.imagens.slice(1)
  }
}
