import {Component, HostBinding} from '@angular/core';
import {ChoiceService} from './choice.service';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import {animation} from './animations';

@Component({
  selector: 'hc-login',
  templateUrl: './login.component.html',
  animations: [animation]
})
export class LoginComponent {

  constructor(public choiceService: ChoiceService,
              private router: Router,
              private http: HttpClient,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('account_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/account_circle.svg'));
  }

  onLogin(keyElement: HTMLInputElement) {
    if (!keyElement.value || keyElement.value === '') {
      keyElement.focus();
      return;
    }
    const key = parseInt(keyElement.value, 10);
    if (!isValidKey(key)) {
      keyElement.focus();
      return;
    }

    this.http.post(`http://localhost:3000/api/login`, {
      key: key,
      candidateCacheId: this.choiceService.candidateNames.candidatesCacheId
    })
      .subscribe(data => {
        this.choiceService.key = key;
        this.choiceService.grade = data['grade'];
        if (data['candidateNames']) {
          this.choiceService.candidateNames = data['candidateNames'];
        }
        this.router.navigate(['/vote']);
      }, err => {
        console.log(err);
        if (err instanceof HttpErrorResponse) {
          alert(JSON.parse(err.error)['message']);
          keyElement.focus();
        }
      });
  }

}

function isValidKey(key: number): boolean {
  return Number.isSafeInteger(key) && key > 0 && key < 10000000;
}
