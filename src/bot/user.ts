export class user{
    constructor(private name: string, private email: string, private hobbie: string){

    } 

    public createSubscription(){
        return `Genial! ${this.name}, suscripcion activa, proto te enviaremos correos de ${this.hobbie} al correo ${this.email}`;
    }

}