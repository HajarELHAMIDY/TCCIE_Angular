import { Ville } from './ville.model';
export class Client{
    public  idClient : number;
	public  firstName: string;
	public  lastName : string;
	public  email : string;
	public  phone : string;
	public  codePostal : string;
    public  address: string;
	public ville : Ville; 
	public rolesUser : Array<string>; 
	public ptsF:number; 



} 