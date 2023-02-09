const fs = require('fs');

const filePath = './component.js';

fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
}

  const lines = data.split('\n');

  // Object to hold the grouped import statements
  const groupedImports = {};

  lines.forEach((line) => {
    if (line.startsWith('import')) {
      // Extract the package name from the import statement
      const packageName = line.match(/from '(.*)'/)[1];

      // Extract the imported icons from the import statement
      const importedIcons = line.match(/{(.*)}/)[1].split(',').map((icon) => icon.trim());

      // Add the imported icons to the appropriate group
      if (!groupedImports[packageName]) {
        groupedImports[packageName] = importedIcons;
      } else {
        groupedImports[packageName] = [...groupedImports[packageName], ...importedIcons];
      }
    }
  });

  // Build the new import statements
  const newImportStatements = Object.entries(groupedImports).map(([packageName, importedIcons]) =>
    `import { ${importedIcons.join(', ')} } from '${packageName}';`
  );

  // Replace the old import statements with the new ones
  const newData = data.replace(/import.*;/g, () => newImportStatements.shift());

  // Write the new data to the file
  fs.writeFile(filePath, newData, (writeErr) => {
    if (writeErr) {
      console.error(writeErr);
    } else {
      console.log('Import statements grouped and replaced successfully!');
    }
  });
});
