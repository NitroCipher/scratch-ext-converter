export const convert = url => {
  return new Promise((resolve, reject) => {
    fetch(url).then(response => response.text()).then(data => { // Fetch the URL and get the text content
      let name, descriptor, ext, id;
      const ScratchExtensions = { // Get the properties of the extension
        register: (_name, _descriptor, _ext) => {
          name = _name;
          descriptor = _descriptor;
          ext = _ext;
          id = _name.replace(' ', '')
        }
      }
      eval(data); // Run the extension code
      let info = {
        id, // Set the id to the extension's name without spaces
        name, // Set the display name
        blocks: descriptor.blocks.map((block, index) => { // convert the block to the new format
          return {
            opcode: block[2],
            blockType: getBlockType(block[0]), // Get the block type
            text: block[1] // TODO: Change the inputs to the new format
          }
        })
      };
      /* Create a String with the code for the Scratch 3 extension */
      let result = `class ${id} {
        getInfo() {
          return ${JSON.stringify(info)};
        }
      }
      Scratch.extensions.register(new ${id}());`; // TODO: Add functions
      resolve(result);
    });
  });
}

function getBlockType (oldType) {
  switch (oldType) {
    case ' ': return 'command';
    case 'w': return 'command';
    case 'r': return 'reporter';
    case 'R': return 'reporter';
    case 'b': return 'boolean';
    case 'h': return 'hat';
  }
}