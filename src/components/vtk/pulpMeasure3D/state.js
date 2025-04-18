import vtkStateBuilder from "@kitware/vtk.js/Widgets/Core/StateBuilder";

import { splineKind } from "@kitware/vtk.js/Common/DataModel/Spline3D/Constants";

import { BoundaryCondition } from "@kitware/vtk.js/Common/DataModel/Spline1D/Constants";

export default function generateState() {
  return vtkStateBuilder
    .createBuilder()
    .addField({ name: "splineKind", initialValue: splineKind.KOCHANEK_SPLINE })
    .addField({ name: "splineLength", initialValue: 0 })
    .addField({ name: "splineClosed", initialValue: true })
    .addField({
      name: "splineBoundaryCondition",
      initialValue: BoundaryCondition.DEFAULT,
    })
    .addField({
      name: "splineBoundaryConditionValues",
      initialValue: [0, 0, 0],
    })
    .addField({ name: "borderColor", initialValue: [0.1, 1, 0.1] })
    .addField({ name: "splineTension", initialValue: 0 })
    .addField({ name: "splineContinuity", initialValue: 0 })
    .addField({ name: "splineBias", initialValue: 0 })

    .addStateFromMixin({
      labels: ["moveHandle"],
      mixins: ["origin", "color", "color3", "scale1", "visible", "manipulator"],
      name: "moveHandle",
      initialValues: {
        scale1: 0.2,
        visible: true,
      },
    })
    .addDynamicMixinState({
      labels: ["handles"],
      mixins: ["origin", "color", "color3", "scale1", "visible", "manipulator"],
      name: "handle",
      initialValues: {
        scale1: 0.2,
        visible: true,
      },
    })
    .addStateFromMixin({
      labels: ["SVGtext"],
      mixins: ["origin", "color", "text", "visible"],
      name: "text",
      initialValues: {
        text: "",
      },
    })
    .build();
}
