import { Component } from '@angular/core';
import { PresupuestoService } from '../../../services/presupuesto.service';

@Component({
  selector: 'app-ingresar-gastos',
  templateUrl: './ingresar-gastos.component.html',
  styleUrls: ['./ingresar-gastos.component.css']
})
export class IngresarGastosComponent {

  nombreGasto: string;
  cantidad: number;
  formularioIncorrecto: boolean;
  textoIncorrecto: string;

  constructor(private _presupuestoService: PresupuestoService) {
    this.nombreGasto = '';
    this.cantidad = 0;
    this.formularioIncorrecto = false;
    this.textoIncorrecto = '';
  }

  agregarGasto() {

     if(this.cantidad > this._presupuestoService.restante){
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Cantidad ingresada es mayor al restante';
      return;
     }

    if(this.nombreGasto === '' || this.cantidad <= 0) {
      this.formularioIncorrecto = true;
      this.textoIncorrecto = 'Nombre gasto o cantidad incorrecta';
    }else {

      //Creamos el objeto
      const Gasto = {
        nombre: this.nombreGasto,
        cantidad: this.cantidad
      }

      //Enviamos el objeto a los suscriptores via subject
      this._presupuestoService.agregarGasto(Gasto);

      //Reseteamos formulario
      this.formularioIncorrecto = false;
      this.nombreGasto = '';
      this.cantidad = 0;
    }
  }
 
}
