import {Injectable} from "@angular/core";
import {Routes, Route} from "@angular/router";
import {PAGE_ALIAS} from "../constants/pages";
import {IMenuItem} from "../model/IMenuItem";
@Injectable()
export class DataParseService {

  constructor() {

  }

  //Parses data loaded from server to Angular 2 Routes
  parseMenuDataToRoutes(data): Routes {
    //See Array.prototype.reduce
    return data.data.reduce((result, currentItem)=> {
      return [...result, this.getRouteFromData(currentItem)]
    }, [])
  }

  //Parses menu data from server to array of nested menu items
  parseMenuDataToNav(data): Array<IMenuItem> {
    //See Array.prototype.reduce
    return data.data.reduce((result, currentItem)=> {
      if (currentItem.parentId == -1) {
        return [...result, Object.assign({}, this.mapDataObjectToMenuItem(currentItem), {
          children: this.getChildItems(currentItem.id, data.data)
        })];
      } else {
        return result;
      }
    }, []);
  }

  //Recursively finds child navigation elements
  private getChildItems(id, data): Array<IMenuItem> {
    //See Array.prototype.reduce
    return data.reduce((result, currentItem)=> {
      if (currentItem.parentId == id && currentItem.navigationHide == false) {
        return [...result, Object.assign({}, this.mapDataObjectToMenuItem(currentItem), {
          children: this.getChildItems(currentItem.id, data)
        })]
      }
      return result;
    }, []);
  }

  //Maps each menu item received from server to Navigation item
  private mapDataObjectToMenuItem(object): IMenuItem {
    return {
      path: object.path,
      name: object.name
    }
  }

  //Gets single route from each item in array
  private getRouteFromData(data): Route {
    let path = data.path;
    if (path[0] == "/") {
      path = path.slice(1);
    }
    if (path[path.length - 1] == "/") {
      path = path.slice(0, -1);
    }
    return {
      path: path[0] == "/" ? path.slice(1) : path,
      component: PAGE_ALIAS[data.component],
      data: {
        title: data.name,
        meta: data.meta || []
      }
    }
  }
}