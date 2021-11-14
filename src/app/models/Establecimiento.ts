import { Geometry } from './Geometry';

export class Establecimiento {

    establecimientoid:number;
    type:string;
    geometry: Geometry;

    constructor(establecimientoid:number, type:string, geometry:Geometry) {
        this.establecimientoid = establecimientoid;
        this.type = type;
        this.geometry = geometry;
    }

}