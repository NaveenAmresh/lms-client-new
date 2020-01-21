import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {CheckconnService} from '../../../services/checkconn.service';
import {PostUserService} from '../../../services/post-user.service';
import {ActivatedRoute } from '@angular/router';
import {ListUsersService} from '../../../services/list-users.service';
import {isUndefined} from 'util';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.sass']
})
export class UsersComponent implements OnInit {
  @ViewChild('streams',  {static: true})
    private streams: ElementRef;
  @ViewChild('canvas',  {static: true})
    private canvas: ElementRef;
  userForm = this.fb.group({
    firstname: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10),
      Validators.pattern('[a-zA-Z ]*')]],
    lastname: ['', [Validators.minLength(3), Validators.maxLength(10),
      Validators.pattern('[a-zA-Z ]*')]],
    email: ['', [Validators.email]],
    mobile: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(10),
      Validators.maxLength(10)]],
    address: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zip: ['', [Validators.required, Validators.pattern('[0-9]*'), Validators.minLength (6),
      Validators.maxLength(6)]],
  });
  private imagePath;
  private imgURL: any;
  private message: string;
  private tooltip: string;
  private icon: string;
  private url: any;
  private image: boolean = false;
  private video: boolean = true;
  private context: any;
  public cities: Object;
  private states: Object;
  private id: number = 0;
  private email: any = null;
  private profile_pic: any;
  private mobile: any;
  title: string = ' Add Users';
  public checkMobile(value) {
    this._check.mobile(value)
      .subscribe(data => {
          if (data.toString() === '') {
            return null;
          } else {
            this.userForm.controls['mobile'].setErrors({'incorrect': true});
          }
        },
        err => {
          return null;
        });
    return { 'Something Went Wrong': true };
  }
  public checkEmail(value) {
    this._check.email(value)
      .subscribe(data => {
          if (data.toString() === '') {
            return null;
          } else {
            this.userForm.controls['email'].setErrors({'incorrect': true});
          }
        },
        err => {
          return null;
        });
    return { 'Something Went Wrong': true };
  }
  public checkUpEmail(value) {
    if (this.email === value) {
      return null;
    }
    this._check.email(value)
      .subscribe(data => {
          if (data.toString() === '') {
            return null;
          } else {
            this.userForm.controls['email'].setErrors({'incorrect': true});
          }
        },
        err => {
          return null;
        });
    return { 'Something Went Wrong': true };
  }
  getCity() {
    this._crud.getCity(this.userForm.value.state)
      .subscribe(data => {
        this.cities = data;
      }, () => {
        this.cities = [{id: 0, name: 'Not Available'}];
      });
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = () => {
      this.imgURL = reader.result;
      this.icon = 'edit';
    };
  }
  removeImage() {
    this.imgURL = null;
    this.icon = 'camera_alt';
  }
  record() {
      if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({
      video: {
        width: 1920,
        height: 1080,
        facingMode: { exact: 'user' }
        },
      audio: false,
    }).then((stream) => {
      this.url = stream;
      this.image = true;
      this.video = false;
      this.tooltip = 'Capture';
    }, () => {
      alert('Not Supported Device');
    });
  } else {
        alert('Not Supported Device');
      }
  }
  capture() {
    this.context = this.canvas.nativeElement.getContext('2d').drawImage(this.streams.nativeElement, 0, 0, 300, 150);
    this.imgURL = (this.canvas.nativeElement.toDataURL('image/jpeg', 1.0));
    this.image = false;
    this.video = true;
    this.icon = 'edit';
    if (this.url.active) {
      this.url.getTracks().forEach(track => track.stop());
    }
  }
  cancel() {
    this.image = false;
    this.video = true;
    if (this.url.active) {
      this.url.getTracks().forEach(track => track.stop());
    }
  }
  submit() {
    const form = new FormData();
    form.append('firstname', this.userForm.value.firstname);
    form.append('lastname', this.userForm.value.lastname);
    form.append('email', this.userForm.value.email);
    form.append('mobile', this.userForm.value.mobile);
    form.append('address', this.userForm.value.address);
    form.append('city', this.userForm.value.city);
    form.append('state', this.userForm.value.state);
    form.append('zip', this.userForm.value.zip);
    form.append('profile_pic', this.imgURL || '');
    form.append('count', '0');
    form.append('added_by', 'Admin');
    this._post.adduser(form)
      .subscribe(() => {
        alert('Successfully Added');
      });
  }
  update() {
    const form = new FormData();
    form.append('firstname', this.userForm.value.firstname);
    form.append('lastname', this.userForm.value.lastname);
    form.append('email', this.userForm.value.email);
    form.append('mobile', this.mobile);
    form.append('address', this.userForm.value.address);
    form.append('city', this.userForm.value.city);
    form.append('state', this.userForm.value.state);
    form.append('zip', this.userForm.value.zip);
    form.append('added_by', 'Admin');
    if (this.imgURL !== this.profile_pic) {
      form.append('profile_pic', this.imgURL || '');
    }
    this._post.updateuser(this.id, form)
      .subscribe(() => {
        alert('Successfully Added');
      });
  }
  constructor(private activatedRoute: ActivatedRoute, private fb: FormBuilder, private _check: CheckconnService,
              private _post: PostUserService, private _crud: ListUsersService) {
    this._check.check();
    this._crud.getState()
      .subscribe(data => {
        this.states = data;
      }, () => {
        this.states = [{id: 0, name: 'Not Available'}];
      });
    if (this.imgURL == null) {
      this.tooltip = 'Add Photo';
      this.icon = 'camera_alt';
    } else {
      this.tooltip = 'Change Photo';
      this.icon = 'edit';
    }
  }
  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (isUndefined(params['id'])) {
        return this.id = 0;
      }
      this.id = params['id'];
      this._crud.user(this.id)
        .subscribe(data => {
          this.userForm.patchValue(data);
          this.userForm.controls.state.setValue(data['state']);
          this.userForm.controls.city.setValue(data['city']);
          this.getCity();
          this.imgURL = data['profile_pic'];
          this.profile_pic = data['profile_pic'];
          this.userForm.controls.mobile.disable();
          this.email = data['email'];
          this.mobile = data['mobile'];
        });
    });
  }
}
