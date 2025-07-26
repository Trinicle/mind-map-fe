import { Component, inject, OnInit } from '@angular/core';
import { Auth } from '../../auth/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {}
}
