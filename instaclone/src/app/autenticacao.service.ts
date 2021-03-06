import { Usuario } from "./acesso/usuario.model";
import * as firebase from "firebase/firebase.js";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
@Injectable()
export class Autenticacao {

    public token_id: string

    constructor(private router: Router){}

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
        // console.log('Chegamos até o serviço: ', usuario)

       return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resp: any) => {
                console.log(resp)
                /* Vamos somente gravar o e-mail do usuário, não
                queremos salvar no path usuario_detalhe a senha dele,
                logo, usaremos o delete */
                delete usuario.senha
                /* Estamos salvando os dados complementares do usuário no path usuario_detalhe
                em formato de base64, pela função nativa btoa do JS */
                console.log(usuario)
                let emailEmBase64 = btoa(usuario.email)
                console.log(emailEmBase64)

                firebase.database().ref(`usuario_detalhe/${emailEmBase64}`)
                    .set(usuario)
            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    public autenticarUsuario(email: string, senha : string) : void {
        firebase.auth().signInWithEmailAndPassword(email,senha)
        .then((resp: any) =>{
            firebase.auth().currentUser.getIdToken().then((idToken: string) =>{
                this.token_id = idToken
                localStorage.setItem('idToken',idToken)
                this.router.navigate(['/home'])
            })
        })
        .catch((error: Error) => console.log(error))
    }

    public estaAutenticado(): boolean {
      if(!this.token_id)
            this.token_id = localStorage.getItem('idToken')

      if(this.token_id === null)
            this.router.navigate(['/'])      

        return this.token_id !== undefined


    }
    public efetuarLogout(): void {
        firebase.auth().signOut().then(() => {
            this.token_id = undefined
            localStorage.removeItem('idToken')
            localStorage.removeItem('firebase:host:jta-instagram-clone-a7edb.firebaseio.com')
            this.router.navigate(['/'])
        })
    }
}