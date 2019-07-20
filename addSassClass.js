const fs = require('fs');

const args = process.argv.slice(2);

let newClassname = args[0],
    path = null;

switch (newClassname.split('-')[0]) {
  case 'o':
    path = './src/sass/5_objects/';
    console.log('CREATE OBJECT');
    break;
  case 'c':
    path = './src/sass/6_components/';
    console.log('CREATE COMPONENT');
    break;
  default:
}

//If file does not exist and c- or o- in name...
if (!fs.existsSync(path+newClassname+'.scss') && path !== null) {
  //Make new scss file with blank class
  fs.appendFile(`${path}${newClassname}.scss`,
    `.${newClassname}{\r\n\r\n}`,

    function (err) {
      if (err) throw err;
      console.log('Class File Created');
  });

  // Add import to _all.scss file
  fs.appendFile(`${path}_all.scss`, `@import "${newClassname}";`+"\r\n", function (err) {
    if (err) throw err;
    console.log('Added class import to _all');
  });

} else {
  console.log('file exists or class has wrong name');
}
