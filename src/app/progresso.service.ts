export class Progresso {
    public status: string;
    public estado: any;


    public porcentagemUpload(): number {

        if (this.estado === undefined) {
            return 0;
        }

        return Math.round((this.estado.bytesTransferred / this.estado.totalBytes)*100);
    }

}