import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';



@Component({
  selector: 'app-verify-otp',
  templateUrl: './verify-otp.component.html',
  styleUrls: ['./verify-otp.component.scss']
  
})
export class VerifyOtpComponent implements OnInit {
  otpGrp!: FormGroup;
  constructor(private fb: FormBuilder){

  }
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    this.otpGrp = this.fb.group({
      otp1: '',
      otp2: '',
      otp3: '',
      otp4: '',
      
      

      
  });
  }

  


  sendOtp(){
    console.log( this.otpGrp.value)
    let otpData= this.otpGrp.value
    let myOtp= otpData.otp1 + otpData.otp2 +otpData.otp3 +otpData.otp4 

    console.log(myOtp);
    

  }

  move(e:any,p:any,c:any,n:any){
    console.log(e);
    /*var length = c.value.length;
    var maxlength = c.getAttribute('maxlength');
    if(length == maxlength){
      if(n!= ""){
        n.focus();
      }

    }
    if (e.key === "Backspace"){
      if(p !=""){

        p.focus();
      }
      
    }*/

    
      

  }

  


  
  
  
   
  
}
function otp() {
  throw new Error('Function not implemented.');
}

