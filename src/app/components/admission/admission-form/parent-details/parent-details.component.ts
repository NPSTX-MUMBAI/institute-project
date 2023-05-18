import { Component ,OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators ,FormBuilder} from '@angular/forms';


@Component({
  selector: 'app-parent-details',
  templateUrl: './parent-details.component.html',
  styleUrls: ['./parent-details.component.scss']
})
export class ParentDetailsComponent implements OnInit {
  value5: any;
  dropdownItems:any;
  ParentsDetails!:FormGroup;
  constructor(private fb:FormBuilder){

  }
  ngOnInit(): void {
    this.ParentsDetails = this.fb.group({
      Fathername:['',Validators.required],
      lastname: ['',Validators.required],

      email: ['',Validators.required],

      MobileNo: ['',Validators.required],

      FatherOccupation: ['',Validators.required],

      FatherReligion: ['',Validators.required],

      FatherNationalty: ['',Validators.required],

      Fatheraddress: ['',Validators.required],

      Country:['',Validators.required],

      state: ['',Validators.required],

      City:['',Validators.required],

      Zip: new FormControl('', Validators.required),
  
      Mothername: ['',Validators.required],

      Mlastname: ['',Validators.required],

      Memail:['',Validators.required],

      MMobileNo: ['',Validators.required],

      MOccupation: ['',Validators.required],

      MReligion: ['',Validators.required],

      MNationalty: ['',Validators.required],

      Maddress: ['',Validators.required],

      MCountry:['',Validators.required],

      Mstate: ['',Validators.required],

      MCity: ['',Validators.required],

      MZip: ['',Validators.required],

     
  
    })
    
  }

submit() {
  console.log(this.ParentsDetails.value);
}

}
