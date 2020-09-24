import { Injectable } from "@angular/core";
import { Pedido } from "./shared/pedido.model";
import { Headers, Http, RequestOptions, Response} from '@angular/http'
import { Observable } from "rxjs/Observable";
import { Url_api} from './app.api'
@Injectable()
export class OrdemCompraService {
    constructor(private http: Http){}
    
    public efetivarCompras(pedido: Pedido): Observable<any>{
        let headers: Headers = new Headers()
        headers.append('Content-type', 'application/json')

        return this.http.post(
            `${Url_api}pedidos`,
            JSON.stringify(pedido),
            new RequestOptions({headers: headers})
          ).map((resp: Response) => resp.json().id)
    }
}