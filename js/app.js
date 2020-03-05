//variables
const presupuestoUsuario = prompt('¿ Cual es tu presupuesto semanal ?');
const formulario = document.getElementById('agregar-gasto');
let cantidadPresupuesto;

//clases
//clase que se encarga de hacaer los calculos 
class Presupuesto {
     constructor(presupuesto) {
          this.presupuesto = Number(presupuesto);
          this.restante = Number(presupuesto);
     }

     //metodo que se encarga de sumar 
     cantidadRestante(cantidad = 0) {
         return this.restante -= Number(cantidad);
     }
}

//clase para la interfaz
class Interfaz {
     insertarPresupuesto(cantidad) {
          const totalSpan = document.querySelector('span#total');
          const restanteSpan = document.querySelector('span#restante');

          totalSpan.innerHTML = `${cantidad}`;
          restanteSpan.innerHTML = `${cantidad}`;
     }
     //creamos el metodo para imprimir el msj
     imprimirMensaje(mensaje, tipo) {
          //creamos el div que contendra el msj a mostrar
          const divMensaje = document.createElement('div');
          divMensaje.classList.add('text-center', 'alert');

          //identificamos el tipo de mensaje 
          if ( tipo === 'error') {
               divMensaje.classList.add('alert-danger');
          } else if( tipo === 'correcto') {
               divMensaje.classList.add('alert-success');
          }
          
          //inyectamos el mensaje al div
          divMensaje.appendChild(document.createTextNode(mensaje));

          //inyectamos el div al DOM
          const primario = document.querySelector('.primario');
          primario.insertBefore(divMensaje, formulario);

          //eliminar los datos luego de unos segundos de averlos mostrados
         
          setTimeout(() => {
              //eliminamos el div que contien el mensaje
               formulario.reset(); 
               document.querySelector('.alert').remove();
              
          }, 2500);
     }
     //agregar la lista de los gastos al dom
     agregarLista(gasto, cantidad) {
          //traemos el contenedor 
          const listaGasto = document.querySelector('#gastos ul');

          //creamos un elemento li y le agregamos las clases
          let li = document.createElement('li');
          li.className = 'list-group-item d-flex justify-content-between aling-items-center';
          li.innerHTML = `
               ${gasto}
              <span class="badge badge-primary badge-pill"> $ ${cantidad} </span>
          `;
          listaGasto.appendChild(li);
     }
     //realizamos un metodo que nos actualize el restante cada que insertemos un nuevo valor
     presupuestoRestante(cantidad) {
          const restante = document.getElementById('restante');
          //leemos el prespuesto restante 
          const presupuestoRestanteUsuario = cantidadPresupuesto.cantidadRestante(cantidad);
          //insertamos el presupuesto restante al dom 
          restante.innerHTML = `${presupuestoRestanteUsuario}`;

          this.comprobarPresupuesto();
     }
     //comprobamos el estado del presupuesto que el usuario que ya gastado
     comprobarPresupuesto() {
          const presupuestoTotal = cantidadPresupuesto.presupuesto;
          const presupuestoRestante = cantidadPresupuesto.restante;

          //comprobamos que quede el 25%
          if ( (presupuestoTotal / 4) > presupuestoRestante ) {
               const restante = document.querySelector('.restante');
               restante.classList.remove('alert-success', 'alert-warning');
               restante.classList.add('alert-danger');
               
          } else if ( (presupuestoTotal / 2) > presupuestoRestante ) {
               const restante = document.querySelector('.restante');
               restante.classList.remove('alert-success');
               restante.classList.add('alert-warning');
          }

     }
}

//event listeners
//se ejecutara al recargar la ventana
document.addEventListener('DOMContentLoaded', function () {
    
     if ( presupuestoUsuario === null || presupuestoUsuario === '' ) {
          window.location.reload();
     } else {
          cantidadPresupuesto = new Presupuesto(presupuestoUsuario);
          let ui = new Interfaz();
          ui.insertarPresupuesto(cantidadPresupuesto.presupuesto);
     }
});

//se ejecutara cuando el formulario se envie
formulario.addEventListener('submit', function(e) {
     e.preventDefault();

     //traer el contenido de los input
     const tipoGasto = document.getElementById('gasto').value;
     const cantidadGasto = document.getElementById('cantidad').value;

     //intansiar la clase interfaz
     const ui = new Interfaz();
     
     //verificar que los campos no esten vacios
     if (tipoGasto === '' || cantidadGasto === '') {

          //creamos un metodo para imprimir el msj, contendra 2 parametros
          ui.imprimirMensaje('Ha ocurrido un ERROR', 'error');
     } else {

          //agragar al HTML los datos correctos
          ui.imprimirMensaje('Datos Correctos', 'correcto');
          ui.agregarLista(tipoGasto, cantidadGasto);
          ui.presupuestoRestante(cantidadGasto);
     }
});