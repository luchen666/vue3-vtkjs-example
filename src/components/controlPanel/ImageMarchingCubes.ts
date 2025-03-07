const controlPanel = `<table>
  <tr>
    <td>Volume resolution</td>
    <td>
      <input class='volumeResolution' type="range" min="10" max="100" step="1" value="50" />
    </td>
  </tr>
  <tr>
    <td>Radius</td>
    <td>
      <input class='sphereRadius' type="range" min="0.01" max="1.0" step="0.01" value="0.025" />
    </td>
  </tr>
  <tr>
    <td>Iso value</td>
    <td>
      <input class='isoValue' type="range" min="0.0" max="1.0" step="0.05" value="0.0" />
    </td>
  </tr>
  <tr>
    <td>Compute Normals</td>
    <td>
      <input class='computeNormals' type="checkbox" unchecked />
    </td>
  </tr>
  <tr>
    <td>Merge Points</td>
    <td>
      <input class='mergePoints' type="checkbox" unchecked />
    </td>
  </tr>
</table>`

export default controlPanel
