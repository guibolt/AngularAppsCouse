import { Component,EventEmitter,Output } from '@angular/core';
import { Frase} from '../shared/frase.model'
import { Frases } from './frases-mock'

@Component({
  selector: 'app-painel',
  templateUrl: './painel.component.html',
  styleUrls: ['./painel.component.css']
})
export class PainelComponent  {
public lstFrases : Frase[] = Frases
public instrucao: string = 'Traduza a frase'
public resposta: string = ''

public rodada : number = 0
public rodadaFrase : Frase
public progresso : number = 0

public tentativas : number = 3

@Output() public encerrarJogo : EventEmitter<string>  = new EventEmitter()

  constructor() { 
    this.atualizaRodada()

  }

 

  setarResposta  (evento : Event): void{
    this.resposta = (<HTMLInputElement>evento.target).value
  }
  
  verificarResposta(): void{

    if(this.rodadaFrase.frasePtBr == this.resposta.toLowerCase()){
      this.rodada++
      this.atualizaRodada()
      this.resposta = ''

      this.progresso += (100/this.lstFrases.length)
      if(this.rodada === 4){
        this.encerrarJogo.emit('vitoria')
      }
      


      alert('A tradução está correta')
    }
     else  {
      this.tentativas--
      if(this.tentativas === -1)
      this.encerrarJogo.emit('derrota')
      this.resposta = ''
     }

  }

  public atualizaRodada(): void {
    this.rodadaFrase = this.lstFrases[this.rodada]
  }
}
