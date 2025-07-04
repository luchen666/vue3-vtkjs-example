const controlPanel = `<div>
  <button id="addLabel">Add label</button>
  <button id="deleteLabel">Delete label</button>
  <div>Text:</div>
  <textarea id="txtIpt" name="name"></textarea>
  <div>Font size</div>
  <input
    title="Font size"
    id="fontSize"
    type="range"
    min="8"
    max="64"
    step="1"
    value="16"
  />
  <div>Color</div>
  <select name="color" class="str" id="color">
    <option value="white">White</option>
    <option value="black">Black</option>
    <option value="red">Red</option>
    <option value="green">Green</option>
    <option value="blue">Blue</option>
  </select>
</div>`

export default controlPanel
