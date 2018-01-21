 import * as firebase from 'firebase';
export class Bd {


    public publicar(publicacao: any): void {

        let nomeImagem = Date.now();

        firebase.storage().ref()
        
        .child(`imagens/${nomeImagem}`)
        .put(publicacao.imagem)
        .on(firebase.storage.TaskEvent.STATE_CHANGED,
         (snapshot)=> {
            console.log('sucesso',snapshot);
        },
        (error) => {
            console.log('error',error);
        },
        () => {
            console.log('upload completo')
        }
    )


       /* firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
        .push({titulo: publicacao.titulo})*/


    }

}