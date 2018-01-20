import { Usuario } from "./acesso/usuario.model";
import * as firebase from 'firebase';



export class Autenticacao {

    public token_id: string;

    public cadastrarUsuario(usuario: Usuario): Promise<any> {
       return  firebase.auth()
        .createUserWithEmailAndPassword(usuario.email, usuario.senha)
        .then((resposta: any) => {
            delete usuario.senha;

           firebase.database()
                   .ref(`usuario_detalhe/${btoa(usuario.email)}`)
                   .set(usuario);
        }).catch((error: any) => {
            console.log(error);
        })
    }


    public autenticar(email: string, senha: string): void {
        firebase.auth().signInWithEmailAndPassword(email,senha)
        .then((resposta: any) => {
            firebase.auth().currentUser.getIdToken().then( (idToken: string) => {
                this.token_id = idToken;
            }) 
        })
        .catch((error: Error) => console.log(error))
    }
}