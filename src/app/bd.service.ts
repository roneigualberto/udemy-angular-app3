import * as firebase from 'firebase';
import { Injectable } from '@angular/core';
import { Progresso } from './progresso.service';



@Injectable()
export class Bd {


    constructor(private progresso: Progresso) {

    }


    public publicar(publicacao: any): void {


        console.log(publicacao.email);


        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })

            .then((resposta: any) => {
                let nomeImagem = resposta.key;

                firebase.storage().ref()

                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                    (snapshot) => {
                        console.log('sucesso', snapshot);
                        this.progresso.status = 'andamento'
                        this.progresso.estado = snapshot;
                    },
                    (error) => {
                        console.log('error', error);
                        this.progresso.status = 'erro'

                    },
                    () => {
                        console.log('upload completo')
                        this.progresso.status = 'concluido'
                    }
                    )
            });







    }

    public consultarPublicacoes(email: string): Promise<any> {

        return new Promise((resolve, reject) => {
            firebase.database().ref(`publicacoes/${btoa(email)}`)
                .once('value')
                .then((snapshot) => {

                    let publicacoes: any[] = [];


                    snapshot.forEach((childSnapshot) => {
                        let publicacao = childSnapshot.val();

                        firebase.storage().ref()
                            .child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.url_imagem = url;

                                firebase.database().ref(`usuario_detalhe/${btoa(email)}`)
                                    .once('value').then((snapshot) => {
                                        publicacao.nome_usuario = snapshot.val().nome_usuario
                                        publicacoes.push(publicacao);

                                    })

                            });

                    });

                    resolve(publicacoes);


                })
        });



    }

}