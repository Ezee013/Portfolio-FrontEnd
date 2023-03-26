export class Experiencia {
    id? : number;
    nombre : string;
    inicio : number;
    fin : number;
    descripcion : string;
    img : string;

    constructor(nombre: string, inicio : number, fin : number, descripcion: string, img : string){
        this.nombre = nombre;
        this.inicio = inicio;
        this.fin = fin;
        this.descripcion = descripcion;
        this.img = img;
    }
}