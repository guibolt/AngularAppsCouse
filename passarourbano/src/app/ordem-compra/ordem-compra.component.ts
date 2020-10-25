import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OrdemCompraService } from 'app/ordem-compra.services';
import { toArray } from 'rxjs/operators';
import { Pedido } from '../shared/pedido.model'

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers: [OrdemCompraService  ]
})
export class OrdemCompraComponent implements OnInit {

  public idPedido : number

  public formulario : FormGroup = new FormGroup({
    'endereco': new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(120)]),
    'numero' : new FormControl(null,[Validators.required,Validators.minLength(1),Validators.maxLength(20)]),
    'complemento': new FormControl(null),
    'formaPagamento': new FormControl(null,[Validators.required]),
  })

  constructor(private ordemCompraService: OrdemCompraService) { }

  ngOnInit() {
    
  }

  public confirmarCompra(): void {
  
    if(this.formulario.status === 'INVALID')
        this.marcarComoInvalido()
    else {
        let novoPedido : Pedido = new Pedido(
          this.formulario.value.endereco,
          this.formulario.value.numero,
          this.formulario.value.complemento,
          this.formulario.value.formaPagamento
        )
      
        this.ordemCompraService.efetivarCompras(novoPedido)
        .subscribe((pedidoId: number) =>
          this.idPedido = pedidoId
        )

    }
  }


  private marcarComoInvalido(){
    this.formulario.get('endereco').markAsTouched()
      this.formulario.get('numero').markAsTouched()
      this.formulario.get('formaPagamento').markAsTouched()
      this.formulario.get('complemento').markAsTouched()
  }
}
