const controlPanel = `<table>
  <tr>
    <td>X Resolution</td>
    <td>
      <input class="xResolution" type="range" min="2" max="100" step="1" value="50"/>
    </td>
  </tr>
  <tr>
    <td>Y Resolution</td>
    <td>
      <input class="yResolution" type="range" min="2" max="100" step="1" value="50"/>
    </td>
  </tr>
  <tr>
    <td>Displacement Scale</td>
    <td>
      <input class="scaleFactor" type="range" min="0" max="2" step="0.1" value="1"/>
    </td>
  </tr>
  <tr>
    <td>Plane Visibility</td>
    <td>
      <input class="visibility"  type="checkbox" checked />
    </td>
  </tr>
  <tr>
    <td>Formula</td>
    <td class='next' style="cursor: pointer; text-align: right;">...</td>
  </tr>
  <tr>
    <td colspan="2">
      <input class="formula" type="text" style="width: 100%;"
        value="((x[0] - 0.5) * (x[0] - 0.5)) + ((x[1] - 0.5) * (x[1] - 0.5)) + 0.125"/>
    </td>
  </tr>
  <tr>
    <td>Scalar range</td>
  </tr>
  <tr>
    <td>
      <input class="min" type="text" style="width: 100%;" value="0"/>
    </td>
    <td>
      <input class="max" type="text" style="width: 100%;" value="1"/>
    </td>
  </tr>
</table>`

export default controlPanel
