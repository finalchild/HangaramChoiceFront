import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ChoiceService} from './choice.service';
import {HttpClient} from '@angular/common/http';
import {StudentGuardService} from './student-guard.service';

@Component({
  selector: 'hc-vote',
  templateUrl: './vote.component.html'
})
export class VoteFormComponent implements OnInit {

  candidateNameToVote1M: string;
  candidateNameToVote1F: string;
  candidateNameToVote2: string;

  constructor(public choiceService: ChoiceService, public router: Router, private http: HttpClient) {}

  ngOnInit(): void {

  }

  onVote() {
    this.http.post(`http://localhost:3000/api/vote`, {
      key: this.choiceService.key,
      candidateName1M: this.candidateNameToVote1M,
      candidateName1F: this.candidateNameToVote1F,
      candidateName2: this.candidateNameToVote2
    }, {observe: 'response'})
      .subscribe(resp => {
        if (resp.status === 200) {
          this.choiceService.resetAuth();
          alert(resp.body['message']);
          this.router.navigate(['/login']);
        } else {
          console.log(resp);
        }
      });
  }
}
