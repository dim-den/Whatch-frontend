import { AuthService } from '@abp/ng.core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Subject, tap } from 'rxjs';
import { FilmDto } from '@proxy/dto';
import { MatSelect } from '@angular/material/select';
import { FilmService } from '@proxy/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  get hasLoggedIn(): boolean {
    return this.oAuthService.hasValidAccessToken();
  }

  constructor(
    private oAuthService: OAuthService,
    private authService: AuthService,
    private fb: FormBuilder,
    private filmService: FilmService
  ) {
    this.initCtrls();
  }

  films$: Subject<FilmDto[]> = new Subject<FilmDto[]>();

  public filmCtrl: FormControl = new FormControl();
  public filterCtrl: FormControl = new FormControl();
  public gr: FormGroup;

  @ViewChild('singleSelect') singleSelect: MatSelect;

  ngOnInit() {
    this.filterCtrl.valueChanges.pipe(debounceTime(500)).subscribe(() => {
      this.filterFilms();
    });
  }

  initCtrls() {
    this.filmCtrl = this.fb.control(null);
    this.filterCtrl = this.fb.control(null);
  }

  protected filterFilms() {
    this.filmService
      .getList({ maxResultCount: 5 })
      .pipe(tap(x => this.films$.next(x.items)))
      .subscribe();
  }

  login() {
    this.authService.navigateToLogin();
  }
}
