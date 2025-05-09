const ShapeType = {
  // NONE is a sphere handle always invisible even on mouseover, which
  // prevents user from moving handle once it is placed
  NONE: 'voidSphere',
  // 3D handles
  SPHERE: 'sphere',
  CUBE: 'cube',
  CONE: 'cone',
  // 2D handles
  ARROWHEAD3: 'triangle',
  ARROWHEAD4: '4pointsArrowHead',
  ARROWHEAD6: '6pointsArrowHead',
  STAR: 'star',
  DISK: 'disk',
  CIRCLE: 'circle',
  VIEWFINDER: 'viewFinder'
};
const Shapes2D = [ShapeType.ARROWHEAD3, ShapeType.ARROWHEAD4, ShapeType.ARROWHEAD6, ShapeType.STAR, ShapeType.DISK, ShapeType.CIRCLE, ShapeType.VIEWFINDER];
const Shapes3D = [ShapeType.SPHERE, ShapeType.CUBE, ShapeType.CONE];
const ShapesOrientable = [ShapeType.CONE, ShapeType.ARROWHEAD3, ShapeType.ARROWHEAD4, ShapeType.ARROWHEAD6];
var Constants = {
  ShapeType,
  Shapes2D,
  Shapes3D,
  ShapesOrientable
};

export { ShapeType, Shapes2D, Shapes3D, ShapesOrientable, Constants as default };
