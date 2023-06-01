function dropHandler(ev) {
    console.log("File(s) dropped");
    document.getElementById("textarea").value = "";
  
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  
    if (ev.dataTransfer.items) {
      // Use DataTransferItemList interface to access the file(s)
      [...ev.dataTransfer.items].forEach((item, i) => {

        if (item.kind === "file") {
          const file = item.getAsFile();
          uploadFile(file);
        }
      });
    }
  }

  function dragOverHandler(ev) {
    // Prevent default behavior (Prevent file from being opened)
    ev.preventDefault();
  }

async function uploadFile(file) {
    let formData = new FormData();
    var checked = document.getElementById("isFormatted").checked;

    formData.append("fileupload", file);
    formData.append("formatted", checked);

    var result = await fetch('http://localhost:3000/getFile', {
      method: "POST", 
      body: formData
    });

    var data = await result.json();
    console.log(data.body);
    document.getElementById("textarea").value += data.body;
}