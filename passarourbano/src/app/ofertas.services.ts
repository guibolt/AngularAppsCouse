import {Oferta }  from './shared/oferta.model'
import { Http, Response} from '@angular/http'
import {Injectable} from '@angular/core'
import 'rxjs/add/operator/toPromise'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/retry'
import { Url_api } from './app.api'
import { Observable } from 'rxjs/Observable'

@Injectable()
export class OfertasService {
	constructor(private http: Http){}

    public async getOfertas(): Promise<Oferta[]> {
		const resp = await this.http.get(`${Url_api}ofertas?destaque=true`)
			.toPromise()
		return resp.json()
	 }

	public async getOfertasPorCategoria(categoria: string): Promise<Oferta[]>{
		const resp = await this.http.get(`${Url_api}ofertas?categoria=${categoria}`)
		.toPromise()
		return resp.json()
	}

	public async getOfertaPorId(id: string) : Promise<Oferta>{
		const resp = await this.http.get(`${Url_api}ofertas/${id}`)
		.toPromise()
		return resp.json()
	}
	public async getDescricaoPorId(id: string, tipo: string ): Promise<string>{
		const resp = await this.http.get(`${Url_api}${tipo}/${id}`)
		.toPromise()
		const obj = resp.json()
		return obj.descricao
	}

	public pesquisaOfertas(termo: string) : Observable<Oferta[]>{
		return this.http.get(`${Url_api}ofertas?descricao_oferta_like=${termo}`)
		.retry()
		.map((resp: Response) => resp.json())
	}
}