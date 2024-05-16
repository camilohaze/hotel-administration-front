import {
  Injectable,
  ViewContainerRef,
  ComponentRef,
  Type,
} from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FactoryService {
  set viewContainerRef(viewContainerRef: ViewContainerRef) {
    this._viewContainerRef = viewContainerRef;
  }

  get viewContainerRef(): ViewContainerRef {
    return this._viewContainerRef;
  }

  set componentRef(componentRef: ComponentRef<any>[]) {
    this._componentRef = componentRef;
  }

  get componentRef(): ComponentRef<any>[] {
    return this._componentRef;
  }

  private _viewContainerRef!: ViewContainerRef;
  private _componentRef: ComponentRef<any>[] = [];

  /**
   * Instantiates a component and adds it to the DOM.
   *
   * @param {Type<T>} componentType - Type of the component to create, e.g. "DynamicComponent".
   * @param {ViewContainerRef} location - (Optional) Location where to inject the
   * component in the DOM, can be an arbitrary HTML element or a ViewContainerRef.
   */
  createComponent<T>(component: Type<T>): ComponentRef<T> {
    const componentRef = this.viewContainerRef.createComponent<T>(component);

    if (!!componentRef) {
      this.componentRef.push(componentRef);
    }

    return componentRef;
  }

  destroyComponent<T>(component: Type<T>): void {
    const componentIndex = this.componentRef.findIndex(
      (p) => p.instance instanceof component
    );
    const componentRef = this.componentRef[componentIndex];

    if (componentIndex !== -1) {
      componentRef.destroy();
      this.componentRef.splice(componentIndex, 1);
    }
  }
}
