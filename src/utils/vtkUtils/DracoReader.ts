import vtkDracoReader from '@kitware/vtk.js/IO/Geometry/DracoReader';
import type vtkPolyData from '@/vtk.js/Common/DataModel/PolyData';
import DracoDecoderModule from '@/library/draco_decoder_nodejs1.5.7.js';

const reader = vtkDracoReader.newInstance()
export const getDracoPolyData = async (
  fileUrl: string,
): Promise<vtkPolyData> => {
  await vtkDracoReader.setDracoDecoder(DracoDecoderModule)
  await reader.setUrl(fileUrl, { binary: true })
  return reader.getOutputData()
}


export function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64)
  const len = binaryString.length
  const bytes = new Uint8Array(len)
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes;
}