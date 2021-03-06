import { Injectable } from "@angular/core";
import * as firebase from "firebase/firebase.js";
import { ProgressoService } from "./progresso.service";

@Injectable()
export class PublicacaoService{

    constructor(private progresso: ProgressoService){}

    public efetuarPublicacao(publicacao: any): void {
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key
                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        /* Evento on() armazena os eventos
                    da tarefa de upload pro storage do firebase*/
                        (snapshot: any) => {
                            //aqui iremos acompanhar o progresso do upload
                            this.progresso.status = "andamento"
                            this.progresso.estado = snapshot
                           //  console.log("Snapshot capturado no on()->",snapshot)
                        },
                        (error) => {
                            this.progresso.status = "erro"
                              console.log(error)   
                        },
                        () => {
                            this.progresso.status = 'concluido'
                            console.log("upload completo")
                        })
            })
    }


    public consultaPublicacoes(emailUsuario: string): Promise<any> {

       return new Promise((resolve, reject) =>{
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
            .orderByKey()
            .once('value')
            .then((snapshot: any) =>{
    
                let publicacoes : any[] = []
    
                snapshot.forEach((child: any) => {
                   let publicacao = child.val()
                   publicacao.key = child.key

                   publicacoes.push(publicacao)
                })
    
               return publicacoes.reverse()
            })
            .then((publicacoes: any) =>{
                publicacoes.forEach((publicacao) =>{
                firebase.storage().ref()
            .child(`imagens/${publicacao.key}`)
            .getDownloadURL()
            .then((url: string) =>{
                publicacao.url_imagem = url
                
                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                .once('value')
                .then((resp: any) => publicacao.nome_usuario = resp.val().nomeUsuario)
                    })
                })
                resolve(publicacoes)
            })
        })
       
    }
}



    
