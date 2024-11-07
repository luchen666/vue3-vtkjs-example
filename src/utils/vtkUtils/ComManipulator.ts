import vtkMouseCameraTrackballPanManipulator from "@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballPanManipulator";
import vtkMouseCameraTrackballRotateManipulator from "@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRotateManipulator";
import vtkMouseCameraTrackballZoomManipulator from "@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballZoomManipulator";
import vtkMouseCameraTrackballRollManipulator from "@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballRollManipulator";
import vtkMouseCameraTrackballZoomToMouseManipulator from "@kitware/vtk.js/Interaction/Manipulators/MouseCameraTrackballZoomToMouseManipulator";
import type { vtkInteractorStyleManipulator } from "@kitware/vtk.js/Interaction/Style/InteractorStyleManipulator";

interface MouseKeyType {
  button?: number;
  dragEnabled: boolean;
  scrollEnabled?: boolean;
}

export const comMouseKeys: Record<string, any> = {
  leftButton: { button: 1, dragEnabled: true },
  middleButton: { button: 2, dragEnabled: true, manipName: "Pan" },
  rightButton: { button: 3, dragEnabled: true, manipName: "Rotate" },
  scrollMiddleButton: { scrollEnabled: true, dragEnabled: false, manipName: "Zoom" },
  shiftRightButton: { button: 3, shift: true, manipName: "Pan" },
  shiftMiddleButton: { button: 2, shift: true, manipName: "Pan" },
  shiftScrollMiddleButton: {
    scrollEnabled: true,
    dragEnabled: false,
    shift: true,
    manipName: "Zoom"
  },

  controlRightButton: { button: 3, control: true, manipName: "Roll" },
  controlMiddleButton: { button: 2, control: true, manipName: "Pan" },
  controlScrollMiddleButton: {
    scrollEnabled: true,
    dragEnabled: false,
    control: true,
    manipName: "Zoom"
  },

  altRightButton: { button: 3, alt: true, manipName: "Rotate" },
  altMiddleButton: { button: 2, alt: true, manipName: "Pan" },
  altScrollMiddleButton: {
    scrollEnabled: true,
    dragEnabled: false,
    alt: true,
    manipName: "Zoom"
  },
};

class ComManipulator {
  manipulatorFactory: Record<string, any> = {
    None: null,
    Pan: vtkMouseCameraTrackballPanManipulator,
    Zoom: vtkMouseCameraTrackballZoomManipulator,
    Roll: vtkMouseCameraTrackballRollManipulator,
    Rotate: vtkMouseCameraTrackballRotateManipulator,
    ZoomToMouse: vtkMouseCameraTrackballZoomToMouseManipulator,
  };

  /** 平移 */
  panManipulator(interactorStyle: vtkInteractorStyleManipulator, mouseKeys: MouseKeyType) {
    const manipulator = vtkMouseCameraTrackballPanManipulator.newInstance({
      button: mouseKeys.button,
    });
    // manipulator.setDragEnabled(mouseKeys.dragEnabled);
    interactorStyle.addMouseManipulator(manipulator);
  }
  /** 3D 旋转 */
  rotateManipulator(interactorStyle: vtkInteractorStyleManipulator, mouseKeys: MouseKeyType) {
    const manipulator = vtkMouseCameraTrackballRotateManipulator.newInstance({
      useWorldUpVec: false,
      // set WorldUpVector to be y-axis by default
      worldUpVec: [0, 1, 0],
      useFocalPointAsCenterOfRotation: true,
    });
    manipulator.setButton(mouseKeys.button || 3);
    manipulator.setDragEnabled(mouseKeys.dragEnabled);
    interactorStyle.addMouseManipulator(manipulator);
  }

