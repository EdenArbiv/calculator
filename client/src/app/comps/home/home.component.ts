import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public _data:DataService, public _fb:FormBuilder) { }
  bool:boolean= false;


  ngOnInit(): void {
    this._data.getData()
  }

  form:FormGroup= this._fb.group({
    type:["",[Validators.required]],
    name:["",[Validators.required]],
    price:["",[Validators.required]]
  })


  action(){
    this.bool = !this.bool
  }
 
}
