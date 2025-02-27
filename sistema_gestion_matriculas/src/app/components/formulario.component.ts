import { TitleCasePipe } from '@angular/common';
import {
  Component,
  effect,
  ElementRef,
  input,
  model,
  viewChild,
  SimpleChanges,
} from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

export type TituloForms = 'estudiante' | 'materia' | 'matricula'; //representacion de la clave
export type Actions = 'Registrar' | 'Actualizar' | 'Visualizar';

@Component({
  selector: 'formulario',
  imports: [TitleCasePipe, ReactiveFormsModule],
  template: `
    @if (mostrarModal()) {

    <dialog
      #modal
      class="flex flex-col m-auto bg-white backdrop:backdrop-blur-xs rounded-[15px]"
    >
      <div
        class="flex  items-center bg-[#4F9CFF] p-3 rounded-t-[15px] justify-between px-7"
      >
        <h1 class="text-[20px] text-white font-medium">
          {{ acciones() }} {{ titulo() | titlecase }}
        </h1>
        <button (click)="close()">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="none"
          >
            <path
              d="M10 0C4.486 0 0 4.486 0 10s4.486 10 10 10 10-4.486 10-10S15.514 0 10 0Zm4.165 13.077-1.088 1.088L10 11.088l-3.077 3.077-1.088-1.088L8.912 10 5.835 6.923l1.088-1.088L10 8.912l3.077-3.077 1.088 1.088L11.088 10l3.077 3.077Z"
              fill="#DC3545"
            />
          </svg>
        </button>
      </div>
      <form
        class="grid grid-cols-2 gap-x-4 text-[17px] py-4  font-normal px-7 gap-y-3"
        (ngSubmit)="onSubmit()"
        [formGroup]="datosFormulario()!"
      >
        @for (item of inputs[titulo()]; track $index) {

        <label class="text-[#3B3D3E] flex flex-col font-medium" [for]="item">
          {{ item | titlecase }}
          @if(!desabilitado()){

          <input
            type="text"
            [id]="item"
            [name]="item"
            class="bg-white rounded-[6px] border border-[#C5C6C6] h-9 mb-2 last:mb-0 outline-[#3B3D3E] hover:border-[#3B3D3E] pl-2"
            [formControlName]="item"
          />

          }@else {
          <span class="font-normal max-w-96">
            {{ datosFormulario()?.value[item] }}
          </span>
          }
        </label>
        }
      </form>
      
      @if (acciones() !== 'Visualizar') {

      <div class="flex justify-end gap-3 text-[16px] w-full px-7 py-4">
        <button
          class="bg-[#C5C6C6] rounded-[10px] p-2  text-[#3B3D3E] font-normal px-5"
          (click)="close()"
        >
          Cancelar
        </button>
        <button
          class="bg-[#0042FF] rounded-[10px] p-2 text-white px-5 font-normal"
          (click)="onSubmit()"
        >
          {{ acciones() }}
        </button>
      </div>
      }
    </dialog>

    }
  `,
})
export class Formulario {
  public modal = viewChild<ElementRef<HTMLDialogElement>>('modal');
  public mostrarModal = model<boolean>(false);
  public titulo = input.required<TituloForms>();
  public acciones = input.required<Actions>();

  //variable que almacena el mensaje del backend para formulario crear y editar

  public desabilitado = input<boolean>(false);

  //variable que almacena datos de materias\estudiantes\matriculas
  public datosFormulario = input<FormGroup>(); //utilizar el atributo para enviar datos al formulario ES UN ATRIBUTO

  public servicioRegistrar = input<any>();

  public idRegistro = input<number>();

  public inputs: Record<TituloForms, string[]> = {
    estudiante: [
      //claves
      //valor
      'nombre',
      'apellido',
      'cedula',
      'fecha_nacimiento',
      'ciudad',
      'direccion',
      'telefono',
      'email',
    ],
    materia: ['nombre', 'descripcion', 'codigo', 'creditos'],
    matricula: ['codigo', 'descripcion', 'id_estudiante', 'id_materia'],
  };
  public close() {
    this.mostrarModal.set(false);
  }
  constructor() {
    effect(() => {
      if (this.mostrarModal()) {
        this.modal()?.nativeElement.showModal();
      } else {
        this.modal()?.nativeElement.close();
      }
    });
  }
  //funcion que verifica que haciion hace el boton
  public onSubmit() {
    if (this.acciones() === 'Registrar') {
      this.servicioRegistrar().crear(this.datosFormulario()?.value).subscribe({
        next:()=>{
          alert('El registro se ha agregado correctamente') 
        },error:({error}:{error:any})=>{
          console.log(error)
          alert(error.response)//error.response y este contiene el mensaje
        }
      })
    }else{
      this.servicioRegistrar().actualizar(this.idRegistro(), this.datosFormulario()?.value).subscribe({
        next:()=>{
          alert('El registro se ha actualizado correctamente')
        },error:({error}:{error:any})=>{
          alert(error.response)
        }
      })
    }
    this.datosFormulario()?.reset();//borra los datos almacenad en registrar formulario
    this.close();

  }
}
