import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Autenticacao } from '../../autenticacao.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  @Output() public exibirPainel : EventEmitter<string> = new EventEmitter()
  
  public formulario: FormGroup = new FormGroup({
    'email': new FormControl(null),
    'senha': new FormControl(null)
  })
  constructor(private autenticacao: Autenticacao) { }

  ngOnInit() {
  }
  public exibirPainelCadastro() : void {
    this.exibirPainel.emit('cadastro')
  }

  public autenticar(): void {
    this.autenticacao.autenticarUsuario(
      this.formulario.value.email,
      this.formulario.value.senha
      )
  }
}
