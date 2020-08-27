import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public jogoEmAndamento : boolean = true
  public encerramentoVitoria : boolean

  public encerrarJogo(tipo: string): void {
    this.jogoEmAndamento = false
    this.encerramentoVitoria = tipo == 'vitoria' ? true : false
  }
  public reiniciarJogo(): void{
    this.jogoEmAndamento = true
    this.encerramentoVitoria = undefined
  }
}