  /** 2D 旋转 */
  rotate2DManipulator(interactorStyle: vtkInteractorStyleManipulator, mouseKeys: MouseKeyType) {
    const manipulator = vtkMouseCameraTrackballRollManipulator.newInstance();
    manipulator.setButton(mouseKeys.button || 3);
    manipulator.setDragEnabled(mouseKeys.dragEnabled);
    interactorStyle.addMouseManipulator(manipulator);
  }
  /** 缩放 */
  zoomManipulator(interactorStyle: vtkInteractorStyleManipulator, mouseKeys: MouseKeyType) {
    const manipulator = vtkMouseCameraTrackballZoomManipulator.newInstance();
    if (mouseKeys.button != undefined) manipulator.setButton(mouseKeys.button);
    if (mouseKeys.dragEnabled != undefined) manipulator.setDragEnabled(mouseKeys.dragEnabled);
    if (mouseKeys.scrollEnabled != undefined) manipulator.setScrollEnabled(mouseKeys.scrollEnabled);
    interactorStyle.addMouseManipulator(manipulator);
    return { interactorStyle };
  }

  /** 移除指定鼠标事件 即将废弃 */
  removeAllMouseManipulators(
    interactorStyle: vtkInteractorStyleManipulator,
    mouseKeys: MouseKeyType
  ) {
    const manipulators = interactorStyle.getMouseManipulators();
    interactorStyle.removeAllMouseManipulators();
    manipulators.forEach((manipulator: any) => {
      if (mouseKeys.button !== manipulator.getButton()) {
        interactorStyle.addMouseManipulator(manipulator);
      }
    });
  }
  /** 移除指定鼠标事件 */
  removeMouseManipulators(interactorStyle: vtkInteractorStyleManipulator, mouseKeys: MouseKeyType) {
    const manipulators = interactorStyle.getMouseManipulators();
    interactorStyle.removeAllMouseManipulators();
    manipulators.forEach((manipulator: any) => {
      if (mouseKeys.button !== manipulator.getButton()) {
        interactorStyle.addMouseManipulator(manipulator);
      }
    });
  }

  /** 默认鼠标事件 */
  defaultManipulator(interactorStyle: vtkInteractorStyleManipulator, type = "2D") {
    // 2D 右键缩放 / 3D 右键旋转
    if (type === "2D") {
      const manipulator1 = vtkMouseCameraTrackballZoomManipulator.newInstance();
      manipulator1.setButton(comMouseKeys.rightButton.button);
      manipulator1.setDragEnabled(comMouseKeys.rightButton.dragEnabled);
      interactorStyle.addMouseManipulator(manipulator1);
    } else if (type === "3D") {
      const manipulator1 = vtkMouseCameraTrackballRotateManipulator.newInstance();
      manipulator1.setButton(comMouseKeys.rightButton.button);
      manipulator1.setDragEnabled(comMouseKeys.rightButton.dragEnabled);
      interactorStyle.addMouseManipulator(manipulator1);
    }
    // 中间平移
    const manipulator2 = vtkMouseCameraTrackballPanManipulator.newInstance();
    manipulator2.setButton(comMouseKeys.middleButton.button);
    manipulator2.setDragEnabled(comMouseKeys.middleButton.dragEnabled);
    interactorStyle.addMouseManipulator(manipulator2);
  }
  
  /** 添加所有鼠标事件 */
  addMouseManipulator(interactorStyle: vtkInteractorStyleManipulator) {
    Object.keys(comMouseKeys).forEach((key) => {
      const { manipName, button, shift, control, alt, scrollEnabled, dragEnabled } = comMouseKeys[key];
      const klass = this.manipulatorFactory[manipName];
      if (klass) {
        const manipulator = klass.newInstance();

        manipulator.setButton(button);
        manipulator.setShift(!!shift);
        manipulator.setControl(!!control);
        manipulator.setAlt(!!alt);
        if (scrollEnabled !== undefined) {
          manipulator.setScrollEnabled(scrollEnabled);
        }
        if (dragEnabled !== undefined) {
          manipulator.setDragEnabled(dragEnabled);
        }

        interactorStyle.addMouseManipulator(manipulator);
      }
    });
  }
}

export const comManipulator = new ComManipulator();
