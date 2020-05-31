import { Component, OnInit, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { DrawService } from 'src/app/services/draw.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css']
})
export class DrawComponent implements OnInit {

  constructor( private drawService : DrawService) { }

  ngOnInit(): void {
  }

  @Input() draw : any = false;

  participate(){

    let numeroRifas = "";
    Swal.mixin({
     
      confirmButtonText: 'Continuar &rarr;',
      showCancelButton: true,
      progressSteps: ['1', '2', '3']
    }).queue([
      {
        title: 'Inscripcion a sorteo por: ',
        text: "$" + this.draw.prize
      },
      {
        title: '¿Cuantas rifas querés canjear?',
        input: 'select',
        inputOptions: {
          1: '1 : ' + 1 * this.draw.scoreRaffle,
          2: '2 : ' + 2 * this.draw.scoreRaffle,
          3: '3 : ' + 3 * this.draw.scoreRaffle,
          4: '4 : ' + 4 * this.draw.scoreRaffle,
          5: '5 : ' + 5 * this.draw.scoreRaffle,
          6: '6 : ' + 6 * this.draw.scoreRaffle,
          7: '7 : ' + 7 * this.draw.scoreRaffle,
          8: '8 : ' + 8 * this.draw.scoreRaffle,
          9: '9 : ' + 9 * this.draw.scoreRaffle,
          10: '10 : ' + 10 * this.draw.scoreRaffle
        },
        inputPlaceholder: 'Cantidad de rifas',
        showCancelButton: true,
        inputValidator: (value) => {
          return new Promise((resolve) => {
            if ( value != "" ){
              numeroRifas = value
            }else{
              resolve('Por favor elija una cantidad de rifas')
            }
           
            resolve()
          })
        }
      },
      {
        title : 'Presiona continuar para finalizar !',
      }
    ]).then((result) => {
      let res :any = result
      if (res.value) {
        this.drawService.enterDraw( res.value[1], this.draw._id ).then()
        {
          data  => {
            console.log ( data )
            Swal.fire({
              icon: 'success',
              title: 'Perfecto ! ',
              text: 'Estas participando con ' + numeroRifas + ' rifas para ' + this.draw.premio,
              imageUrl: this.draw.photo,
              imageWidth: 400,
              imageHeight: 200,
              imageAlt: 'Custom image',
              timer: 3000,
              timerProgressBar:true,
              showConfirmButton: false
            })
          }
        };

      }
  }
    )}
}
