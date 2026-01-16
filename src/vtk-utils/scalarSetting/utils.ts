import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import type { TypedArray } from "@kitware/vtk.js/types";


export const NoColor: number[] = [235, 199, 120];
export const RGB_TYPE = {
  Texture: "Texture",
  NoTexture: "NoTexture",
  symptomRGBArray: "symptomRGBArray",
  OcclusionRGBArray: "OcclusionRGBArray",
};

/**
 * 获取纹理 scalars
 * @param polydata
 * @returns
 */
export const getTextureData = (polydata: any, type = "Texture") => {
  const isShowTexture = true;
  let textureArray = [];
  if (isShowTexture) {
    textureArray = polydata.getPointData().getArray(type);
    if (!textureArray && type !== "Texture") {
      textureArray = polydata.getPointData().getArray("Texture");
    }
    if (!textureArray) return null;
  } else {
    textureArray = polydata.getPointData().getArray("NoTexture");
  }

  let size = textureArray.getNumberOfValues();
  const dataArray = vtkDataArray.newInstance({ size });
  dataArray.deepCopy(textureArray);
  let dataScalar = dataArray.getData();
  return dataScalar;
};

// 显示Scalar
export const showRGBScalar = (polydata: any, type: string) => {
  let dataScalar = getTextureData(polydata, type);
  if (!dataScalar) return false;
  polydata.getPointData().getScalars().setData(dataScalar);
  return dataScalar;
};

// 设置 DataArray
export const dataArrayAdd = (pointData: any, values: number[] | TypedArray, num = 1, name: string) => {
  const dataArray = vtkDataArray.newInstance({
    name,
    numberOfComponents: num,
    values,
  });
  pointData.addArray(dataArray);
};