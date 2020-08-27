import { Component, Input,OnChanges } from '@angular/core';

import {Coracao} from '../shared/coracao.model'
import { IfObservable } from 'rxjs/observable/IfObservable';

@Component({
  selector: 'app-tentativas',
  templateUrl: './tentativas.component.html',
  styleUrls: ['./tentativas.component.css']
})
export class TentativasComponent  implements OnChanges {



constructor(){
}

ngOnChanges(): void {
  if(this.tentativas !== this.lstCoracoes.length){
    let indice = this.lstCoracoes.length - (this.tentativas +1)

    let coracao = this.lstCoracoes[indice]
      if(coracao != undefined)
          coracao.cheio = false
  }
  
}

@Input() public tentativas: number 

public lstCoracoes : Coracao[] = [
  new Coracao(true),
  new Coracao(true),
  new Coracao(true)
]

}
