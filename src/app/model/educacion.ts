export class Educacion {
    id? : number;
    institucion : string;
    inicio : number;
    fin : number;
    descripcion : string;
    img : string;

    constructor(institucion: string, inicio : number, fin : number, descripcion: string, img : string){
        this.institucion = institucion;
        this.inicio = inicio;
        this.fin = fin;
        this.descripcion = descripcion;
        this.img = img;
    }
}
