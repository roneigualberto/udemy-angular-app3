 import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';


@Injectable()
 export class Bd {


    constructor(private progresso: Progresso) {

    }


    public publicar(publicacao: any): void {

        let nomeImagem = Date.now();

        firebase.storage().ref()
        
        .child(`imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
         (snapshot)=> {
            console.log('sucesso',snapshot);
            this.progresso.status = 'andamento'
            this.progresso.estado = snapshot;
        },
        (error) => {
            console.log('error',error);
             this.progresso.status = 'erro'
        
        },
        () => {
            console.log('upload completo')
            this.progresso.status = 'concluido'
        }
    )


       /* firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo: publicacao.titulo})*/


    }

}