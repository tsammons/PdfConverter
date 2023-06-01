def str2bool(v):
  return v.lower() in ("yes", "true", "t", "1")

try:
    import sys
    import pdftotext
    import base64
    import io
    import fileinput
    import json

    input = "".join(fileinput.input(encoding="utf-8"))
    inputJson = json.loads(input)

    formattedFile = str2bool(inputJson['formatted'])
    decodedPdf = base64.b64decode(inputJson['encodedFile'])
    fileObject = io.BytesIO(decodedPdf)
    pdfText = pdftotext.PDF(fileObject, physical=formattedFile)

    print("".join(pdfText))
    sys.stdout.flush()
    
except Exception as e: print(e)





