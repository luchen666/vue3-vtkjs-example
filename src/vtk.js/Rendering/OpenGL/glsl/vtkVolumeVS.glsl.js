var vtkVolumeVS = "//VTK::System::Dec\n\n/*=========================================================================\n\n  Program:   Visualization Toolkit\n  Module:    vtkPolyDataVS.glsl\n\n  Copyright (c) Ken Martin, Will Schroeder, Bill Lorensen\n  All rights reserved.\n  See Copyright.txt or http://www.kitware.com/Copyright.htm for details.\n\n     This software is distributed WITHOUT ANY WARRANTY; without even\n     the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR\n     PURPOSE.  See the above copyright notice for more information.\n\n=========================================================================*/\n\nattribute vec4 vertexDC;\n\nvarying vec3 vertexVCVSOutput;\nuniform mat4 PCVCMatrix;\n\nuniform float dcxmin;\nuniform float dcxmax;\nuniform float dcymin;\nuniform float dcymax;\n\nvoid main()\n{\n  // dcsmall is the device coords reduced to the\n  // x y area covered by the volume\n  vec4 dcsmall = vec4(\n    dcxmin + 0.5 * (vertexDC.x + 1.0) * (dcxmax - dcxmin),\n    dcymin + 0.5 * (vertexDC.y + 1.0) * (dcymax - dcymin),\n    vertexDC.z,\n    vertexDC.w);\n  vec4 vcpos = PCVCMatrix * dcsmall;\n  vertexVCVSOutput = vcpos.xyz/vcpos.w;\n  gl_Position = dcsmall;\n}\n";

export { vtkVolumeVS as v };