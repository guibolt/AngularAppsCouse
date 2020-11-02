import { of } from "rxjs/observable/of";
import { ItemCarrinho } from "./shared/item-carrinho.model";
import { Oferta } from "./shared/oferta.model";

export class CarrinhoService {
private itens : ItemCarrinho[] = []

    public incluirItem(oferta: Oferta): void {
        let itemCarrinho : ItemCarrinho = new ItemCarrinho(
            oferta.id,
            oferta.imagens[0],
            oferta.titulo,
            oferta.descricao_oferta,
            oferta.valor,
            1
        )
        
    let carinhoExistente =  this.itens.find(x => x.id === itemCarrinho.id)

    if(carinhoExistente)
            carinhoExistente.quantidade++
    else
       this.itens.push(itemCarrinho)

    }
    
    public retornaItens (): ItemCarrinho[]{
        return this.itens
    }

    public retornaTotalCarrinho(): number {
        let total: number = 0

        this.itens.forEach( item => total += (item.valor * item.quantidade))

        return total
    }

    public aumentaQtdItem(itemId: number): void{
        let item : ItemCarrinho =  this.itens.find(x => x.id === itemId)
        item.quantidade++
    }

    public diminuiQtdItem(itemId: number): void{
        let item : ItemCarrinho =  this.itens.find(x => x.id === itemId)
        item.quantidade--

            if(item.quantidade === 0){
                let index =  this.itens.indexOf(item)
                this.itens.splice(index,1)
            }
        
    }
    public limparCarrinho() : void {
        this.itens = []
    }
}