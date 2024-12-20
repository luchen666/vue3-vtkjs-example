const controlPanel = `<table>
  <tr>
    <td>TipResolution</td>
    <td colspan="3">
      <input class='tipResolution' type="range" min="4" max="100" step="1" value="6" />
    </td>
  </tr>
  <tr>
    <td>TipRadius</td>
    <td colspan="3">
      <input class='tipRadius' type="range" min="0.01" max="1.0" step="0.01" value="0.1" />
    </td>
  </tr>
  <tr>
    <td>TipLength</td>
    <td colspan="3">
      <input class='tipLength' type="range" min="0.1" max="0.5" step="0.05" value="0.35" />
    </td>
  </tr>
  <tr>
    <td>ShaftResolution</td>
    <td colspan="3">
      <input class='shaftResolution' type="range" min="4" max="100" step="1" value="6" />
    </td>
  </tr>
  <tr>
    <td>ShaftRadius</td>
    <td colspan="3">
      <input class='shaftRadius' type="range" min="0.01" max="1.0" step="0.01" value="0.03" />
    </td>
  </tr>
  <tr>
    <td>Invert</td>
    <td colspan="3">
      <input class='invert' type="checkbox" />
    </td>
  </tr>
  <tr style="text-align: center;">
    <td></td>
    <td>X</td>
    <td>Y</td>
    <td>Z</td>
  </tr>
  <tr>
    <td>Direction</td>
    <td>
      <input style="width: 50px" class='direction' data-index="0" type="range" min="-1" max="1" step="0.1" value="1" />
    </td>
    <td>
      <input style="width: 50px" class='direction' data-index="1" type="range" min="-1" max="1" step="0.1" value="0" />
    </td>
    <td>
      <input style="width: 50px" class='direction' data-index="2" type="range" min="-1" max="1" step="0.1" value="0" />
    </td>
  </tr>
  <tr>
    <td>
      <input class='reset' type="button" value="Reset" />
    </td>
    <td></td>
    <td></td>
    <td></td>
  </tr>
</table>`

export default controlPanel
