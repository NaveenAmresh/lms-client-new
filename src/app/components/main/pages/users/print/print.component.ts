import { Component, OnInit } from '@angular/core';
import {isUndefined} from 'util';
import {ActivatedRoute} from '@angular/router';
import {ListUsersService} from '../../../../services/list-users.service';

@Component({
  selector: 'app-print',
  templateUrl: './print.component.html',
  styleUrls: ['./print.component.sass']
})
export class PrintComponent implements OnInit {
  private imgURL: any;
  private image: boolean = false;
  private id: number;
  private firstname: any;
  private mobile: any;
  private email: any;
  private lastname: any;
  private zip: any;
  private address: any;
  private city: any;
  private state: any;
  constructor(private activatedRoute: ActivatedRoute, private _crud: ListUsersService) { }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (isUndefined(params['id'])) {
        return this.id = 0;
      }
      this.id = params['id'];
      this._crud.print(this.id)
        .subscribe(data => {
        this.firstname = data['firstname'];
        this.lastname = data['lastname'];
        this.email = data['email'];
        this.mobile = data['mobile'];
        this.state = data['state']['name'];
        this.city = data['city']['name'];
        this.address = data['address'];
        this.zip = data['zip'];
        this.imgURL = data['profile_pic'];
        });
    });
  }

}
