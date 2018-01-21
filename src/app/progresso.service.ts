export class Progresso {
    public status: string;
    public estado: any;


    public porcentagemUpload(): number {

        return Math.round((this.estado.bytesTransferred / this.estado.totalBytes)*100);
    }

}