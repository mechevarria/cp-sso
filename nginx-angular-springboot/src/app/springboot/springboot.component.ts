import { Component, OnInit } from '@angular/core';
import { SpringbootService } from './springboot.service';
import { MessageService } from '../message/message.service';

@Component({
  selector: 'app-springboot',
  templateUrl: './springboot.component.html',
  styleUrls: ['./springboot.component.css']
})
export class SpringbootComponent implements OnInit {
  response: any = {};
  name: string = '';
  isBusy: boolean = false;

  constructor(private springbootService: SpringbootService, private messageService: MessageService) { }

  checkSpringboot(): void {
    this.isBusy = true;
    this.springbootService.getStatus(this.name).subscribe(res => {
      this.isBusy = false;
      this.response = res;

      if (this.response.status === 200) {
        this.messageService.success('Successfully checked springboot-api status');
      }
    });
  }

  clear(): void {
    this.name = '';
    this.response = {};
  }

  ngOnInit(): void {
  }

}
