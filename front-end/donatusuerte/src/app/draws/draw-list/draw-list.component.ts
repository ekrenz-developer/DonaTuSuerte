import { Component, OnInit, Input } from '@angular/core';
import { DrawService } from 'src/app/services/draw.service';

@Component({
  selector: 'app-draw-list',
  templateUrl: './draw-list.component.html',
  styleUrls: ['./draw-list.component.css']
})
export class DrawListComponent implements OnInit {

  constructor(private drawService : DrawService)
  {
    this.drawService.getDraws().then ( data => 
      {
        this.draws = data;
        console.log ( this.draws )
      })
    
   }

  draws : any = null;

  ngOnInit(): void {
  }




}
