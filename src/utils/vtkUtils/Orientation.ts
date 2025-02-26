import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import vtkSTLReader from "@kitware/vtk.js/IO/Geometry/STLReader";
import vtkOrientationMarkerWidget from "@kitware/vtk.js/Interaction/Widgets/OrientationMarkerWidget";
import vtkActor from "@kitware/vtk.js/Rendering/Core/Actor";
import vtkMapper from "@kitware/vtk.js/Rendering/Core/Mapper";

// 创建人头方向
export const createOrientation = async (
  renderWindow: any,
  aspect = "BOTTOM_RIGHT"
) => {
  const iconMapper = vtkMapper.newInstance({ scalarVisibility: false });
  const iconActor = vtkActor.newInstance();
  iconActor.setMapper(iconMapper);
  iconActor.set({ nameId: "oriention" }, true);
  // 读取文件
  const reader = vtkSTLReader.newInstance();
  const url = `/data/Orientation.stl`;
  await reader.setUrl(url, { binary: true });
  reader.update();

  const impData = reader.getOutputData();
  iconMapper.setInputData(impData);

  // create orientation widget
  const orientationWidget = vtkOrientationMarkerWidget.newInstance({
    actor: iconActor,
    interactor: renderWindow.getInteractor(),
    viewportSize: 0.15,
    minPixelSize: 70,
    maxPixelSize: 200,
  });
  orientationWidget.setEnabled(true);
  const Corners = vtkOrientationMarkerWidget.Corners as { [key: string]: any };
  orientationWidget.setViewportCorner(Corners[aspect]);
  console.log(orientationWidget);

  return orientationWidget;
};
