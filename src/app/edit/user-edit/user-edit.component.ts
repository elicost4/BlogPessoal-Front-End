import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/model/User';
import { AlertasService } from 'src/app/service/alertas.service';
import { AuthService } from 'src/app/service/auth.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  user: User = new User()
  idUser: number
  confirmPassword: string
  typeUser: string


  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private alertas: AlertasService
    
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == '') {
      this.alertas.showAlertInfo('Sua sessão expirou, faça o login novamente.')
      this.router.navigate(['/login'])
    }

    this.idUser = this.route.snapshot.params['id']
    this.findByUser(this.idUser)
  }

  confirmSenha(event: any ) {
    this.confirmPassword = event.target.value
  }

  tipoUser(event: any) {
    this.typeUser = event.target.value
  }

  atualizar() {
    this.user.tipo = this.typeUser

      if(this.user.senha != this.confirmPassword) {
        this.alertas.showAlertDanger('As senhas são diferentes.')
      } else {
        this.authService.cadastrar(this.user).subscribe((resp: User) =>{
          this.user = resp
          this.router.navigate(['/login'])
          this.alertas.showAlertSuccess('Usuário atualizado com sucesso, faça o login novamente')
          environment.token = ''
          environment.nome = ''
          environment.foto = ''
          environment.id = 0
          this.router.navigate(['/login'])
        })
      }
  }

  findByUser(id: number) {
    this.authService.getByIdUser(id).subscribe((resp: User) => {
      this.user = resp
    })
  }

}
