import { getTextureData, dataArrayAdd } from "./utils";
import { symptomColorList } from "@/components/functional/symptom/symptomMap";

/**
 * 设置病症样式
 * @param polydata
 * @param data
 */
export const setSymptomScalar = (polydata: any, data: { [key: number]: number[] }) => {
  let dataScalar = getTextureData(polydata);
  if (!dataScalar) return;

  let idx = 0;
  for (let key in data) {
    if (key === "4") continue; // 颜色异常
    const color = symptomColorList[key];
    for (let i = 0; i < data[key].length; i++) {
      idx = data[key][i] * 3;
      dataScalar[idx] = color[0];
      dataScalar[idx + 1] = color[1];
      dataScalar[idx + 2] = color[2];
    }
  }
  polydata.getPointData().getScalars().setData(dataScalar);

  // 添加病症array
  dataArrayAdd(polydata.getPointData(), dataScalar, 1, "symptomRGBArray");
};

/** 更新病症样式 */
export const updateSymptomScalar = (polydata: any, data: { [key: number]: number[] }) => {
  
}