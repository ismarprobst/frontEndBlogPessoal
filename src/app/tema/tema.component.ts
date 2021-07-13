import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Tema } from '../model/Tema';
import { AlertasService } from '../service/alertas.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-tema',
  templateUrl: './tema.component.html',
  styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {

  listaTemas: Tema[]
  tema: Tema = new Tema() 

  constructor(
    private router: Router,
    private temaService: TemaService,
    private alertas: AlertasService
  ) { }

  ngOnInit() {
    if (environment.token == ''){
      //alert('Sua sessão expirou, faça login novamente.')
      this.router.navigate(['/entrar'])
    }

    if(environment.tipo != "adm"){
      this.alertas.showAlertInfo('Você precisa ser administrador para acessar esta rota')
      this.router.navigate(['/inicio'])
    }

    this.temaService.refreshToken()

    this.findlAllTemas()
  }

  findlAllTemas(){
    this.temaService.getAllTema().subscribe((resp: Tema[])=>{
      this.listaTemas = resp
    })
  }

  cadastrar(){
    this.temaService.postTema(this.tema).subscribe((resp: Tema)=>{
      this.tema = resp
      this.alertas.showAlertSuccess('Tema cadastrado com sucesso!')
      this.findlAllTemas()
      this.tema = new Tema() // fazemos isso para zerar o campo e poder cadastrar outro tema.
    })
  }

}
