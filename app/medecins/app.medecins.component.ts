import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService} from '../services/app.service.data';
import{ Observable } from 'rxjs/Rx';

@Component({
  moduleId: module.id,
  selector: 'my-medecins',
  templateUrl: 'app.medecins.html'
  
})
export class MedecinsComponent {
   legende : string = "Rechercher le médecin";
   estCacheMenu : Boolean = true;
   nomMedecin : string;
   medecin : any;
   lesMedecins : Array<any>;
   lesRapports : Array<any>;
   afficherRapports : boolean = false;
   afficherMedecin : boolean = false;
   afficherMessage : boolean = false;
   lblMessage="";
  
   constructor( private dataService : DataService, private router : Router){}
   charger() : void{
        this.dataService.chargerMedecins(this.nomMedecin)
                                  .subscribe( 
                                      (data)=>{this.lesMedecins = data['medecins'];
                                      this.dataService.ticket = data['ticket'];
                                         }
                                      ,(error)=>{this.router.navigate(['']);}
                                              );
   }
   selectionner(med) : void{
        this.medecin = med;
        this.afficherRapports = false;
        this.nomMedecin = med.nom + " " + med.prenom + "; dep : " + med.departement;
        this.lesMedecins = null;
        this.legende ="";
        this.estCacheMenu = false;
    
            
   }
   derniersRapports() : void{
        this.afficherRapports = true;
        this.afficherMedecin = false;
        this.dataService.chargerRapports(this.medecin.id)
                                .subscribe( 
                                      (data)=>{this.lesRapports = data['rapports'];
                                      this.nomMedecin="";
                                      this.dataService.ticket = data['ticket'];
                                      
                                         }
                                      ,(error)=>{this.router.navigate(['']);}
                                              );
   }
   majMedecin() : void{
        this.afficherRapports = false;
        this.afficherMedecin = true;
        this.afficherMessage = false;
 
   }
    valider(): void{
       this.afficherMessage = true;
        this.dataService.majMedecin(this.medecin.id,this.medecin.adresse,this.medecin.tel,this.medecin.specialitecomplementaire)
                                  .subscribe( 
                                      (data)=>{ this.lblMessage= "Enregistrement effectué";
                                                this.dataService.ticket = data;
                                         }
                                      ,(error)=>{this.router.navigate(['']);}
                                              );
   }

}