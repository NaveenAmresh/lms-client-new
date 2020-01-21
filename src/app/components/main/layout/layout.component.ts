import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router'; import {MediaMatcher} from '@angular/cdk/layout';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.sass'],
})
export class LayoutComponent implements OnDestroy {
  coverImg: string = 'cover2.jpg';
  profileImg: string = 'admin.jpg';
  profileUrl: string = '../../../../assets/images/' + this.profileImg;
  coverUrl: string = 'url("../../../../assets/images/' + this.coverImg + '")';
  toggle: boolean = true;
  color1: string = '#fffffb';
  color2: string = '#ff3a72';
  icon: string = 'drag_handle';
  active: boolean[] = [false];
  notificationicon: string = 'notifications_active';
  notifications: string = '1';
  public href: string = '';
  cr: string; mobileQuery: MediaQueryList;
  _mobileQueryListener: () => void;

  constructor(private router: Router, changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.cr = localStorage.getItem('cr');
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.href = this.router.url;
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
