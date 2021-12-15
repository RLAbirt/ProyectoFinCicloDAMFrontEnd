import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DistService } from 'src/app/services/dist.service';

@Component({
  selector: 'app-selector',
  templateUrl: './selector.component.html',
  styleUrls: ['./selector.component.scss'],
})
export class SelectorComponent implements OnInit {

  //@Output() redirect:EventEmitter<any> = new EventEmitter();

  valueSelected: string = "1";
 
  constructor(private router:Router, private distService: DistService) { }

  ngOnInit() {}

  public segmentChanged(event: Event){
    this.valueSelected= (event as CustomEvent).detail.value;
    this.changeComponent;
  }

  public getDistance(){
    return +this.valueSelected;
  }

  /*changeComponent(url:string){
    this.redirect.emit(this.valueSelected);//emits the data to the parent
    this.router.navigate(['/resultados']);//redirects url to new component
  }*/

  changeComponent(url:string = '/resultados'){
    this.distService.setData(this.valueSelected);
    //this.router.navigate([url]);//redirects url to new component
}

}
