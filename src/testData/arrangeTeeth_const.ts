
type StepOffsetType = {
  orientation: { s: number[]; v: { x: number; y: number; z: number } }
  position: { x: number; y: number; z: number }
}
export type JawType = {
  S11: null
  gums: { dracoBase64: string }[]
  iprs: {
    removes: { offset: number; removeVal: number; show: boolean }[] | []
  }[]
  teeth: {
    arrFakeTooth: []
    attachments: []
    attachmentsAuto: []
    bExtracted: false
    fdiName: '46'
    occlusalPads: []
    stepOffset: StepOffsetType[]
    toothAxis: { x: number; y: number; z: number }[]
    toothMesh: { dracoBase64: string }
    toothWidth: number
  }[]
}
export type ArrangeTeethType = {
  lowerJaw: JawType
  upperJaw: JawType
  lowerJawLocs: StepOffsetType[]
  totalStep: number // 28
}