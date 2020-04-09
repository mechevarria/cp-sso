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

  constructor(private springbootService: SpringbootService, private messageService: MessageService) { }

  checkSpringboot(): void {
    this.springbootService.getStatus().subscribe(res => {
      this.response = res;

      if (this.response.status === 200) {
        this.messageService.success('Successfully checked springboot-api status');
      }
    });
  }

  ngOnInit(): void {
  }

}
