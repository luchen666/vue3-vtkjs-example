const controlPanel = `<table>
  <tr>
    <td>Slice I</td>
    <td>
      <input class='sliceI' type="range" min="0" max="2.0" step="1" value="1" />
    </td>
  </tr>
  <tr>
    <td>Slice J</td>
    <td>
      <input class='sliceJ' type="range" min="0" max="2.0" step="1" value="1" />
    </td>
  </tr>
  <tr>
    <td>Slice K</td>
    <td>
      <input class='sliceK' type="range" min="0" max="100" step="1" value="1" />
    </td>
  </tr>
  <tr>
    <td>Color level</td>
    <td>
      <input class='colorLevel' type="range" min="-3926" max="3926" step="1" value="1" />
    </td>
  </tr>
  <tr>
    <td>ColorWindow</td>
    <td>
      <input class='colorWindow' type="range" min="0" max="3926" step="1" value="1" />
    </td>
  </tr>
</table>`

export default controlPanel
