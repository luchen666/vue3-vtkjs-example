import { m as macro } from '../../macros2.js';
import vtkCellArray from '../../Common/Core/CellArray.js';
import vtkDataArray from '../../Common/Core/DataArray.js';
import { l as normalize, j as cross, n as norm, d as dot, e as distance2BetweenPoints } from '../../Common/Core/Math/index.js';
import vtkPoints from '../../Common/Core/Points.js';
import vtkPolyData from '../../Common/DataModel/PolyData.js';
import { DesiredOutputPrecision } from '../../Common/DataModel/DataSetAttributes/Constants.js';
import { VtkDataTypes } from '../../Common/Core/DataArray/Constants.js';
import Constants from './TubeFilter/Constants.js';

const {
  VaryRadius,
  GenerateTCoords
} = Constants;
const {
  vtkDebugMacro,
  vtkErrorMacro,
  vtkWarningMacro
} = macro;

// ----------------------------------------------------------------------------
// vtkTubeFilter methods
// ----------------------------------------------------------------------------

function vtkTubeFilter(publicAPI, model) {
  // Set our classname
  model.classHierarchy.push('vtkTubeFilter');
  function computeOffset(offset, npts) {
    let newOffset = offset;
    if (model.sidesShareVertices) {
      newOffset += model.numberOfSides * npts;
    } else {
      // points are duplicated
      newOffset += 2 * model.numberOfSides * npts;
    }
    if (model.capping) {
      // cap points are duplicated
      newOffset += 2 * model.numberOfSides;
    }
    return newOffset;
  }
  function findNextValidSegment(points, pointIds, start) {
    const ptId = pointIds[start];
    const ps = points.slice(3 * ptId, 3 * (ptId + 1));
    let end = start + 1;
    while (end < pointIds.length) {
      const endPtId = pointIds[end];
      const pe = points.slice(3 * endPtId, 3 * (endPtId + 1));
      if (ps !== pe) {
        return end - 1;
      }
      ++end;
    }
    return pointIds.length;
  }
  function generateSlidingNormals(pts, lines, normals) {
    let firstNormal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
    let normal = [0.0, 0.0, 1.0];
    const lineData = lines;
    // lid = 0;
    let npts = lineData[0];
    for (let i = 0; i < lineData.length; i += npts + 1) {
      npts = lineData[i];
      if (npts === 1) {
        // return arbitrary
        normals.setTuple(lineData[i + 1], normal);
      } else if (npts > 1) {
        let sNextId = 0;
        let sPrev = [0, 0, 0];
        const sNext = [0, 0, 0];
        const linePts = lineData.slice(i + 1, i + 1 + npts);
        sNextId = findNextValidSegment(pts, linePts, 0);
        if (sNextId !== npts) {
          // at least one valid segment
          let pt1Id = linePts[sNextId];
          let pt1 = pts.slice(3 * pt1Id, 3 * (pt1Id + 1));
          let pt2Id = linePts[sNextId + 1];
          let pt2 = pts.slice(3 * pt2Id, 3 * (pt2Id + 1));
          sPrev = pt2.map((elem, idx) => elem - pt1[idx]);
          normalize(sPrev);

          // compute first normal
          if (firstNormal) {
            normal = firstNormal;
          } else {
            // find the next valid, non-parallel segment
            while (++sNextId < npts) {
              sNextId = findNextValidSegment(pts, linePts, sNextId);
              if (sNextId !== npts) {
                pt1Id = linePts[sNextId];
                pt1 = pts.slice(3 * pt1Id, 3 * (pt1Id + 1));
                pt2Id = linePts[sNextId + 1];
                pt2 = pts.slice(3 * pt2Id, 3 * (pt2Id + 1));
                for (let j = 0; j < 3; ++j) {
                  sNext[j] = pt2[j] - pt1[j];
                }
                normalize(sNext);

                // now the starting normal should simply be the cross product.
                // In the following if statement, we check for the case where
                // the two segments are parallel, in which case, continue
                // searching for the next valid segment
                const n = [0.0, 0.0, 0.0];
                cross(sPrev, sNext, n);
                if (norm(n) > 1.0e-3) {
                  normal = n;
                  sPrev = sNext;
                  break;
                }
              }
            }
            if (sNextId >= npts) {
              // only one valid segment
              // a little trick to find orthogonal normal
              for (let j = 0; j < 3; ++j) {
                if (sPrev[j] !== 0.0) {
                  normal[(j + 2) % 3] = 0.0;
                  normal[(j + 1) % 3] = 1.0;
                  normal[j] = -sPrev[(j + 1) % 3] / sPrev[j];
                  break;
                }
              }
            }
          }
          normalize(normal);

          // compute remaining normals
          let lastNormalId = 0;
          while (++sNextId < npts) {
            sNextId = findNextValidSegment(pts, linePts, sNextId);
            if (sNextId === npts) {
              break;
            }
            pt1Id = linePts[sNextId];
            pt1 = pts.slice(3 * pt1Id, 3 * (pt1Id + 1));
            pt2Id = linePts[sNextId + 1];
            pt2 = pts.slice(3 * pt2Id, 3 * (pt2Id + 1));
            for (let j = 0; j < 3; ++j) {
              sNext[j] = pt2[j] - pt1[j];
            }
            normalize(sNext);

            // compute rotation vector
            const w = [0.0, 0.0, 0.0];
            cross(sPrev, normal, w);
            if (normalize(w) !== 0.0) {
              // can't use this segment otherwise
              const q = [0.0, 0.0, 0.0];
              cross(sNext, sPrev, q);
              if (normalize(q) !== 0.0) {
                // can't use this segment otherwise
                const f1 = dot(q, normal);
                let f2 = 1.0 - f1 * f1;
                if (f2 > 0.0) {
                  f2 = Math.sqrt(f2);
                } else {
                  f2 = 0.0;
                }
                const c = [0, 0, 0];
                for (let j = 0; j < 3; ++j) {
                  c[j] = sNext[j] + sPrev[j];
                }
                normalize(c);
                cross(c, q, w);
                cross(sPrev, q, c);
                if (dot(normal, c) * dot(w, c) < 0.0) {
                  f2 *= -1.0;
                }

                // insert current normal before updating
                for (let j = lastNormalId; j < sNextId; ++j) {
                  normals.setTuple(linePts[j], normal);
                }
                lastNormalId = sNextId;
                sPrev = sNext;

                // compute next normal
                normal = f1 * q + f2 * w;
              }
            }
          }

          // insert last normal for the remaining points
          for (let j = lastNormalId; j < npts; ++j) {
            normals.setTuple(linePts[j], normal);
          }
        } else {
          // no valid segments
          for (let j = 0; j < npts; ++j) {
            normals.setTuple(linePts[j], normal);
          }
        }
      }
    }
    return 1;
  }
  function generatePoints(offset, npts, pts, inPts, newPts, pd, outPD, newNormals, inScalars, range, inVectors, maxSpeed, inNormals, theta) {
    // Use averaged segment to create beveled effect.
    const sNext = [0.0, 0.0, 0.0];
    const sPrev = [0.0, 0.0, 0.0];
    const startCapNorm = [0.0, 0.0, 0.0];
    const endCapNorm = [0.0, 0.0, 0.0];
    let p = [0.0, 0.0, 0.0];
    let pNext = [0.0, 0.0, 0.0];
    let s = [0.0, 0.0, 0.0];
    let n = [0.0, 0.0, 0.0];
    const w = [0.0, 0.0, 0.0];
    const nP = [0.0, 0.0, 0.0];
    const normal = [0.0, 0.0, 0.0];
    let sFactor = 1.0;
    let ptId = offset;
    const vector = [];
    for (let j = 0; j < npts; ++j) {
      // First point
      if (j === 0) {
        p = inPts.slice(3 * pts[0], 3 * (pts[0] + 1));
        pNext = inPts.slice(3 * pts[1], 3 * (pts[1] + 1));
        for (let i = 0; i < 3; ++i) {
          sNext[i] = pNext[i] - p[i];
          sPrev[i] = sNext[i];
          startCapNorm[i] = -sPrev[i];
        }
        normalize(startCapNorm);
      } else if (j === npts - 1) {
        for (let i = 0; i < 3; ++i) {
          sPrev[i] = sNext[i];
          p[i] = pNext[i];
          endCapNorm[i] = sNext[i];
        }
        normalize(endCapNorm);
      } else {
        for (let i = 0; i < 3; ++i) {
          p[i] = pNext[i];
        }
        pNext = inPts.slice(3 * pts[j + 1], 3 * (pts[j + 1] + 1));
        for (let i = 0; i < 3; ++i) {
          sPrev[i] = sNext[i];
          sNext[i] = pNext[i] - p[i];
        }
      }
      if (normalize(sNext) === 0.0) {
        vtkWarningMacro('Coincident points!');
        return 0;
      }
      for (let i = 0; i < 3; ++i) {
        s[i] = (sPrev[i] + sNext[i]) / 2.0; // average vector
      }

      n = inNormals.slice(3 * pts[j], 3 * (pts[j] + 1));
      // if s is zero then just use sPrev cross n
      if (normalize(s) === 0.0) {
        cross(sPrev, n, s);
        if (normalize(s) === 0.0) {
          vtkDebugMacro('Using alternate bevel vector');
        }
      }
      cross(s, n, w);
      if (normalize(w) === 0.0) {
        let msg = 'Bad normal: s = ';
        msg += `${s[0]},  ${s[1]}, ${s[2]}`;
        msg += ` n = ${n[0]},  ${n[1]}, ${n[2]}`;
        vtkWarningMacro(msg);
        return 0;
      }
      cross(w, s, nP); // create orthogonal coordinate system
      normalize(nP);

      // Compute a scalar factor based on scalars or vectors
      if (inScalars && model.varyRadius === VaryRadius.VARY_RADIUS_BY_SCALAR) {
        sFactor = 1.0 + (model.radiusFactor - 1.0) * (inScalars.getComponent(pts[j], 0) - range[0]) / (range[1] - range[0]);
      } else if (inVectors && model.varyRadius === VaryRadius.VARY_RADIUS_BY_VECTOR) {
        sFactor = Math.sqrt(maxSpeed / norm(inVectors.getTuple(pts[j], vector)));
        if (sFactor > model.radiusFactor) {
          sFactor = model.radiusFactor;
        }
      } else if (inScalars && model.varyRadius === VaryRadius.VARY_RADIUS_BY_ABSOLUTE_SCALAR) {
        sFactor = inScalars.getComponent(pts[j], 0);
        if (sFactor < 0.0) {
          vtkWarningMacro('Scalar value less than zero, skipping line');
          return 0;
        }
      }

      // create points around line
      if (model.sidesShareVertices) {
        for (let k = 0; k < model.numberOfSides; ++k) {
          for (let i = 0; i < 3; ++i) {
            normal[i] = w[i] * Math.cos(k * theta) + nP[i] * Math.sin(k * theta);
            s[i] = p[i] + model.radius * sFactor * normal[i];
            newPts[3 * ptId + i] = s[i];
            newNormals[3 * ptId + i] = normal[i];
          }
          outPD.passData(pd, pts[j], ptId);
          ptId++;
        } // for each side
      } else {
        const nRight = [0, 0, 0];
        const nLeft = [0, 0, 0];
        for (let k = 0; k < model.numberOfSides; ++k) {
          for (let i = 0; i < 3; ++i) {
            // Create duplicate vertices at each point
            // and adjust the associated normals so that they are
            // oriented with the facets. This preserves the tube's
            // polygonal appearance, as if by flat-shading around the tube,
            // while still allowing smooth (gouraud) shading along the
            // tube as it bends.
            normal[i] = w[i] * Math.cos(k * theta) + nP[i] * Math.sin(k * theta);
            nRight[i] = w[i] * Math.cos((k - 0.5) * theta) + nP[i] * Math.sin((k - 0.5) * theta);
            nLeft[i] = w[i] * Math.cos((k + 0.5) * theta) + nP[i] * Math.sin((k + 0.5) * theta);
            s[i] = p[i] + model.radius * sFactor * normal[i];
            newPts[3 * ptId + i] = s[i];
            newNormals[3 * ptId + i] = nRight[i];
            newPts[3 * (ptId + 1) + i] = s[i];
            newNormals[3 * (ptId + 1) + i] = nLeft[i];
          }
          outPD.passData(pd, pts[j], ptId + 1);
          ptId += 2;
        } // for each side
      } // else separate vertices
    } // for all points in the polyline

    // Produce end points for cap. They are placed at tail end of points.
    if (model.capping) {
      let numCapSides = model.numberOfSides;
      let capIncr = 1;
      if (!model.sidesShareVertices) {
        numCapSides = 2 * model.numberOfSides;
        capIncr = 2;
      }

      // the start cap
      for (let k = 0; k < numCapSides; k += capIncr) {
        s = newPts.slice(3 * (offset + k), 3 * (offset + k + 1));
        for (let i = 0; i < 3; ++i) {
          newPts[3 * ptId + i] = s[i];
          newNormals[3 * ptId + i] = startCapNorm[i];
        }
        outPD.passData(pd, pts[0], ptId);
        ptId++;
      }

      // the end cap
      let endOffset = offset + (npts - 1) * model.numberOfSides;
      if (!model.sidesShareVertices) {
        endOffset = offset + 2 * (npts - 1) * model.numberOfSides;
      }
      for (let k = 0; k < numCapSides; k += capIncr) {
        s = newPts.slice(3 * (endOffset + k), 3 * (endOffset + k + 1));
        for (let i = 0; i < 3; ++i) {
          newPts[3 * ptId + i] = s[i];
          newNormals[3 * ptId + i] = endCapNorm[i];
        }
        outPD.passData(pd, pts[npts - 1], ptId);
        ptId++;
      }
    } // if capping

    return 1;
  }
  function generateStrips(offset, npts, inCellId, outCellId, inCD, outCD, newStrips) {
    let i1 = 0;
    let i2 = 0;
    let i3 = 0;
    let newOutCellId = outCellId;
    let outCellIdx = 0;
    const newStripsData = newStrips.getData();
    let cellId = 0;
    while (outCellIdx < newStripsData.length) {
      if (cellId === outCellId) {
        break;
      }
      outCellIdx += newStripsData[outCellIdx] + 1;
      cellId++;
    }
    if (model.sidesShareVertices) {
      for (let k = offset; k < model.numberOfSides + offset; k += model.onRatio) {
        i1 = k % model.numberOfSides;
        i2 = (k + 1) % model.numberOfSides;
        newStripsData[outCellIdx++] = npts * 2;
        for (let i = 0; i < npts; ++i) {
          i3 = i * model.numberOfSides;
          newStripsData[outCellIdx++] = offset + i2 + i3;
          newStripsData[outCellIdx++] = offset + i1 + i3;
        }
        outCD.passData(inCD, inCellId, newOutCellId++);
      } // for each side of the tube
    } else {
      for (let k = offset; k < model.numberOfSides + offset; k += model.onRatio) {
        i1 = 2 * (k % model.numberOfSides) + 1;
        i2 = 2 * ((k + 1) % model.numberOfSides);
        // outCellId = newStrips.getNumberOfCells(true);
        newStripsData[outCellIdx] = npts * 2;
        outCellIdx++;
        for (let i = 0; i < npts; ++i) {
          i3 = i * 2 * model.numberOfSides;
          newStripsData[outCellIdx++] = offset + i2 + i3;
          newStripsData[outCellIdx++] = offset + i1 + i3;
        }
        outCD.passData(inCD, inCellId, newOutCellId++);
      } // for each side of the tube
    }

    // Take care of capping. The caps are n-sided polygons that can be easily
    // triangle stripped.
    if (model.capping) {
      let startIdx = offset + npts * model.numberOfSides;
      let idx = 0;
      if (!model.sidesShareVertices) {
        startIdx = offset + 2 * npts * model.numberOfSides;
      }

      // The start cap
      newStripsData[outCellIdx++] = model.numberOfSides;
      newStripsData[outCellIdx++] = startIdx;
      newStripsData[outCellIdx++] = startIdx + 1;
      let k = 0;
      for (i1 = model.numberOfSides - 1, i2 = 2, k = 0; k < model.numberOfSides - 2; ++k) {
        if (k % 2) {
          idx = startIdx + i2;
          newStripsData[outCellIdx++] = idx;
          i2++;
        } else {
          idx = startIdx + i1;
          newStripsData[outCellIdx++] = idx;
          i1--;
        }
      }
      outCD.passData(inCD, inCellId, newOutCellId++);

      // The end cap - reversed order to be consistent with normal
      startIdx += model.numberOfSides;
      newStripsData[outCellIdx++] = model.numberOfSides;
      newStripsData[outCellIdx++] = startIdx;
      newStripsData[outCellIdx++] = startIdx + model.numberOfSides - 1;
      for (i1 = model.numberOfSides - 2, i2 = 1, k = 0; k < model.numberOfSides - 2; ++k) {
        if (k % 2) {
          idx = startIdx + i1;
          newStripsData[outCellIdx++] = idx;
          i1--;
        } else {
          idx = startIdx + i2;
          newStripsData[outCellIdx++] = idx;
          i2++;
        }
      }
      outCD.passData(inCD, inCellId, newOutCellId++);
    }
    return newOutCellId;
  }
  function generateTCoords(offset, npts, pts, inPts, inScalars, newTCoords) {
    let numSides = model.numberOfSides;
    if (!model.sidesShareVertices) {
      numSides = 2 * model.numberOfSides;
    }
    let tc = 0.0;
    let s0 = 0.0;
    let s = 0.0;
    const inScalarsData = inScalars.getData();
    if (model.generateTCoords === GenerateTCoords.TCOORDS_FROM_SCALARS) {
      s0 = inScalarsData[pts[0]];
      for (let i = 0; i < npts; ++i) {
        s = inScalarsData[pts[i]];
        tc = (s - s0) / model.textureLength;
        for (let k = 0; k < numSides; ++k) {
          const tcy = k / (numSides - 1);
          const tcId = 2 * (offset + i * numSides + k);
          newTCoords[tcId] = tc;
          newTCoords[tcId + 1] = tcy;
        }
      }
    } else if (model.generateTCoords === GenerateTCoords.TCOORDS_FROM_LENGTH) {
      let len = 0.0;
      const xPrev = inPts.slice(3 * pts[0], 3 * (pts[0] + 1));
      for (let i = 0; i < npts; ++i) {
        const x = inPts.slice(3 * pts[i], 3 * (pts[i] + 1));
        len += Math.sqrt(distance2BetweenPoints(x, xPrev));
        tc = len / model.textureLength;
        for (let k = 0; k < numSides; ++k) {
          const tcy = k / (numSides - 1);
          const tcId = 2 * (offset + i * numSides + k);
          newTCoords[tcId] = tc;
          newTCoords[tcId + 1] = tcy;
        }
        for (let k = 0; k < 3; ++k) {
          xPrev[k] = x[k];
        }
      }
    } else if (model.generateTCoords === GenerateTCoords.TCOORDS_FROM_NORMALIZED_LENGTH) {
      let len = 0.0;
      let len1 = 0.0;
      let xPrev = inPts.slice(3 * pts[0], 3 * (pts[0] + 1));
      for (let i = 0; i < npts; ++i) {
        const x = inPts.slice(3 * pts[i], 3 * (pts[i] + 1));
        len1 += Math.sqrt(distance2BetweenPoints(x, xPrev));
        for (let k = 0; k < 3; ++k) {
          xPrev[k] = x[k];
        }
      }
      xPrev = inPts.slice(3 * pts[0], 3 * (pts[0] + 1));
      for (let i = 0; i < npts; ++i) {
        const x = inPts.slice(3 * pts[i], 3 * (pts[i] + 1));
        len += Math.sqrt(distance2BetweenPoints(x, xPrev));
        tc = len / len1;
        for (let k = 0; k < numSides; ++k) {
          const tcy = k / (numSides - 1);
          const tcId = 2 * (offset + i * numSides + k);
          newTCoords[tcId] = tc;
          newTCoords[tcId + 1] = tcy;
        }
        for (let k = 0; k < 3; ++k) {
          xPrev[k] = x[k];
        }
      }
    }

    // Capping, set the endpoints as appropriate
    if (model.capping) {
      const startIdx = offset + npts * numSides;

      // start cap
      for (let ik = 0; ik < model.numberOfSides; ++ik) {
        const tcId = 2 * (startIdx + ik);
        newTCoords[tcId] = 0.0;
        newTCoords[tcId + 1] = 0.0;
      }

      // end cap
      for (let ik = 0; ik < model.numberOfSides; ++ik) {
        const tcId = 2 * (startIdx + model.numberOfSides + ik);
        newTCoords[tcId] = 0.0;
        newTCoords[tcId + 1] = 0.0;
      }
    }
  }
  publicAPI.requestData = (inData, outData) => {
    // implement requestData
    // pass through for now
    const output = vtkPolyData.newInstance();
    outData[0] = output;
    const input = inData[0];
    if (!input) {
      vtkErrorMacro('Invalid or missing input');
      return;
    }

    // Allocate output
    const inPts = input.getPoints();
    if (!inPts) {
      return;
    }
    const numPts = inPts.getNumberOfPoints();
    if (numPts < 1) {
      return;
    }
    const inLines = input.getLines();
    if (!inLines) {
      return;
    }
    const numLines = inLines.getNumberOfCells();
    if (numLines < 1) {
      return;
    }
    let numNewPts = 0;
    let numStrips = 0;
    const inLinesData = inLines.getData();
    let npts = inLinesData[0];
    for (let i = 0; i < inLinesData.length; i += npts + 1) {
      npts = inLinesData[i];
      numNewPts = computeOffset(numNewPts, npts);
      numStrips += (2 * npts + 1) * Math.ceil(model.numberOfSides / model.onRatio);
      if (model.capping) {
        numStrips += 2 * (model.numberOfSides + 1);
      }
    }
    let pointType = inPts.getDataType();
    if (model.outputPointsPrecision === DesiredOutputPrecision.SINGLE) {
      pointType = VtkDataTypes.FLOAT;
    } else if (model.outputPointsPrecision === DesiredOutputPrecision.DOUBLE) {
      pointType = VtkDataTypes.DOUBLE;
    }
    const newPts = vtkPoints.newInstance({
      dataType: pointType,
      size: numNewPts * 3,
      numberOfComponents: 3
    });
    const numNormals = 3 * numNewPts;
    const newNormalsData = new Float32Array(numNormals);
    const newNormals = vtkDataArray.newInstance({
      numberOfComponents: 3,
      values: newNormalsData,
      name: 'TubeNormals'
    });
    const newStripsData = new Uint32Array(numStrips);
    const newStrips = vtkCellArray.newInstance({
      values: newStripsData
    });
    let newStripId = 0;
    let inNormals = input.getPointData().getNormals();
    let inNormalsData = null;
    let generateNormals = false;
    if (!inNormals || model.useDefaultNormal) {
      inNormalsData = new Float32Array(3 * numPts);
      inNormals = vtkDataArray.newInstance({
        numberOfComponents: 3,
        values: inNormalsData,
        name: 'Normals'
      });
      if (model.useDefaultNormal) {
        inNormalsData = inNormalsData.map((elem, index) => {
          const i = index % 3;
          return model.defaultNormal[i];
        });
      } else {
        generateNormals = true;
      }
    }

    // loop over pointData arrays and resize based on numNewPts
    const numArrays = input.getPointData().getNumberOfArrays();
    let oldArray = null;
    let newArray = null;
    for (let i = 0; i < numArrays; i++) {
      oldArray = input.getPointData().getArrayByIndex(i);
      newArray = vtkDataArray.newInstance({
        name: oldArray.getName(),
        dataType: oldArray.getDataType(),
        numberOfComponents: oldArray.getNumberOfComponents(),
        size: numNewPts * oldArray.getNumberOfComponents()
      });
      output.getPointData().addArray(newArray); // concat newArray to end
    }

    // loop over cellData arrays and resize based on numNewCells
    let numNewCells = inLines.getNumberOfCells() * model.numberOfSides;
    if (model.capping) {
      numNewCells += 2;
    }
    const numCellArrays = input.getCellData().getNumberOfArrays();
    for (let i = 0; i < numCellArrays; i++) {
      oldArray = input.getCellData().getArrayByIndex(i);
      newArray = vtkDataArray.newInstance({
        name: oldArray.getName(),
        dataType: oldArray.getDataType(),
        numberOfComponents: oldArray.getNumberOfComponents(),
        size: numNewCells * oldArray.getNumberOfComponents()
      });
      output.getCellData().addArray(newArray); // concat newArray to end
    }

    const inScalars = publicAPI.getInputArrayToProcess(0);
    let outScalars = null;
    let range = [];
    if (inScalars) {
      // allocate output scalar array
      // assuming point scalars for now
      outScalars = vtkDataArray.newInstance({
        name: inScalars.getName(),
        dataType: inScalars.getDataType(),
        numberOfComponents: inScalars.getNumberOfComponents(),
        size: numNewPts * inScalars.getNumberOfComponents()
      });
      range = inScalars.getRange();
      if (range[1] - range[0] === 0.0) {
        if (model.varyRadius === VaryRadius.VARY_RADIUS_BY_SCALAR) {
          vtkWarningMacro('Scalar range is zero!');
        }
        range[1] = range[0] + 1.0;
      }
    }
    const inVectors = publicAPI.getInputArrayToProcess(1);
    let maxSpeed = 0;
    if (inVectors) {
      maxSpeed = inVectors.getMaxNorm();
    }
    const outCD = output.getCellData();
    outCD.copyNormalsOff();
    outCD.passData(input.getCellData());
    const outPD = output.getPointData();
    if (outPD.getNormals() !== null) {
      outPD.copyNormalsOff();
    }
    if (inScalars && outScalars) {
      outPD.setScalars(outScalars);
    }

    // TCoords
    let newTCoords = null;
    if (model.generateTCoords === GenerateTCoords.TCOORDS_FROM_SCALARS && inScalars || model.generateTCoords === GenerateTCoords.TCOORDS_FROM_LENGTH || model.generateTCoords === GenerateTCoords.TCOORDS_FROM_NORMALIZED_LENGTH) {
      const newTCoordsData = new Float32Array(2 * numNewPts);
      newTCoords = vtkDataArray.newInstance({
        numberOfComponents: 2,
        values: newTCoordsData,
        name: 'TCoords'
      });
      outPD.copyTCoordsOff();
    }
    outPD.passData(input.getPointData());

    // Create points along each polyline that are connected into numberOfSides
    // triangle strips.
    const theta = 2.0 * Math.PI / model.numberOfSides;
    npts = inLinesData[0];
    let offset = 0;
    let inCellId = input.getVerts().getNumberOfCells();
    for (let i = 0; i < inLinesData.length; i += npts + 1) {
      npts = inLinesData[i];
      const pts = inLinesData.slice(i + 1, i + 1 + npts);
      if (npts > 1) {
        // if not, skip tubing this line
        if (generateNormals) {
          const polyLine = inLinesData.slice(i, i + npts + 1);
          generateSlidingNormals(inPts.getData(), polyLine, inNormals);
        }
      }
      // generate points
      if (generatePoints(offset, npts, pts, inPts.getData(), newPts.getData(), input.getPointData(), outPD, newNormalsData, inScalars, range, inVectors, maxSpeed, inNormalsData, theta)) {
        // generate strips for the polyline
        newStripId = generateStrips(offset, npts, inCellId, newStripId, input.getCellData(), outCD, newStrips);
        // generate texture coordinates for the polyline
        if (newTCoords) {
          generateTCoords(offset, npts, pts, inPts.getData(), inScalars, newTCoords.getData());
        }
      } else {
        // skip tubing this line
        vtkWarningMacro('Could not generate points');
      }
      // lineIdx += npts;
      // Compute the new offset for the next polyline
      offset = computeOffset(offset, npts);
      inCellId++;
    }
    output.setPoints(newPts);
    output.setStrips(newStrips);
    output.setPointData(outPD);
    outPD.setNormals(newNormals);
    outData[0] = output;
  };
}

