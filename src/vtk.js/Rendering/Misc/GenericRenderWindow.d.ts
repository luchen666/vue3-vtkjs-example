import { vtkObject, vtkSubscription } from './../../interfaces';
import { RGBAColor, RGBColor } from './../../types';
import vtkRenderer from './../Core/Renderer';
import vtkRenderWindow from './../Core/RenderWindow';
import vtkRenderWindowInteractor from './../Core/RenderWindowInteractor';
import vtkOpenGLRenderWindow from './../OpenGL/RenderWindow';
import vtkWebGPURenderWindow from './../WebGPU/RenderWindow';

/**
 *
 */
export interface IGenericRenderWindowInitialValues {
  background?: RGBColor | RGBAColor;
  listenWindowResize?: boolean;
  container?: HTMLElement;
}

export interface vtkGenericRenderWindow extends vtkObject {
  /**
   * Release GL context
   */
  delete(): void;

  /**
   * Get container element
   */
  getContainer(): HTMLElement;

  /**
   * Get interactor object
   */
  getInteractor(): vtkRenderWindowInteractor;

  /**
   * Get the render back-end specific render window.
   */
  getApiSpecificRenderWindow(): vtkOpenGLRenderWindow | vtkWebGPURenderWindow;

  /**
   *
   */
  getRenderWindow(): vtkRenderWindow;

  /**
   *
   */
  getRenderer(): vtkRenderer;

  /**
   * Method to register callback when the object is resize().
   *
   * @param callback function
   * @returns subscription object so you can easily unsubscribe later on
   */
  onResize(callback: (instance: vtkObject) => any): vtkSubscription;

  /**
   * Handle window resize
   */
  resize(): void;

  /**
   * Set background color
   * @param {RGBColor|RGBAColor} background The background color.
   * @returns true if the background color actually changed, false otherwise
   */
  setBackground(background: RGBColor | RGBAColor): boolean;

  /**
   * Set thecontainer element
   * @param {HTMLElement} el The container element.
   */
  setContainer(el: HTMLElement): void;
}

/**
 * Method used to decorate a given object (publicAPI+model) with vtkGenericRenderWindow characteristics.
 *
 * @param publicAPI object on which methods will be bounds (public)
 * @param model object on which data structure will be bounds (protected)
 * @param {IGenericRenderWindowInitialValues} [initialValues] (default: {})
 */
export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IGenericRenderWindowInitialValues
): void;

/**
 * Method used to create a new instance of vtkGenericRenderWindow
 * @param {IGenericRenderWindowInitialValues} [initialValues] for pre-setting some of its content
 */
export function newInstance(
  initialValues?: IGenericRenderWindowInitialValues
): vtkGenericRenderWindow;

/**
 * vtkGenericRenderWindow provides a skeleton for implementing a render window
 * using one's own OpenGL context and drawable.
 */
export declare const vtkGenericRenderWindow: {
  newInstance: typeof newInstance;
  extend: typeof extend;
};
export default vtkGenericRenderWindow;
