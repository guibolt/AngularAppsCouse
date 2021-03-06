import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase/firebase.js";
import { PublicacaoService } from '../../publicacao.service';

@Component({
  selector: 'app-publicacoes',
  templateUrl: './publicacoes.component.html',
  styleUrls: ['./publicacoes.component.css']
})
export class PublicacoesComponent implements OnInit {

  public publicacoes : any 
  constructor(private publicacoesService : PublicacaoService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((userObj: any) =>  this.atualizarTimeLine(userObj.email))
  }

  public atualizarTimeLine(emailUsuario: string): void {
    this.publicacoesService.consultaPublicacoes(emailUsuario).then((resp: any) => this.publicacoes = resp)
  }
}
