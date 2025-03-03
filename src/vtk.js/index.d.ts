/// <reference path="./types.d.ts" />
/// <reference path="./interfaces.d.ts" />
/// <reference path="./Common/Core/Base64.d.ts" />
/// <reference path="./Common/Core/CellArray.d.ts" />
/// <reference path="./Common/Core/DataArray.d.ts" />
/// <reference path="./Common/Core/Endian.d.ts" />
/// <reference path="./Common/Core/HalfFloat.d.ts" />
/// <reference path="./Common/Core/ImageHelper.d.ts" />
/// <reference path="./Common/Core/LookupTable.d.ts" />
/// <reference path="./Common/Core/MatrixBuilder.d.ts" />
/// <reference path="./Common/Core/Points.d.ts" />
/// <reference path="./Common/Core/PriorityQueue.d.ts" />
/// <reference path="./Common/Core/ProgressHandler.d.ts" />
/// <reference path="./Common/Core/ScalarsToColors/Constants.d.ts" />
/// <reference path="./Common/Core/ScalarsToColors.d.ts" />
/// <reference path="./Common/Core/StringArray.d.ts" />
/// <reference path="./Common/Core/URLExtract.d.ts" />
/// <reference path="./Common/Core/VariantArray.d.ts" />
/// <reference path="./Common/DataModel/AbstractPointLocator.d.ts" />
/// <reference path="./Common/DataModel/BoundingBox.d.ts" />
/// <reference path="./Common/DataModel/Box.d.ts" />
/// <reference path="./Common/DataModel/CardinalSpline1D.d.ts" />
/// <reference path="./Common/DataModel/Cell.d.ts" />
/// <reference path="./Common/DataModel/Collection.d.ts" />
/// <reference path="./Common/DataModel/Cone.d.ts" />
/// <reference path="./Common/DataModel/Cylinder.d.ts" />
/// <reference path="./Common/DataModel/DataSet/Constants.d.ts" />
/// <reference path="./Common/DataModel/DataSet.d.ts" />
/// <reference path="./Common/DataModel/DataSetAttributes/FieldData.d.ts" />
/// <reference path="./Common/DataModel/DataSetAttributes.d.ts" />
/// <reference path="./Common/DataModel/EdgeLocator.d.ts" />
/// <reference path="./Common/DataModel/ITKHelper.d.ts" />
/// <reference path="./Common/DataModel/ImageData.d.ts" />
/// <reference path="./Common/DataModel/ImplicitFunction.d.ts" />
/// <reference path="./Common/DataModel/IncrementalOctreeNode.d.ts" />
/// <reference path="./Common/DataModel/IncrementalOctreePointLocator.d.ts" />
/// <reference path="./Common/DataModel/KochanekSpline1D.d.ts" />
/// <reference path="./Common/DataModel/Line.d.ts" />
/// <reference path="./Common/DataModel/Locator.d.ts" />
/// <reference path="./Common/DataModel/PiecewiseFunction.d.ts" />
/// <reference path="./Common/DataModel/Plane.d.ts" />
/// <reference path="./Common/DataModel/PointSet.d.ts" />
/// <reference path="./Common/DataModel/PolyData/Constants.d.ts" />
/// <reference path="./Common/DataModel/PolyData.d.ts" />
/// <reference path="./Common/DataModel/PolyLine.d.ts" />
/// <reference path="./Common/DataModel/Polygon.d.ts" />
/// <reference path="./Common/DataModel/Quad.d.ts" />
/// <reference path="./Common/DataModel/SelectionNode/Constants.d.ts" />
/// <reference path="./Common/DataModel/SelectionNode.d.ts" />
/// <reference path="./Common/DataModel/Sphere.d.ts" />
/// <reference path="./Common/DataModel/Spline1D.d.ts" />
/// <reference path="./Common/DataModel/Spline3D/Constants.d.ts" />
/// <reference path="./Common/DataModel/Spline3D.d.ts" />
/// <reference path="./Common/DataModel/Triangle.d.ts" />
/// <reference path="./Common/Transform/LandmarkTransform.d.ts" />
/// <reference path="./Common/Transform/Transform.d.ts" />
/// <reference path="./Filters/General/AppendPolyData.d.ts" />
/// <reference path="./Filters/General/ClipClosedSurface.d.ts" />
/// <reference path="./Filters/General/ContourLoopExtraction.d.ts" />
/// <reference path="./Filters/General/ContourTriangulator.d.ts" />
/// <reference path="./Filters/General/ImageCropFilter.d.ts" />
/// <reference path="./Filters/General/ImageDataOutlineFilter.d.ts" />
/// <reference path="./Filters/General/ImageOutlineFilter.d.ts" />
/// <reference path="./Filters/General/ImageSliceFilter.d.ts" />
/// <reference path="./Filters/General/ImageStreamline.d.ts" />
/// <reference path="./Filters/General/LineFilter.d.ts" />
/// <reference path="./Filters/General/OutlineFilter.d.ts" />
/// <reference path="./Filters/General/TriangleFilter.d.ts" />
/// <reference path="./Filters/General/TubeFilter.d.ts" />
/// <reference path="./Filters/Sources/Arrow2DSource.d.ts" />
/// <reference path="./Filters/Sources/ArrowSource.d.ts" />
/// <reference path="./Filters/Sources/CircleSource.d.ts" />
/// <reference path="./Filters/Sources/ConeSource.d.ts" />
/// <reference path="./Filters/Sources/CubeSource.d.ts" />
/// <reference path="./Filters/Sources/Cursor3D.d.ts" />
/// <reference path="./Filters/Sources/CylinderSource.d.ts" />
/// <reference path="./Filters/Sources/LineSource.d.ts" />
/// <reference path="./Filters/Sources/PlaneSource.d.ts" />
/// <reference path="./Filters/Sources/PointSource.d.ts" />
/// <reference path="./Filters/Sources/SphereSource.d.ts" />
/// <reference path="./Filters/Texture/TextureMapToPlane.d.ts" />
/// <reference path="./Filters/Texture/TextureMapToSphere.d.ts" />
/// <reference path="./IO/Core/DataAccessHelper/HtmlDataAccessHelper.d.ts" />
/// <reference path="./IO/Core/DataAccessHelper/HttpDataAccessHelper.d.ts" />
/// <reference path="./IO/Core/DataAccessHelper/JSZipDataAccessHelper.d.ts" />
/// <reference path="./IO/Core/DataAccessHelper/LiteHttpDataAccessHelper.d.ts" />
/// <reference path="./IO/Core/DataAccessHelper.d.ts" />
/// <reference path="./IO/Core/HttpDataSetReader.d.ts" />
/// <reference path="./IO/Core/HttpSceneLoader.d.ts" />
/// <reference path="./IO/Core/ImageStream/DefaultProtocol.d.ts" />
/// <reference path="./IO/Core/ImageStream/ViewStream.d.ts" />
/// <reference path="./IO/Core/ImageStream.d.ts" />
/// <reference path="./IO/Core/WSLinkClient.d.ts" />
/// <reference path="./IO/Geometry/DracoReader.d.ts" />
/// <reference path="./IO/Geometry/GLTFImporter.d.ts" />
/// <reference path="./IO/Geometry/PLYReader.d.ts" />
/// <reference path="./IO/Geometry/PLYWriter.d.ts" />
/// <reference path="./IO/Geometry/STLReader.d.ts" />
/// <reference path="./IO/Geometry/STLWriter.d.ts" />
/// <reference path="./IO/Image/HDRReader.d.ts" />
/// <reference path="./IO/Image/TGAReader.d.ts" />
/// <reference path="./IO/Misc/ElevationReader.d.ts" />
/// <reference path="./IO/Misc/GCodeReader.d.ts" />
/// <reference path="./IO/Misc/ITKImageReader.d.ts" />
/// <reference path="./IO/Misc/ITKPolyDataReader.d.ts" />
/// <reference path="./IO/Misc/JSONNucleoReader.d.ts" />
/// <reference path="./IO/Misc/JSONReader.d.ts" />
/// <reference path="./IO/Misc/MTLReader.d.ts" />
/// <reference path="./IO/Misc/OBJReader.d.ts" />
/// <reference path="./IO/Misc/PDBReader.d.ts" />
/// <reference path="./IO/XML/XMLImageDataReader.d.ts" />
/// <reference path="./IO/XML/XMLPolyDataReader.d.ts" />
/// <reference path="./IO/XML/XMLReader.d.ts" />
/// <reference path="./Imaging/Core/AbstractImageInterpolator/Constants.d.ts" />
/// <reference path="./Imaging/Core/ImageReslice/Constants.d.ts" />
/// <reference path="./Imaging/Core/ImageReslice.d.ts" />
/// <reference path="./Interaction/Manipulators/CompositeCameraManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/CompositeGestureManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/CompositeKeyboardManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/CompositeMouseManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/CompositeVRManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/GestureCameraManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseBoxSelectorManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseCameraTrackballMultiRotateManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseCameraTrackballPanManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseCameraTrackballRollManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseCameraTrackballRotateManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseCameraTrackballZoomManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseCameraTrackballZoomToMouseManipulator.d.ts" />
/// <reference path="./Interaction/Manipulators/MouseRangeManipulator.d.ts" />
/// <reference path="./Interaction/Style/InteractorStyleHMDXR.d.ts" />
/// <reference path="./Interaction/Style/InteractorStyleImage.d.ts" />
/// <reference path="./Interaction/Style/InteractorStyleManipulator.d.ts" />
/// <reference path="./Interaction/Style/InteractorStyleTrackballCamera.d.ts" />
/// <reference path="./Interaction/Widgets/OrientationMarkerWidget/Constants.d.ts" />
/// <reference path="./Interaction/Widgets/OrientationMarkerWidget.d.ts" />
/// <reference path="./Proxy/Core/AbstractRepresentationProxy.d.ts" />
/// <reference path="./Proxy/Core/LookupTableProxy.d.ts" />
/// <reference path="./Proxy/Core/PiecewiseFunctionProxy.d.ts" />
/// <reference path="./Proxy/Core/ProxyManager.d.ts" />
/// <reference path="./Proxy/Core/SourceProxy.d.ts" />
/// <reference path="./Proxy/Core/View2DProxy.d.ts" />
/// <reference path="./Proxy/Core/ViewProxy.d.ts" />
/// <reference path="./Proxy/Representations/GeometryRepresentationProxy.d.ts" />
/// <reference path="./Proxy/Representations/ResliceRepresentationProxy.d.ts" />
/// <reference path="./Proxy/Representations/SliceRepresentationProxy.d.ts" />
/// <reference path="./Proxy/Representations/VolumeRepresentationProxy.d.ts" />
/// <reference path="./Rendering/Core/AbstractImageMapper.d.ts" />
/// <reference path="./Rendering/Core/AbstractMapper.d.ts" />
/// <reference path="./Rendering/Core/AbstractMapper3D.d.ts" />
/// <reference path="./Rendering/Core/AbstractPicker.d.ts" />
/// <reference path="./Rendering/Core/Actor.d.ts" />
/// <reference path="./Rendering/Core/Actor2D.d.ts" />
/// <reference path="./Rendering/Core/AnnotatedCubeActor.d.ts" />
/// <reference path="./Rendering/Core/AxesActor.d.ts" />
/// <reference path="./Rendering/Core/Camera.d.ts" />
/// <reference path="./Rendering/Core/CellPicker.d.ts" />
/// <reference path="./Rendering/Core/ColorTransferFunction/ColorMaps.d.ts" />
/// <reference path="./Rendering/Core/ColorTransferFunction/Constants.d.ts" />
/// <reference path="./Rendering/Core/ColorTransferFunction/CssFilters.d.ts" />
/// <reference path="./Rendering/Core/ColorTransferFunction.d.ts" />
/// <reference path="./Rendering/Core/Coordinate/Constants.d.ts" />
/// <reference path="./Rendering/Core/Coordinate.d.ts" />
/// <reference path="./Rendering/Core/Follower.d.ts" />
/// <reference path="./Rendering/Core/Glyph3DMapper/Constants.d.ts" />
/// <reference path="./Rendering/Core/Glyph3DMapper.d.ts" />
/// <reference path="./Rendering/Core/HardwareSelector.d.ts" />
/// <reference path="./Rendering/Core/ImageArrayMapper.d.ts" />
/// <reference path="./Rendering/Core/ImageCPRMapper/Constants.d.ts" />
/// <reference path="./Rendering/Core/ImageCPRMapper.d.ts" />
/// <reference path="./Rendering/Core/ImageMapper/Constants.d.ts" />
/// <reference path="./Rendering/Core/ImageMapper.d.ts" />
/// <reference path="./Rendering/Core/ImageProperty/Constants.d.ts" />
/// <reference path="./Rendering/Core/ImageProperty.d.ts" />
/// <reference path="./Rendering/Core/ImageResliceMapper/Constants.d.ts" />
/// <reference path="./Rendering/Core/ImageResliceMapper.d.ts" />
/// <reference path="./Rendering/Core/ImageSlice.d.ts" />
/// <reference path="./Rendering/Core/InteractorObserver.d.ts" />
/// <reference path="./Rendering/Core/InteractorStyle/Constants.d.ts" />
/// <reference path="./Rendering/Core/InteractorStyle.d.ts" />
/// <reference path="./Rendering/Core/Light.d.ts" />
/// <reference path="./Rendering/Core/Mapper/CoincidentTopologyHelper.d.ts" />
/// <reference path="./Rendering/Core/Mapper/Constants.d.ts" />
/// <reference path="./Rendering/Core/Mapper.d.ts" />
/// <reference path="./Rendering/Core/Mapper2D.d.ts" />
/// <reference path="./Rendering/Core/Picker.d.ts" />
/// <reference path="./Rendering/Core/PixelSpaceCallbackMapper.d.ts" />
/// <reference path="./Rendering/Core/PointPicker.d.ts" />
/// <reference path="./Rendering/Core/Prop/Constants.d.ts" />
/// <reference path="./Rendering/Core/Prop.d.ts" />
/// <reference path="./Rendering/Core/Prop3D.d.ts" />
/// <reference path="./Rendering/Core/Property/Constants.d.ts" />
/// <reference path="./Rendering/Core/Property.d.ts" />
/// <reference path="./Rendering/Core/Property2D/Constants.d.ts" />
/// <reference path="./Rendering/Core/Property2D.d.ts" />
/// <reference path="./Rendering/Core/RenderWindow.d.ts" />
/// <reference path="./Rendering/Core/RenderWindowInteractor/Constants.d.ts" />
/// <reference path="./Rendering/Core/RenderWindowInteractor.d.ts" />
/// <reference path="./Rendering/Core/Renderer.d.ts" />
/// <reference path="./Rendering/Core/ScalarBarActor.d.ts" />
/// <reference path="./Rendering/Core/Skybox.d.ts" />
/// <reference path="./Rendering/Core/SphereMapper.d.ts" />
/// <reference path="./Rendering/Core/StickMapper.d.ts" />
/// <reference path="./Rendering/Core/Texture.d.ts" />
/// <reference path="./Rendering/Core/Viewport.d.ts" />
/// <reference path="./Rendering/Core/Volume.d.ts" />
/// <reference path="./Rendering/Core/VolumeMapper/Constants.d.ts" />
/// <reference path="./Rendering/Core/VolumeMapper.d.ts" />
/// <reference path="./Rendering/Core/VolumeProperty/Constants.d.ts" />
/// <reference path="./Rendering/Core/VolumeProperty.d.ts" />
/// <reference path="./Rendering/Misc/CanvasView.d.ts" />
/// <reference path="./Rendering/Misc/FullScreenRenderWindow.d.ts" />
/// <reference path="./Rendering/Misc/GenericRenderWindow.d.ts" />
/// <reference path="./Rendering/Misc/RemoteView.d.ts" />
/// <reference path="./Rendering/Misc/RenderWindowWithControlBar.d.ts" />
/// <reference path="./Rendering/Misc/SynchronizableRenderWindow/ObjectManager.d.ts" />
/// <reference path="./Rendering/Misc/SynchronizableRenderWindow.d.ts" />
/// <reference path="./Rendering/Misc/TextureLODsDownloader.d.ts" />
/// <reference path="./Rendering/OpenGL/BufferObject/Constants.d.ts" />
/// <reference path="./Rendering/OpenGL/BufferObject.d.ts" />
/// <reference path="./Rendering/OpenGL/HardwareSelector/Constants.d.ts" />
/// <reference path="./Rendering/OpenGL/HardwareSelector.d.ts" />
/// <reference path="./Rendering/OpenGL/RenderWindow.d.ts" />
/// <reference path="./Rendering/OpenGL/RenderWindow/resourceSharingHelper.d.ts" />
/// <reference path="./Rendering/OpenGL/Texture/Constants.d.ts" />
/// <reference path="./Rendering/OpenGL/Texture.d.ts" />
/// <reference path="./Rendering/SceneGraph/RenderPass.d.ts" />
/// <reference path="./Rendering/SceneGraph/ViewNode.d.ts" />
/// <reference path="./Rendering/SceneGraph/ViewNodeFactory.d.ts" />
/// <reference path="./Rendering/WebXR/RenderWindowHelper/Constants.d.ts" />
/// <reference path="./Rendering/WebXR/RenderWindowHelper.d.ts" />
/// <reference path="./Widgets/Core/AbstractWidget.d.ts" />
/// <reference path="./Widgets/Core/AbstractWidgetFactory.d.ts" />
/// <reference path="./Widgets/Core/StateBuilder.d.ts" />
/// <reference path="./Widgets/Core/WidgetManager/Constants.d.ts" />
/// <reference path="./Widgets/Core/WidgetManager.d.ts" />
/// <reference path="./Widgets/Core/WidgetState.d.ts" />
/// <reference path="./Widgets/Manipulators/AbstractManipulator.d.ts" />
/// <reference path="./Widgets/Manipulators/LineManipulator.d.ts" />
/// <reference path="./Widgets/Manipulators/PickerManipulator.d.ts" />
/// <reference path="./Widgets/Manipulators/PlaneManipulator.d.ts" />
/// <reference path="./Widgets/Manipulators/TrackballManipulator.d.ts" />
/// <reference path="./Widgets/Representations/WidgetRepresentation.d.ts" />
/// <reference path="./Widgets/Widgets3D/InteractiveOrientationWidget/helpers.d.ts" />
/// <reference path="./Widgets/Widgets3D/InteractiveOrientationWidget.d.ts" />
/// <reference path="./Widgets/Widgets3D/ResliceCursorWidget/Constants.d.ts" />
/// <reference path="./Widgets/Widgets3D/ResliceCursorWidget/behavior.d.ts" />
/// <reference path="./Widgets/Widgets3D/ResliceCursorWidget.d.ts" />
/// <reference path="./Widgets/Widgets3D/SeedWidget.d.ts" />
/// <reference path="./Widgets/Widgets3D/SphereWidget.d.ts" />
/// <reference path="./vtk.d.ts" />
/// <reference path="./Common/Core/Math.d.ts" />
/// <reference path="./macros.d.ts" />