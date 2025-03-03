const controlPanel = `<table>
  <tr>
    <td><b>Origin<b></td>
  </tr>
  <tr>
    <td>X</td>
    <td>
      <form name='originXForm'>
        <input class='originX' id="originXInputId" type="range"
          min="-6" max="6" step="0.01" value="0"
          oninput="originXOutputId.value = originXInputId.value"/>
        <output id="originXOutputId">0</output>
      </form>
    </td>
  </tr>
  <tr>
    <td>Y</td>
    <td>
      <form name='originYForm'>
        <input class='originY' id="originYInputId" type="range"
          min="-0.5" max="0.5" step="0.01" value="0"
          oninput="originYOutputId.value = originYInputId.value"/>
        <output id="originYOutputId">0</output>
      </form>
    </td>
  </tr>
  <tr>
    <td>Z</td>
    <td>
      <form name='originZForm'>
        <input class='originZ' id="originZInputId" type="range"
          min="-0.5" max="0.5" step="0.01" value="0"
          oninput="originZOutputId.value = originZInputId.value"/>
        <output id="originZOutputId">0</output>
      </form>
    </td>
  </tr>
  <tr>
    <td><b>Normal<b></td>
  </tr>
  <tr>
    <td>X</td>
    <td>
      <form name='normalXForm'>
        <input class='normalX' id="normalXInputId" type="range"
          min="-1" max="1" step="0.01" value="1"
          oninput="normalXOutputId.value = normalXInputId.value"/>
        <output id="normalXOutputId">1</output>
      </form>
    </td>
  </tr>
  <tr>
    <td>Y</td>
    <td>
      <form name='normalYForm'>
        <input class='normalY' id="normalYInputId" type="range"
          min="-1" max="1" step="0.01" value="0"
          oninput="normalYOutputId.value = normalYInputId.value"/>
        <output id="normalYOutputId">0</output>
      </form>
    </td>
  </tr>
  <tr>
    <td>Z</td>
    <td>
      <form name='normalZForm'>
        <input class='normalZ' id="normalZInputId" type="range"
          min="-1" max="1" step="0.01" value="0"
          oninput="normalZOutputId.value = normalZInputId.value"/>
        <output id="normalZOutputId">0</output>
      </form>
    </td>
  </tr>
</table>`

export default controlPanel
