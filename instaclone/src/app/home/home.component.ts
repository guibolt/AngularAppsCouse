import { Component, OnInit, ViewChild } from '@angular/core';
import * as firebase from "firebase/firebase.js";
import { Autenticacao } from '../autenticacao.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor( private autenticacao: Autenticacao) { }
  private email: string 
  @ViewChild('publicacoes') public publicacoes: any

  ngOnInit() {
    firebase.auth().onAuthStateChanged((userObj: any) => this.email = userObj.email)
  }

  public sair():void {
    this.autenticacao.efetuarLogout()
  }

  public atualizarTimeLine(): void {
    this.publicacoes.atualizarTimeLine(this.email)
  }
}
