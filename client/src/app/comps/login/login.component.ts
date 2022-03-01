import { DataService } from './../../services/data.service';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(public _fb:FormBuilder, public _data:DataService) { }

  hide = true;
  form:FormGroup= this._fb.group({
    username:["",[Validators.required]],
    password:["",[Validators.required]]
  })

  ngOnInit(): void {
  }
  
}

