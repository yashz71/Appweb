import { Component ,OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { Users } from '../services/user.model';
import { Messages } from 'openai/resources/beta/threads/messages/messages';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})

export class SignupComponent implements OnInit {
  constructor(private auth:AuthenticationService,private router:Router){}

  ngOnInit(): void {
    
  }
  userMail!:String; 
  userName!:string;
  userPass!:String; 
  values!:String;
  cform=false;
  i!:number;
  sp:number=0;
  err!:any;
  val!:any;
  throwErr(): never {
    throw new Error('Something went wrong');
  }
  
  
  
  onSubmit(event: { preventDefault: () => void; }){
    event.preventDefault();
    const newUser = new Users();
    newUser.userMail = this.userMail;
    newUser.userName = this.userName; 
    newUser.userPassword = this.userPass;
    //this.nouvelAssignment.emit(newAssignment);
    this.auth.addUser(newUser)
    .subscribe(message =>{
      
      
      if(message.message!="User was registered successfully!"){
        this.err=message.message;

      }
      else{
        this.val=message.message;
      }
        
      }
    
        );
  }  
  
}
