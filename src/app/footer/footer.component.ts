import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  constructor(public translate: TranslateService) {
    this.translate.setDefaultLang('en');
  }

  ngOnInit() {
  }

  public changeLang(lang) {
    this.translate.setDefaultLang(lang);
  }

}