// ----------------------------------------------------------------------------
// Object factory
// ----------------------------------------------------------------------------

const DEFAULT_VALUES = {
  outputPointsPrecision: DesiredOutputPrecision.DEFAULT,
  radius: 0.5,
  varyRadius: VaryRadius.VARY_RADIUS_OFF,
  numberOfSides: 3,
  radiusFactor: 10,
  defaultNormal: [0, 0, 1],
  useDefaultNormal: false,
  sidesShareVertices: true,
  capping: false,
  onRatio: 1,
  offset: 0,
  generateTCoords: GenerateTCoords.TCOORDS_OFF,
  textureLength: 1.0
};

// ----------------------------------------------------------------------------

function extend(publicAPI, model) {
  let initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  Object.assign(model, DEFAULT_VALUES, initialValues);

  // Build VTK API
  macro.setGet(publicAPI, model, ['outputPointsPrecision', 'radius', 'varyRadius', 'numberOfSides', 'radiusFactor', 'defaultNormal', 'useDefaultNormal', 'sidesShareVertices', 'capping', 'onRatio', 'offset', 'generateTCoords', 'textureLength']);

  // Make this a VTK object
  macro.obj(publicAPI, model);

  // Also make it an algorithm with one input and one output
  macro.algo(publicAPI, model, 1, 1);

  // Object specific methods
  vtkTubeFilter(publicAPI, model);
}

// ----------------------------------------------------------------------------

const newInstance = macro.newInstance(extend, 'vtkTubeFilter');

// ----------------------------------------------------------------------------

var vtkTubeFilter$1 = {
  newInstance,
  extend
};

export { vtkTubeFilter$1 as default, extend, newInstance };
