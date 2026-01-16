import vtkDataArray from "@kitware/vtk.js/Common/Core/DataArray";
import vtkLookupTable from "@kitware/vtk.js/Common/Core/LookupTable";
import { RGB_TYPE, dataArrayAdd, showRGBScalar, NoColor } from "./utils";
import { useCommonStore } from "@/stores";
import { addScalarBarActor, setActorPropertyFn } from "../actorSetting";
import { Message } from "@arco-design/web-vue";
import { urlList, BaseUrl } from "@/api/urlList";
import { standardType } from "../ComPose";
import { getFileBufferFromUrl } from "../common";

const MAX_SCALAR = 1.2;
let colorList: number[][] = [];
const plyOccColorList: number[][] = [];
export const setPlyTextureAndOcclusion = (
  polydata: any,
  actor: any,
  plyType: string,
  rgbType = "symptomRGBArray"
) => {
  const dataScalar = showRGBScalar(polydata, rgbType);
  if (dataScalar === false) return;

  const scalarColor = plyType === standardType.upper ? plyOccColorList[0] : plyOccColorList[1];
  const numLength = polydata.getNumberOfPoints();

  let scalesText = vtkDataArray.newInstance({
    numberOfComponents: 3,
    size: numLength * 3,
    dataType: "Uint8Array",
    name: "scalarColorName",
  });

  for (let i = 0; i < numLength; i++) {
    let color: number[] = [...NoColor];
    if (scalarColor[i] < 0) {
      color = [255, 0, 0];
    } else if (scalarColor[i] <= MAX_SCALAR) {
      const idx = Math.floor(scalarColor[i] * 10);
      color = colorList[idx];
    } else if (dataScalar.length) {
      color = [dataScalar[i * 3], dataScalar[i * 3 + 1], dataScalar[i * 3 + 2]];
    }
    scalesText.setTuple(i, [...color]);
  }

  polydata.getPointData().getScalars().setData(dataScalar);
  // 用于显示咬合深度数值
  polydata.getPointData().setScalars(scalesText);

  const viewStore = useCommonStore();
  // 设置 actor property
  setActorPropertyFn(actor, viewStore.textProperty);
};

/** 只显示 咬合接触 */
export const setPlyOcclusion = (polydata: any, actor: any) => {
  const dataScalar = getOcclusionArray(polydata, RGB_TYPE.OcclusionRGBArray);
  polydata.getPointData().getScalars().setData(dataScalar);

  const viewStore = useCommonStore();
  // 设置 actor property
  setActorPropertyFn(actor, viewStore.defProperty);
};

// 存储口扫咬合数据
const addOcclusionArray = (polydata: any, occlusion: number[]) => {
  const occlusalData = new Uint8Array(occlusion.length * 3);
  const scales = vtkDataArray.newInstance({
    numberOfComponents: 1,
    size: occlusion.length,
    dataType: "Float16Array",
    name: "occlusion",
  });
  for (let i = 0; i < occlusion.length; i++) {
    let color: number[] = [...NoColor];
    if (occlusion[i] < 0) {
      color = [255, 0, 0];
    } else if (occlusion[i] <= MAX_SCALAR) {
      const idx = Math.floor(occlusion[i] * 10);
      color = colorList[idx];
    }
    const idx = i * 3;
    occlusalData[idx] = color[0];
    occlusalData[idx + 1] = color[1];
    occlusalData[idx + 2] = color[2];

    scales.setTuple(i, [occlusion[i]]);
  }
  // 用于显示咬合深度数值
  polydata.getPointData().setVectors(scales);

  // 添加咬合接触 RBG array
  dataArrayAdd(polydata.getPointData(), occlusalData, 1, RGB_TYPE.OcclusionRGBArray);
};

const getOcclusionArray = (polydata: any, type: string) => {
  const dataArray = polydata.getPointData().getArray(type);
  return dataArray.getData();
};

const setMapperScalar = async (idx: number, occOssIds: any[], actor: any) => {
  const mapper = actor.getMapper();
  const inputData = mapper.getInputData();

  const occUrl = BaseUrl + urlList.getFileView + occOssIds[idx];
  let occText: any = await getFileBufferFromUrl(occUrl, "Text");
  plyOccColorList[idx] = occText.split(",").map((str: string) => Number(str));

  // 存储咬合数据
  addOcclusionArray(inputData, plyOccColorList[idx]);
  setPlyOcclusion(inputData, actor);
  mapper.modified();
}

// 设置 咬合接触颜色
export const setOcclusion = async (view3D: any, type = "") => {
  const viewStore = useCommonStore();
  if (viewStore.modelData.data.occlusal === undefined) {
    setTimeout(() => {
      setOcclusion(view3D, type);
    }, 1000);
    return;
  } else if (viewStore.modelData.data.occlusal === "") {
    Message.info("咬合分析计算失败");
    return;
  }
  const { upActor: actor0, lowActor: actor1, renderer, renderWindow } = view3D;

  const { occlusal } = viewStore.modelData.data;
  const occOssIds = occlusal.split("#");

  // 添加scalarBar
  const { colorTransferFunction, colorLenth } = addScalarBarActor(renderer);

  colorList = [];
  for (let i = 0; i <= colorLenth; i++) {
    let rgbVal = colorTransferFunction.mapValue(i / 10);
    colorList.push(rgbVal);
  }

  await setMapperScalar(0, occOssIds, actor0);
  await setMapperScalar(1, occOssIds, actor1);
  renderWindow.render();
};

/** 默认 scalar 设置 */
export const setLookUpTableFn = (actor: any, hasTexture: boolean) => {
  const mapper = actor.getMapper();
  mapper.setScalarRange(0, MAX_SCALAR);
  mapper.setScalarModeToUsePointData();
  mapper.setColorModeToMapScalars();
  const lut = vtkLookupTable.newInstance();
  lut.setHueRange([0, 0.67]);
  lut.setSaturationRange([1, 1]);
  lut.setValueRange([1, 1]);
  lut.setUseAboveRangeColor(true);
  if (hasTexture) {
    lut.setAboveRangeColor([1, 1, 1, 1]);
  } else {
    lut.setAboveRangeColor([0.92, 0.78, 0.47, 1]);
  }
  mapper.setLookupTable(lut);
};
