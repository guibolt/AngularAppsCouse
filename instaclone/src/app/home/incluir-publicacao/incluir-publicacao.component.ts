import { Component, EventEmitter, OnInit,Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PublicacaoService } from '../../publicacao.service';
import * as firebase from "firebase/firebase.js";
import { ProgressoService } from '../../progresso.service';
import {Observable} from 'rxjs/Observable'
import 'rxjs/Rx'
import { Subject } from 'rxjs/Rx';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {
  public email: string
  private imagem: any

  public progressoPublicacao : string = 'pendente'
  public porcentagemUpload : number

  @Output()private atualizarTimeline: EventEmitter<any> = new EventEmitter()

  public formulario: FormGroup = new FormGroup({
    'titulo' : new FormControl(null)
  })
  constructor(private publicacaoService : PublicacaoService, private progesso : ProgressoService) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((userObj: any) => this.email = userObj.email  )
  }

  public publicar() : void {
    let novaPublicacao: any = {
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem
    }


    this.publicacaoService.efetuarPublicacao(novaPublicacao)

    let acompanhamentoUpload = Observable.interval(100)
    let continua = new Subject()

    continua.next(true)

    acompanhamentoUpload
    .takeUntil(continua)
    .subscribe(() =>{
      this.progressoPublicacao = 'andamento'

      if(this.progesso.status === 'concluido'){
          this.progressoPublicacao = 'concluido'
          this.atualizarTimeline.emit()
          continua.next(false)
      }
    })
  
  }
  public preparaImagem(evento : Event) : void {
    this.imagem = (<HTMLInputElement>evento.target).files[0]
  }
}
