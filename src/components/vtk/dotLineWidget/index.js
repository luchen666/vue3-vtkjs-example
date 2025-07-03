import macro from '@kitware/vtk.js/macros';
import vtkAbstractWidgetFactory from '@kitware/vtk.js/Widgets/Core/AbstractWidgetFactory';
import vtkPlanePointManipulator from '@kitware/vtk.js/Widgets/Manipulators/PlaneManipulator';
import vtkPolyLineRepresentation from '@kitware/vtk.js/Widgets/Representations/PolyLineRepresentation';
import vtkSphereHandleRepresentation from '@kitware/vtk.js/Widgets/Representations/SphereHandleRepresentation';

import widgetBehavior from './behavior';
import stateGenerator from './state';

import { ViewTypes } from '@kitware/vtk.js/Widgets/Core/WidgetManager/Constants';

// ----------------------------------------------------------------------------
// Factory
// ----------------------------------------------------------------------------

function vtkPolyLineWidget(publicAPI, model) {
  model.classHierarchy.push('vtkPolyLineWidget');

  const superClass = { ...publicAPI };

  // --- Widget Requirement ---------------------------------------------------

  model.methodsToLink = [
    'activeColor',
    'activeScaleFactor',
    'closePolyLine',
    'defaultScale',
    'glyphResolution',
    'lineThickness',
    'useActiveColor',
    'scaleInPixels',
  ];

  publicAPI.getRepresentationsForViewType = (viewType) => {
    switch (viewType) {
      case ViewTypes.DEFAULT:
      case ViewTypes.GEOMETRY:
      case ViewTypes.SLICE:
      case ViewTypes.VOLUME:
      default:
        return [
          {
            builder: vtkSphereHandleRepresentation,
            labels: ['handles'],
          },
          {
            builder: vtkSphereHandleRepresentation,
            labels: ['moveHandle'],
          },
          {
            builder: vtkPolyLineRepresentation,
            labels: ['handles', 'moveHandle'],
            initialValues: {
              lineThickness: 0,
            },
          },
        ];
    }
  };

  // --- Public methods -------------------------------------------------------
  publicAPI.setManipulator = (manipulator) => {
    superClass.setManipulator(manipulator);
    model.widgetState.getMoveHandle().setManipulator(manipulator);
    model.widgetState.getHandleList().forEach((handle) => {
      handle.setManipulator(manipulator);
    });
  };

  // --------------------------------------------------------------------------
  // initialization
  // --------------------------------------------------------------------------

  // Default manipulator
  publicAPI.setManipulator(
    model.manipulator ||
      vtkPlanePointManipulator.newInstance({
        useCameraFocalPoint: true,
        useCameraNormal: true,
      })
  );
}

// ----------------------------------------------------------------------------

const defaultValues = (initialValues) => ({
  manipulator: null,
  behavior: widgetBehavior,
  widgetState: stateGenerator(),
  ...initialValues,
});

// ----------------------------------------------------------------------------

export function extend(publicAPI, model, initialValues = {}) {
  Object.assign(model, defaultValues(initialValues));

  vtkAbstractWidgetFactory.extend(publicAPI, model, initialValues);
  macro.setGet(publicAPI, model, ['manipulator']);

  vtkPolyLineWidget(publicAPI, model);
}

// ----------------------------------------------------------------------------

export const newInstance = macro.newInstance(extend, 'vtkPolyLineWidget');

// ----------------------------------------------------------------------------

export default { newInstance, extend };
