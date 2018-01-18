import { Component, OnInit } from '@angular/core';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';


  ngOnInit(): void {
    // Initialize Firebase
    let config = {
      apiKey: "AIzaSyDP6PZ3vk3RUYiPAXDYiXci15zs9xuuEVE",
      authDomain: "jta-instagran-clone-69163.firebaseapp.com",
      databaseURL: "https://jta-instagran-clone-69163.firebaseio.com",
      projectId: "jta-instagran-clone-69163",
      storageBucket: "jta-instagran-clone-69163.appspot.com",
      messagingSenderId: "200917085093"
    };
    firebase.initializeApp(config);
  }


}
