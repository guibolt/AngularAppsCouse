import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OfertasService } from 'app/ofertas.services';
import { Oferta } from 'app/shared/oferta.model';
import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx'
import { Observer } from 'rxjs/Rx';
@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css'],
  providers:[
    OfertasService
  ]
})
export class OfertaComponent implements OnInit {

  public ofertaEscolhida : Oferta

  public lstImagens : any[]

  private idOferta: string
  constructor( 
    private route : ActivatedRoute,
    private ofertasService: OfertasService
   ) {}

  async ngOnInit() {
    // Pegando utilziando o subscribe 
   //  this.route.params.subscribe((p: any) => this.idOferta = p)

    //Pegando valor pelo snapshop da rota
    this.idOferta = this.route.snapshot.params['id']

    await this.ofertasService.getOfertaPorId(this.idOferta).then((resp)=> this.ofertaEscolhida = resp)
    this.setaListaImagens()

    // Observavel na rota
    // this.route.params.subscribe((p : any) =>{
    //   console.log('param', p)
    // },(e) =>{
    //   console.log('teve um erro', e)
    // },()=>{
    //   console.log('completo')
    // })

    //Observavel de incremento numerico
    // let tempo = Observable.interval(2000)
    // tempo.subscribe(((intervalo : Number) => console.log(intervalo)))


        //Observavel busca a ação
    let meuObservableTeste = Observable.create((observer : Observer<any>)=>{
      observer.next('primeiro evento da stream')
      observer.next(52)
      observer.complete()
      observer.error('erro ao continuar')
    })
      // Observador esperando o resultado e tratando
    meuObservableTeste.subscribe((result: any) => console.log(result),(erro) => console.log(erro),() => console.log('fechou'))

  }
 
  private setaListaImagens() : void {
    this.lstImagens = this.ofertaEscolhida.imagens.slice(1)
  }
}
