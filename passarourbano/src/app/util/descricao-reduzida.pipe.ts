import { PipeTransform, Pipe } from "@angular/core";

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {
    transform(texto : string, numeroTruncar : number, inicoNumero : number) : string {
        
        if(texto.length > numeroTruncar)
        return texto.substr(inicoNumero, numeroTruncar) + '...'

        return texto
    }

}