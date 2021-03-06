import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import {FormGroup, FormControl} from '@angular/forms'
import { Autenticacao } from '../../autenticacao.service';
import { Usuario } from '../usuario.model';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {

  @Output() public emitter : EventEmitter<string> = new EventEmitter()
  constructor(
    private auth : Autenticacao
  ) { }

  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'nomeCompleto': new FormControl(null),
    'nomeUsuario': new FormControl(null),
    'senha': new FormControl(null)
  })

  ngOnInit() {
  }

  public exibirPainelLogin() : void {
    this.emitter.emit('login')
  }
  public cadastrarUsuario() : void {
    let usuario : Usuario = new Usuario(
      this.formulario.value.email,
      this.formulario.value.nomeCompleto,
      this.formulario.value.nomeUsuario,
      this.formulario.value.senha
    )
      console.log(usuario)
   this.auth.cadastrarUsuario(usuario)
   .then(() => this.exibirPainelLogin())
  }
}
