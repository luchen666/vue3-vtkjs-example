const controlPanel = `<table>
  <tr>
    <td>X Resolution</td>
    <td>
      <input class='xResolution' type="range" min="1" max="25" step="1" value="10" />
    </td>
  </tr>
  <tr>
    <td>Y Resolution</td>
    <td>
      <input class='yResolution' type="range" min="1" max="25" step="1" value="10" />
    </td>
  </tr>
  <tr>
    <td>Scale Factor</td>
    <td>
      <input class='scaleFactor' type="range" min="0.1" max="5" step="0.1" value="1.0" />
    </td>
  </tr>
  <tr>
    <td>Picking Attribute ID</td>
    <td>
      <div id='attributeID'></div>
    </td>
  </tr>
</table>`

export default controlPanel
