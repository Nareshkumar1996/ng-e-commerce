import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  registerForm!: FormGroup;
  constructor(private fb: FormBuilder){

  }
   ngOnInit(): void {

    this.registerForm = this.fb.group({

      username: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],

      gender: ['', [
        Validators.required
      ]],

      phoneNumber: ['', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$')
      ]],

      password: ['', [
        Validators.required,
        Validators.minLength(6)
      ]],

      confirmPassword: ['', [
        Validators.required
      ]]

    });
  }

  onSubmit(): void {
    if(this.registerForm.invalid){
      this.registerForm.markAllAsTouched();
      return;
    }

    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;

    if(password !== confirmPassword){
      this.registerForm.get('confirmPassword')?.setErrors({
        passwordMismatch: true
      });

      return;
    }

    console.log('Registration successful');
    console.log(this.registerForm.value);

  }

}
