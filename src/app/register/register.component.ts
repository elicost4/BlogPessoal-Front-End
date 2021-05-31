import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User = new User
  confirmPassword: string
  typeUser: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)
  }

  confirmSenha(event: any ) {
    this.confirmPassword = event.target.value
  }

  tipoUser(event: any) {
    this.typeUser = event.target.value
  }

  cadastrar() {
    this.user.tipo = this.typeUser

      if(this.user.senha != this.confirmPassword) {
        alert('As senhas são diferentes.')
      } else {
        this.authService.cadastrar(this.user).subscribe((resp: User) =>{
          this.user = resp
          this.router.navigate(['/login'])
          alert('Usuario cadastrado com sucesso!')
        })
      }
  }

}
