import { Component } from '@angular/core';

@Component({
  template: `
    <main class="flex h-screen">
      <div class="w-full flex flex-col justify-center items-center p-8">
        <img class="mb-4" src="logo.png" alt="Logo del sistema" />
        <div class="flex flex-col items-center gap-9">
          <h1 class="mt-4 text-3xl font-bold text-center">Sistema de Gestión de Matrículas</h1>
          <small class="text-[16px] text-center mb-12 text-[#686767]">
            Accede con tu usuario y contraseña para gestionar tus 
            <br>
            matrículas.
          </small>
        </div>
        <form action="" class="flex flex-col gap-4 items-center w-full">
          <input
            class="border-[#878787] border p-1.5 pl-3.5 w-3/4 h-[61px] rounded-[15px] outline-[#0042FF]"
            type="email"
            placeholder="Correo Electrónico"
            id="email"
            name="email"
            
          />
          <input
            class="border-[#878787] pl-3.5 border p-1.5 w-3/4 h-[61px] rounded-[15px] outline-[#0042FF]"
            type="password"
            placeholder="Contraseña"
            id="password"
            name="password"
            
          />
          

          <span> </span>
          <button class=" p-1.5 w-3/4 h-[61px] rounded-[15px] bg-[#0042FF] text-white" type="button">Iniciar Sesión</button>
        </form>
      </div>
      <img class="h-full aspect-square object-cover hidden lg:block" src="fondo.jpg" alt="" />
    </main>
  `,
})
export class LoginPage {}
