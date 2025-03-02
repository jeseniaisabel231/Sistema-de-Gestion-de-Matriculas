import { Component, inject, Inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouteConfigLoadEnd, Router } from '@angular/router';

@Component({
  imports: [ReactiveFormsModule],
  template: `
    <main class="flex h-screen">
      <div class="w-full flex flex-col justify-center items-center p-8">
        <img class="mb-4" src="logo.png" alt="Logo del sistema" />
        <div class="flex flex-col items-center gap-9">
          <h1 class="mt-4 text-3xl font-bold text-center">
            Sistema de Gestión de Matrículas
          </h1>
          <small class="text-[16px] text-center mb-12 text-[#686767]">
            Accede con tu usuario y contraseña para gestionar tus
            <br />
            matrículas.
          </small>
        </div>
        <form
          class="flex flex-col gap-4 items-center w-full "
          (ngSubmit)="onSubmit()"
          [formGroup]="formulario"
        >
          <div class="relative w-2/3">
            <svg
              class="absolute left-3 inset-y-0 my-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="19"
              fill="none"
            >
              <path
                d="M21.875 0H3.125C2.296 0 1.502.32.916.886A2.977 2.977 0 0 0 0 3.023v12.954c0 .802.33 1.57.916 2.137.586.566 1.38.885 2.209.886h18.75c.828 0 1.623-.32 2.209-.886A2.977 2.977 0 0 0 25 15.977V3.023c0-.802-.33-1.57-.916-2.137A3.183 3.183 0 0 0 21.875 0Zm-.791 5-8.036 6.045a.913.913 0 0 1-1.096 0L3.916 5a.874.874 0 0 1-.347-.576.836.836 0 0 1 .18-.643.885.885 0 0 1 .6-.328.922.922 0 0 1 .663.183L12.5 9.27l7.488-5.634a.915.915 0 0 1 1.243.16A.843.843 0 0 1 21.084 5Z"
                fill="#3B3D3E"
              />
            </svg>
            <input
              class="border-[#878787] border p-1.5 pl-12 w-full h-[50px] rounded-[15px] outline-[#0042FF]"
              type="email"
              placeholder="Correo Electrónico"
              id="email"
              name="email"
              formControlName="email"
            />
          </div>
          <div class="relative w-2/3 ">
            <svg
              class="absolute left-3 inset-y-0 my-auto"
              xmlns="http://www.w3.org/2000/svg"
              width="17"
              height="21"
              fill="none"
            >
              <path
                d="M13.91 7.7h-.774V4.2c0-1.114-.488-2.182-1.358-2.97C10.908.442 9.73 0 8.5 0S6.091.442 5.222 1.23c-.87.788-1.358 1.856-1.358 2.97v3.5H3.09c-.82 0-1.605.296-2.185.821C.326 9.046.001 9.758 0 10.5v7.7c0 .742.327 1.454.906 1.979.58.525 1.365.82 2.185.821h10.818c.82 0 1.605-.296 2.185-.821.58-.525.905-1.237.906-1.979v-7.7c0-.742-.327-1.454-.906-1.979a3.264 3.264 0 0 0-2.185-.821Zm-2.32 0H5.41V4.2c0-.743.325-1.455.904-1.98A3.261 3.261 0 0 1 8.5 1.4c.82 0 1.606.295 2.186.82.58.525.905 1.237.905 1.98v3.5Z"
                fill="#3B3D3E"
              />
            </svg>
            <input
              class="border-[#878787] pl-12 border p-1.5 w-full h-[50px] rounded-[15px] outline-[#0042FF] "
              [type]="password ? 'text' : 'password'"
              placeholder="Contraseña"
              id="password"
              name="password"
              formControlName="password"
            />
            <div
              class="flex items-center justify-center absolute right-3 inset-y-0"
            >
              @if (!password) {

              <svg
                class="cursor-pointer"
                (click)="password = !password"
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#3B3D3E"
              >
                <path
                  d="M792-56 624-222q-35 11-70.5 16.5T480-200q-151 0-269-83.5T40-500q21-53 53-98.5t73-81.5L56-792l56-56 736 736-56 56ZM480-320q11 0 20.5-1t20.5-4L305-541q-3 11-4 20.5t-1 20.5q0 75 52.5 127.5T480-320Zm292 18L645-428q7-17 11-34.5t4-37.5q0-75-52.5-127.5T480-680q-20 0-37.5 4T408-664L306-766q41-17 84-25.5t90-8.5q151 0 269 83.5T920-500q-23 59-60.5 109.5T772-302ZM587-486 467-606q28-5 51.5 4.5T559-574q17 18 24.5 41.5T587-486Z"
                />
              </svg>
              }@else{
              <svg
                class="cursor-pointer "
                (click)="password = !password"
                xmlns="http://www.w3.org/2000/svg"
                height="24"
                viewBox="0 -960 960 960"
                width="24"
                fill="#3B3D3E"
              >
                <path
                  d="M480-320q75 0 127.5-52.5T660-500q0-75-52.5-127.5T480-680q-75 0-127.5 52.5T300-500q0 75 52.5 127.5T480-320Zm0-72q-45 0-76.5-31.5T372-500q0-45 31.5-76.5T480-608q45 0 76.5 31.5T588-500q0 45-31.5 76.5T480-392Zm0 192q-146 0-266-81.5T40-500q54-137 174-218.5T480-800q146 0 266 81.5T920-500q-54 137-174 218.5T480-200Z"
                />
              </svg>

              }
            </div>
          </div>
          <p class="text-star  flex text-[14px] text-red-700 mr-36 mt-4">
              {{validacion}}
          </p>
          <button
            class=" p-1.5 w-2/3 h-[50px] rounded-[15px] bg-[#0042FF] text-white"
          >
            Iniciar Sesión
          </button>
        </form>
      </div>
      <img
        class="h-full aspect-square object-cover hidden lg:block"
        src="fondo.jpg"
        alt=""
      />
    </main>
  `,
})
export class LoginPage {
  private serviceAuth = inject(AuthService);
  private serviceRouter = inject(Router); //para las rutas

  //variable del ojito
  public password = false;

  //para la contrasena o email
  public validacion = "";

  public formulario = new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]), //valodacion de correo y que no sea vacio: required
    password: new FormControl('', [
      Validators.minLength(8),
      Validators.required,
    ]),
  });
  //crear un metodo para utilizar cada vez que se presiona un boton
  onSubmit() {
    console.log(this.formulario.value);
    if (this.formulario.valid) {
      //metodo creado en el authservice(login)
      this.serviceAuth
        .login(this.formulario.value.email!, this.formulario.value.password!)
        .subscribe({
          next: (response) => {
            this.serviceRouter.navigate(['/modulo-materias']); //me redireccion a la pantalla de materias, si la peticion fue exitosa
            console.log(response);
          },error:({error}:{error:any})=>{
            console.log(error)
            this.validacion = error.response//error.response y este contiene el mensaje
          }
        });
      //obtiene los datos de login y da a entender! que no sera vacio
    }else{
      this.validacion = 'Complete correctamente los campos'
    }
    setTimeout(()=>{
      this.validacion=""
    },4000)
  }
}
