const TYPE_INDEXED = 1;
const TYPE_RGB = 2;
const TYPE_GREY = 3;
const TYPE_RLE_INDEXED = 9;
const TYPE_RLE_RGB = 10;
const TYPE_RLE_GREY = 11;
const ORIGIN_MASK = 0x30;
const ORIGIN_SHIFT = 0x04;
const ORIGIN_BL = 0x00;
const ORIGIN_BR = 0x01;
const ORIGIN_UL = 0x02;
const ORIGIN_UR = 0x03;
var Constants = {
  TYPE_INDEXED,
  TYPE_RGB,
  TYPE_GREY,
  TYPE_RLE_INDEXED,
  TYPE_RLE_RGB,
  TYPE_RLE_GREY,
  ORIGIN_MASK,
  ORIGIN_SHIFT,
  ORIGIN_BL,
  ORIGIN_BR,
  ORIGIN_UL,
  ORIGIN_UR
};

export { Constants as default };
