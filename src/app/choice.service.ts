import { Injectable} from '@angular/core';
import {CandidateNames} from './candidate_names';

@Injectable()
export class ChoiceService {

  key: number = undefined;
  grade: number = undefined;
  candidateNames: CandidateNames = new CandidateNames();

  resetAuth() {
    this.key = undefined;
    this.grade = undefined;
  }

}
