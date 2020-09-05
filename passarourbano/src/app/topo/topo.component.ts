import { Component, OnInit } from '@angular/core';
import { OfertasService } from 'app/ofertas.services';
import { Observable } from 'rxjs/Observable';
import { Oferta } from 'app/shared/oferta.model';
import { Subject } from 'rxjs/Subject';
import { switchMap } from 'rxjs/operators'

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
  private subjectPesquisa: Subject<string> = new Subject<string>()

  constructor(private ofertasService : OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa.pipe(
      switchMap((termo: string) => {
        console.log('requisicao http')
        return this.ofertasService.pesquisaOfertas(termo)
      })
    );
    this.ofertas.subscribe((ofertas : Oferta[]) => console.log(ofertas))
  }
  public Pesquisar(termoBusca: string): void {
    console.log('key up caracter:', termoBusca)
    this.subjectPesquisa.next(termoBusca)
  }
}
