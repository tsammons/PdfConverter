const express = require('express');
const {spawn} = require('child_process');
const cors = require('cors')

var app = module.exports = express()
app.use(cors())
app.use(express.static('public'))

let formidable = require('formidable');
let fs = require('fs');

var $ = null;

app.get('/pdftotext', async function(req, res){
    res.send(doc.documentElement.outerHTML);
});

app.post('/getFile', async (req, res) => {
  //Create an instance of the form object
  let form = new formidable.IncomingForm();

  //Process the file upload in Node
  form.parse(req, async function (error, fields, file) {
    let filepath = file.fileupload.filepath;
    let isFormatted = fields.formatted;

    const contents = fs.readFileSync(filepath, {encoding: 'base64'});
    var result = await convertFile(contents, isFormatted);

    res.send({body: result});
  });
});

async function convertFile(fileInput, formatted) {
  const spawn = require("child_process").spawn;
  const pythonProcess = spawn('python3',["./python/pdfconverter.py"]);

  var inputParams = {
    "encodedFile": fileInput, 
    "formatted": formatted
  };

  pythonProcess.stdin.write(JSON.stringify(inputParams));
  pythonProcess.stdin.end();

  return new Promise((resolve, reject) => {
    var result = "";
    pythonProcess.stdout.on('data', (data) => {
      result += data.toString();
     });

     pythonProcess.stdout.on('end', function() {
      resolve(result);
     });
  });
}

/* istanbul ignore next */
if (!module.parent) {
  app.listen(3000);
  console.log('Express started on port 3000');
}
