import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { LoginService } from 'src/app/services/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isNew: boolean;
  user = new User();
  logInForm: FormGroup;
  createForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private loginservice: LoginService, private router: Router) {
  }

  ngOnInit(): void {
    this.logInForm = this.formBuilder.group({
      email: ['', Validators.required],
      nameUser: ['', Validators.required],
      password: ['', Validators.required],
      birthday: ['', Validators.required]
    });
  }

  onLoginGoogle() {
    this.loginservice.loginGoogle().then(res => {
      this.router.navigate(['/home'])
    });
  }


  ingresar() {
    this.loginservice.loginEmail(this.logInForm.value['email'], this.logInForm.value['password']).then((response) => {
      if (response != null) {
        this.router.navigate(['/home']);
        console.log(response);
      }
      else {
        console.log("Estoy nulo");
      }

    },
      error => alert(error));
  }

  goRegister() {
    this.isNew = true;
  }

  formUser(): void {
    if (this.logInForm.valid) {
      this.user = { ...this.logInForm.value };
      this.createUser();
    }
    else {
      alert("Formulario Invalido");
    }

  }

  createUser(): void {
    this.loginservice.register(this.logInForm.value['email'], this.logInForm.value['password']).then((response) => {
      if (response != null) {
        this.isNew = false;
        this.logInForm.reset();
      }
      else {
        alert('Tuvimos un error creando el usuario');
        console.log("Estoy nulo");
      }

    },
      error => alert(error));
  }

}
