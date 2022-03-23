import { Component, OnInit } from '@angular/core';
import { LoadingService } from './loading.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss'],
})
export class LoadingComponent implements OnInit {
  public isLoading: Subject<boolean> = this.loadingService.isLoading;

  constructor(private loadingService: LoadingService) {}

  ngOnInit(): void {}
}
