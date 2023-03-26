export class Proyecto {
    id?: number;
    titulo: string;
    descripcion: string;
    link: string;
    img: string;

    constructor(titulo: string, descripcion: string, link : string, img: string) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.link = link;
        this.img = img;
    }
}
