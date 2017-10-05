import {Component} from '@angular/core';
import {ChoiceService} from './choice.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MdIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'hc-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {

  constructor(public choiceService: ChoiceService,
              private router: Router,
              private http: HttpClient,
              iconRegistry: MdIconRegistry,
              sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon('account_circle', sanitizer.bypassSecurityTrustResourceUrl('assets/img/account_circle.svg'));
  }

  onLogin(keyString: string) {
    const key = parseInt(keyString, 10);
    this.http.post(`http://localhost:3000/api/login`, {
      key: key,
      candidateCacheId: this.choiceService.candidateNames.candidatesCacheId
    }, {observe: 'response'})
      .subscribe(resp => {
        console.log(resp.body);
        if (resp.status === 200) {
          this.choiceService.key = key;
          this.choiceService.grade = resp.body['grade'];
          if (resp.body['candidateNames']) {
            this.choiceService.candidateNames = resp.body['candidateNames'];
          }
          this.router.navigate(['/vote']);
        } else {
          console.log(resp);
        }
      });
  }

}
