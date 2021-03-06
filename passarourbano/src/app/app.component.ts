import { Component,OnInit } from '@angular/core';
import * as fb from 'firebase/firebase.js'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  ngOnInit(): void {
    var firebaseConfig = {
      apiKey: "AIzaSyAcQ-Wag-PvaQyWYbOw_i1Aoe832qL9Uf4",
      authDomain: "jta-instagram-clone-a7edb.firebaseapp.com",
      databaseURL: "https://jta-instagram-clone-a7edb.firebaseio.com",
      projectId: "jta-instagram-clone-a7edb",
      storageBucket: "jta-instagram-clone-a7edb.appspot.com",
      messagingSenderId: "55344812961",
      appId: "1:55344812961:web:4525a9b1ec5313b3ddb1e0",
      measurementId: "G-LLY1CTY128"
    };
    // Initialize Firebase
    fb.initializeApp(firebaseConfig);
  
  }
}
