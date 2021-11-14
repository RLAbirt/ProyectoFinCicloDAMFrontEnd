import { Establecimiento } from './Establecimiento';
import { OfertaProperties } from './OfertaProperties';

export class Oferta extends Establecimiento {

    ofertaproperties:OfertaProperties;

    constructor(ofertaproperties:OfertaProperties) { 
        super(); 
        this.ofertaproperties = ofertaproperties;
    }


}