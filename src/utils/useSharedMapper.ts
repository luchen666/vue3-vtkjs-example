// import "@/components/common/new-vtk-profile-webgl";
// import vtkImageCropFilter from '@kitware/vtk.js/Filters/General/ImageCropFilter'
// import vtkVolumeMapper from '@kitware/vtk.js/Rendering/Core/VolumeMapper'
import vtkVolumeMapper from '@/vtk.js/Rendering/Core/VolumeMapper'
import vtkImageCropFilter from '@/vtk.js/Filters/General/ImageCropFilter'
import type vtkMapper from '@/vtk.js/Rendering/Core/Mapper'
import vtkPlane from '@/vtk.js/Common/DataModel/Plane'

import { getImageData2 } from '@/utils/covertImageData'
import imageData from '@/testData/buffer3D.json'

// 多个体数据共享一个mapper源
class SharedMapper {
  image: any

  // 共享 mapper，cropFilter，imageData 的效果是一样的
  getImage = () => {
    if (!this.image) {
      this.image = getImageData2(imageData)
    }
    return this.image
  }

  clipPlane(planes: any, mapper: vtkMapper) {
    mapper.removeAllClippingPlanes()
    // 添加裁剪
    planes.forEach((plane: any, index: number) => {
      const clipPlane1 = vtkPlane.newInstance()
      clipPlane1.setOrigin(plane.center)
      clipPlane1.setNormal(...plane.normal)
      mapper.addClippingPlane(clipPlane1)
    })
  }
}
export const sharedMapper = new SharedMapper()
