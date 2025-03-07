import { vtkObject, vtkSubscription } from './../../interfaces';
import vtkRenderer from './Renderer';
import vtkRenderWindowInteractor from './RenderWindowInteractor';
// import vtkOpenGLRenderWindow from './../../OpenGL/RenderWindow';

export interface IRenderWindowInitialValues {
  renderers?: vtkRenderer[];
  views?: vtkRenderWindow[];
  interactor?: any;
  neverRendered?: boolean;
  numberOfLayers?: number;
  childRenderWindows?: vtkRenderWindow[];
}

interface IStatistics {
  /**
   *
   */
  propCount: number;

  /**
   *
   */
  invisiblePropCount: number;

  /**
   *
   */
  str: string;
}

export const enum DEFAULT_VIEW_API {
  'WebGL',
  'WebGPU',
}

export interface vtkRenderWindow extends vtkObject {
  /**
   * Add renderer
   * @param {vtkRenderer} renderer The vtkRenderer instance.
   */
  addRenderer(renderer: vtkRenderer): void;

  /**
   * Add a child render window
   * @param {vtkRenderWindow} renderWindow The vtkRenderWindow instance.
   */
  addRenderWindow(renderWindow: vtkRenderWindow): void;

  /**
   * Add renderer
   * @param view
   */
  addView(view: any): void;

  /**
   *
   * @param {String} format
   * @param {*} opts
   */
  captureImages(format?: string, opts?: any): Promise<string>[];

  /**
   * Switch the rendering backend between WebGL and WebGPU.
   * By default, the WebGL backend is used. To switch, to WebGPU call
   * `renderWindow.setDefaultViewAPI('WebGPU')` before calling `render`.
   */
  getDefaultViewAPI(): string;

  /**
   *
   */
  getInteractor(): vtkRenderWindowInteractor;

  /**
   *
   */
  getNumberOfLayers(): number;

  /**
   *
   */
  getNeverRendered(): boolean;

  /**
   *
   */
  getRenderers(): vtkRenderer[];

  /**
   *
   */
  getRenderersByReference(): vtkRenderer[];

  /**
   *
   */
  getChildRenderWindows(): vtkRenderWindow[];

  /**
   *
   */
  getChildRenderWindowsByReference(): vtkRenderWindow[];

  /**
   *
   */
  getStatistics(): IStatistics;

  /**
   *
   */
  getViews(): any[];

  // getViews(): vtkOpenGLRenderWindow[];

  /**
   *
   * @param {vtkRenderer} ren
   * @return {Boolean} true if the windows has a renderer
   */
  hasRenderer(ren: vtkRenderer): boolean;

  /**
   *
   * @param view
   */
  hasView(view: any): boolean;

  //hasView(view: vtkOpenGLRenderWindow): boolean;

  /**
   *
   * @param callback
   */
  onCompletion(callback: (instance: vtkObject) => any): vtkSubscription;

  /**
   *
   * @param {String} name
   * @param {} [initialValues]
   */
  newAPISpecificView(name: string, initialValues?: object): any;

  /**
   * Remove renderer
   * @param {vtkRenderer} renderer The vtkRenderer instance.
   */
  removeRenderer(renderer: vtkRenderer): void;

  /**
   * Remove a child render window added using addRenderWindow(renderWindow)
   * @param {vtkRenderWindow} renderWindow The vtkRenderWindow instance.
   */
  removeRenderWindow(renderWindow: vtkRenderWindow): boolean;

  /**
   * Remove renderer
   * @param view
   */
  removeView(view: any): void;

  /**
   *
   */
  render(): void;

  /**
   * Switch the rendering backend between WebGL and WebGPU.
   * By default, the WebGL backend is used. To switch, to WebGPU call
   * `renderWindow.setDefaultViewAPI('WebGPU')` before calling `render`.
   * Must be called before `newAPISpecificView()` is called.
   * @param defaultViewAPI (default: 'WebGL')
   */
  setDefaultViewAPI(defaultViewAPI: DEFAULT_VIEW_API): boolean;

  /**
   *
   * @param interactor
   */
  setInteractor(interactor: vtkRenderWindowInteractor): boolean;

  /**
   *
   * @param numberOfLayers
   */
  setNumberOfLayers(numberOfLayers: number): boolean;

  /**
   *
   * @param views
   */
  setViews(views: any[]): boolean;

  // setViews(views: vtkOpenGLRenderWindow[]): boolean;
}

/**
 * Method use to decorate a given object (publicAPI+model) with vtkRenderWindow characteristics.
 *
 * @param publicAPI object on which methods will be bounds (public)
 * @param model object on which data structure will be bounds (protected)
 * @param {IRenderWindowInitialValues} [initialValues] (default: {})
 */
export function extend(
  publicAPI: object,
  model: object,
  initialValues?: IRenderWindowInitialValues
): void;

/**
 * Method use to create a new instance of vtkRenderWindow
 */
export function newInstance(
  initialValues?: IRenderWindowInitialValues
): vtkRenderWindow;

/**
 *
 */
export function registerViewConstructor(name: string, constructor: any): void;

/**
 *
 */
export function listViewAPIs(): string[];

/**
 *
 */
export function newAPISpecificView(name: string, initialValues: object): any;

/**
 * vtkRenderWindow is an abstract object to specify the behavior of a rendering window.
 *
 * A rendering window is a window in a graphical user interface where renderers draw their images.
 * Methods are provided to synchronize the rendering process, set window size, and control double buffering.
 * The window also allows rendering in stereo. The interlaced render stereo type is for output to a VRex stereo projector.
 * All of the odd horizontal lines are from the left eye, and the even lines are from the right eye.
 * The user has to make the render window aligned with the VRex projector, or the eye will be swapped.
 */
export declare const vtkRenderWindow: {
  newInstance: typeof newInstance;
  extend: typeof extend;
  registerViewConstructor: typeof registerViewConstructor;
  listViewAPIs: typeof listViewAPIs;
  newAPISpecificView: typeof newAPISpecificView;
};
export default vtkRenderWindow;
