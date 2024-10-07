// Base64 decode function
this.decode = function (input) {
    if (!input) return input;
    var output = [];
    var chr1, chr2, chr3 = "";
    var enc1, enc2, enc3, enc4 = "";
    var i = 0;
    var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var base64test = /[^A-Za-z0-9\+\/\=]/g;
    if (base64test.exec(input)) {
        return null; // Indicate invalid input
    }
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    do {
        enc1 = keyStr.indexOf(input.charAt(i++));
        enc2 = keyStr.indexOf(input.charAt(i++));
        enc3 = keyStr.indexOf(input.charAt(i++));
        enc4 = keyStr.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output.push(String.fromCharCode(chr1));
        if (enc3 != 64) {
            output.push(String.fromCharCode(chr2));
        }
        if (enc4 != 64) {
            output.push(String.fromCharCode(chr3));
        }
        chr1 = chr2 = chr3 = "";
        enc1 = enc2 = enc3 = enc4 = "";
    } while (i < input.length);
    return output.join("");
};

// Function to convert OOXML to PDF
function convertToPDF(ooXMLData) {
    const doc = new PDFDocument();
    const stream = doc.pipe(blobStream());
    
    // Assuming the OOXML data contains some text for demonstration
    // In a real implementation, you would parse the OOXML content accordingly
    doc.fontSize(12).text(ooXMLData);

    doc.end();
    stream.on('finish', function() {
        const blob = stream.toBlob('application/pdf');
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'document.pdf';
        a.click();
        URL.revokeObjectURL(url);
    });
}

// Event listener for the button
document.getElementById('convertBtn').addEventListener('click', function() {
    const inputData = document.getElementById('inputData').value;
    const decodedData = this.decode(inputData);
    
    if (decodedData) {
        convertToPDF(decodedData);
    } else {
        alert('Invalid base64-encoded input!');
    }
}.bind(this));