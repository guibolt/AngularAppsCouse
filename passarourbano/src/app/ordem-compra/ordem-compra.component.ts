import { Component, OnInit } from '@angular/core';
import { OrdemCompraService } from 'app/ordem-compra.services';
import { Pedido } from 'app/shared/pedido.model';

@Component({
  selector: 'app-ordem-compra',
  templateUrl: './ordem-compra.component.html',
  styleUrls: ['./ordem-compra.component.css'],
  providers:[
    OrdemCompraService
  ]
})
export class OrdemCompraComponent implements OnInit {
  public idPedidoCompra : number

  public endereco: string = ''
  public numero : string =''
  public complemento : string = ''
  public formaPagamento: string = ''

  // controle de validação dos campos

  public enderecoValido: boolean
  public numeroValido: boolean
  public complementoValido: boolean
  public formaPagamentoValido: boolean

  // estados primitivos dos campos (pristine)
  public endPrimitivo: boolean = true
  public numPrimitivo: boolean = true
  public compPrimitivo: boolean = true
  public formPrimitivo: boolean = true

  //controlar botao e compra 
  public formEstado :string = 'disabled'


  constructor(private ordemCompraService : OrdemCompraService) { }

  ngOnInit() {
    
  }
    public atualizaEndereco(endereco: string) : void {
      this.endereco = endereco
      this.endPrimitivo = false

      if(this.endereco.length > 3)
           this.enderecoValido = true
      else
          this.enderecoValido = false
        this.habilitaForma()
    }
    public atualizaNumero(numero: string) : void {
      this.numero = numero
      this.numPrimitivo = false

      if(this.numero.length > 0)
          this.numeroValido = true
      else
          this.numeroValido = false
          this.habilitaForma()
    }
    public atualizaComplemento(complemento: string) : void {
      this.complemento = complemento
      this.compPrimitivo = false

      if(this.complemento.length > 0)
          this.complementoValido = true
      else
          this.complementoValido = false
          this.habilitaForma()
    }
    public atualizaFormaPagamento(formaPagamento: string) : void {
      this.formaPagamento = formaPagamento
      this.formPrimitivo = false

      if(this.formaPagamento.length > 0)
          this.formaPagamentoValido = true
     else
        this.formaPagamentoValido = false

        this.habilitaForma()
    }

    public habilitaForma(): void {
      if(this.enderecoValido && this.numeroValido && this.formaPagamentoValido)
          this.formEstado = ''
      else
      this.formEstado ='disabled'
    }

    public confirmarCompra(): void {
        let novoPedido : Pedido = new Pedido(this.endereco,this.numero,this.complemento,this.formaPagamento)

      this.ordemCompraService.efetivarCompras(novoPedido)
      .subscribe((resp: number) =>
       this.idPedidoCompra = resp
    )
    }
}
