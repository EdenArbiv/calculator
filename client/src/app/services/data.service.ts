import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import Action from '../models/action.model';
import User from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(public router:Router,  public snakebar:MatSnackBar) { }

  actionsArr:Action[]= [];
  error:string= "";
  local = "";
  currentaccount:number= 0;
  name ="" ;
 

  async loginUser(body:{form:User}){
    const res = await fetch('http://localhost:1000/login',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify(body),
      credentials:"include"
    })
    const data = await res.json()
    if(res.status == 400){
      this.error = data.err
    
    }else{
      console.log(data)
       this.router.navigate(['/home']);
      localStorage['username'] = data.username
      this.local= localStorage.getItem('username') || '{}'
    }
  }

  async logoutUser(){
    const res = await fetch('http://localhost:1000/logout',{
      method:'DELETE',
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.router.navigate(['/login']);
    localStorage.removeItem('username')
    this.local= ""
    
  }

  async register(body:{form:User}){
    const res = await fetch('http://localhost:1000/register',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify(body)
    })
    const data = await res.json()
    if(res.status == 400){
      this.error = data.err
    }else{
      this.error=""
      this.router.navigate(['/login']);
      console.log(data)
    }
  }

  async getData(){
    const res = await fetch(`http://localhost:1000/`,{
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.actionsArr= data.detail;
    this.name = data.datauser[0].name;
    this.currentaccount = data.datauser[0].money
  }

  async addAction(body:{form:User}){
    const res = await fetch('http://localhost:1000/',{
      method:'POST',
      headers: { 'content-type':'application/json' },
      body: JSON.stringify(body),
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.getData()
  }

  async delAction(id:string){
    const res = await fetch(`http://localhost:1000/${id}`,{
      method:'PUT',
      headers: { 'content-type':'application/json' },
      credentials:"include"
    })
    const data = await res.json()
    console.log(data)
    this.getData()
  }


}
