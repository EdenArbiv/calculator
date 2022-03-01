import { DataService } from './../../services/data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public _fb:FormBuilder, public _data:DataService) { }

  hide = true;
  form:FormGroup= this._fb.group({
    name:["",[Validators.required]],
    money:["",[Validators.required]],
    username:["",[Validators.required]],
    password:["",[Validators.required]]
  })

  ngOnInit(): void {
  }

}
