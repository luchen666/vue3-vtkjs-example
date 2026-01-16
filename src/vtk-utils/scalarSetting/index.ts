import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import { getTextureData, dataArrayAdd, showRGBScalar, NoColor } from "./utils";

export { showRGBScalar, RGB_TYPE } from "./utils";

/**
 * 牙齿label id
 * @param inputData
 * @param data
 */
export const setToothScalar = (polydata: any, toothNos: number[], RGBScalarType = "symptomRGBArray") => {
  const data: number[] = [];
  toothNos.forEach((no: number) => {
    const newData = polydata.getPointData().getArray(`toothNo_${no}`)?.getData() || [];
    data.push(...newData);
  });
  let dataScalar = getTextureData(polydata, RGBScalarType);
  if (!dataScalar) return;

  let idx = 0;
  let color = [230, 180, 90];
  for (let i = 0; i < data.length; i++) {
    idx = data[i] * 3;
    dataScalar[idx] = color[0];
    dataScalar[idx + 1] = color[1];
    dataScalar[idx + 2] = color[2];
  }
  polydata.getPointData().getScalars().setData(dataScalar);
};

/**
 * 牙齿label id 测试
 * @param inputData
 * @param data
 */
export const setAllToothColor = (polydata: any, data: number[]) => {
  let dataScalar = getTextureData(polydata, "symptomRGBArray");
  if (!dataScalar) return;
  let idx = 0;
  let color = [230, 180, 90];
  for (let i = 0; i < data.length; i++) {
    idx = i * 3;
    if (data[i] !== 0) {
      dataScalar[idx] = color[0];
      dataScalar[idx + 1] = color[1];
      dataScalar[idx + 2] = color[2];
    }
  }
  polydata.getPointData().getScalars().setData(dataScalar);
};

// 显示病症+纹理 scalars颜色单颌
export const resetRGBScalar = (polydata: any, rgbType = "symptomRGBArray") =>
  showRGBScalar(polydata, rgbType);

// 不显示scalars颜色
export const removeRGBScalar = (polydata: any) => showRGBScalar(polydata, "NoTexture");

/**
 * 设置每个顶点的牙位编号
 * @param polydata
 * @param data
 */
export const setToothNoScalar = (polydata: any, data: number[]) => {
  let scalesText = vtkDataArray.newInstance({
    numberOfComponents: 1,
    size: data.length,
    dataType: "Uint8Array",
  });

  let arr = [];
  for (let i = 0; i < data.length; i++) {
    scalesText.setTuple(i, [data[i]]);
    if (data[i]) {
      arr.push(data[i]);
    }
  }
  // 用于显示牙齿编号
  polydata.getPointData().setTensors(scalesText);
};

/**
 * 存储每个牙位编号对应的顶点
 * @param polydata
 * @param data
 */
export const setToothNoArray = (polydata: any, data: { [key: number]: number[] }) => {
  for (let key in data) {
    // 添加array
    dataArrayAdd(polydata.getPointData(), data[key], 1, `toothNo_${key}`);
  }
};

// 设置ply scalars
export const setTextureByScalar = (pointData: any) => {
  const colors = pointData.getScalars()?.getData() || [];
  const scales = vtkDataArray.newInstance({
    numberOfComponents: 3,
    size: colors.length,
    dataType: "Uint8Array",
  });
  pointData.setScalars(scales);

  const numLength = colors.length / 3;
  // const noTextureData = new Uint8Array(colors.length);
  for (let i = 0; i < numLength; i++) {
    const idx = i * 3;
    let color = [colors[idx], colors[idx + 1], colors[idx + 2]];
    scales.setTuple(i, [...color]);
    // noTextureData[idx] = NoColor[0];
    // noTextureData[idx + 1] = NoColor[1];
    // noTextureData[idx + 2] = NoColor[2];
  }

  // // 添加纹理array
  // dataArrayAdd(pointData, scales.getData(), 1, "Texture");

  // // 添加无纹理array
  // dataArrayAdd(pointData, noTextureData, 1, "NoTexture");
};

// 设置无纹理 scalars
export const setNotureByScalar = (pointLen: number, pointData: any) => {
  const noTextureData = new Uint8Array(pointLen * 3);
  for (let i = 0; i < pointLen; i++) {
    const idx = i * 3;
    noTextureData[idx] = NoColor[0];
    noTextureData[idx + 1] = NoColor[1];
    noTextureData[idx + 2] = NoColor[2];
  }

  const scales = vtkDataArray.newInstance({
    numberOfComponents: 3,
    dataType: "Uint8Array",
    values: noTextureData,
  });
  pointData.setScalars(scales);

  // 添加无纹理array
  dataArrayAdd(pointData, noTextureData, 1, "NoTexture");
};