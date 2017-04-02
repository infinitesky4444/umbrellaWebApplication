import { Component, OnInit, Pipe, PipeTransform,
  AfterViewChecked, ComponentFactoryResolver, ViewChild, ViewContainerRef, NgModule, ComponentFactory } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { DynamicTypeBuilder } from './type.builder';
import { DomSanitizer } from '@angular/platform-browser';
import Settings from '../../services/settings';
import _ from "lodash";
//import {FormComponent} from "../form/form.component";

@Pipe ({ name: 'safeHtml'})

export class SafeHtmlPipe implements PipeTransform  {
  constructor(private sanitized: DomSanitizer) {}
  transform(value) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
}

@Component({
  selector: 'app-page',
  /* templateUrl: './page0.component.html',
  styleUrls: ['./page0.component.css'], */
  template: '<div #ngIncludeContent></div>',
})
export class PageComponent implements AfterViewChecked {
  @ViewChild('ngIncludeContent', { read: ViewContainerRef }) viewContainer: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver,
    protected typeBuilder: DynamicTypeBuilder,
  ) {
  }

  init() {


  }

  ngAfterViewInit() {
    this.typeBuilder.createComponentFactory(`${Settings[window.location.hostname].page}.component`).then((factory: ComponentFactory<AfterViewChecked>) =>
    {
      this.viewContainer.createComponent(factory);
    });
  }

  ngOnInit() {

  }

  ngAfterViewChecked() {
  /*  var tempFormContent = $('#tempContainer').html();
    if( $('#formContainer').length > 0 && this.lastFormContent != tempFormContent ) {
      $('#formContainer').html( tempFormContent );
      this.lastFormContent = tempFormContent;
    }*/
  }
}
