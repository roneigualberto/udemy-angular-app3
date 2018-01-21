import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl } from '@angular/forms';

import { Progresso } from '../../progresso.service';

import { Observable } from 'rxjs/Observable';

import 'rxjs/Rx';

import { Bd } from '../../bd.service';

import * as firebase from 'firebase';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-incluir-publicacao',
  templateUrl: './incluir-publicacao.component.html',
  styleUrls: ['./incluir-publicacao.component.css']
})
export class IncluirPublicacaoComponent implements OnInit {

  public formulario: FormGroup = new FormGroup({
    'titulo': new FormControl(null)
  });

  public email: string = '';
  private imagem: any;

  constructor(private bd: Bd, private progresso: Progresso) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged((user) => {
      this.email = user.email;
    });
  }


  public publicar(): void {
    this.bd.publicar({
      email: this.email,
      titulo: this.formulario.value.titulo,
      imagem: this.imagem[0]
    });

    let acompanhamentoUpload = Observable.interval(1500);


    let continua = new Subject();

    continua.next(true);

    acompanhamentoUpload
      .takeUntil(continua)
      .subscribe(() => {
        console.log(this.progresso.status);
        console.log(this.progresso.estado);

        if (this.progresso.status == 'concluido') {
          continua.next(false);
        }
      })
  }

  public preparaImagemUpload(event: Event): void {

    this.imagem = (<HTMLInputElement>event.target).files;

  }

}
