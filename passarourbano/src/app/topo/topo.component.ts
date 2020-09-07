import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'app/ofertas.services';
import { Observable } from 'rxjs/Observable';
import { Oferta } from 'app/shared/oferta.model';
import { Subject } from 'rxjs/Subject';
import { switchMap,debounceTime,distinctUntilChanged,catchError } from 'rxjs/operators'
import 'rxjs/add/observable/of';


@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers:[
    OfertasService
  ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>
  public lstOfertas : Oferta[]
  private subjectPesquisa: Subject<string> = new Subject<string>()
  public valor : string = ''

  constructor(private ofertasService : OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      debounceTime(1000), // executa a ação depois do tempo passado
      distinctUntilChanged(), //se o termo for diferente do termo anterior, ele executa uma nova requisição
      switchMap((termo: string) => {
        if (termo.trim() == '') 
           return Observable.of<Oferta[]>([])
        
        return this.ofertasService.pesquisaOfertas(termo)
       }),
       catchError ((erro) => {
         console.log(erro)
         return Observable.of<Oferta[]>([])
        })
    )
    this.ofertas.subscribe((ofertas : Oferta[]) => 
      this.lstOfertas = ofertas
    )
  }
  public Pesquisar(termoBusca: string): void {  
    console.log('key up caracter:', termoBusca)
    this.subjectPesquisa.next(termoBusca)
  }
  public limpaPesquisa() : void{
    this.subjectPesquisa.next('')
    this.valor = ''
     
  }
}
