console.log("Hey! I'm index.js");

function downloadCanvasAsPNG(canvas, filename) {

    // Get the canvas data
    const dataURL = canvas.toDataURL("image/png");

    // Create a temporary anchor element for download
    const link = document.createElement("a");
    link.href = dataURL;

    // Set a descriptive filename
    link.download = filename || "Qr Code.png";

    // Simulate a click to trigger download
    link.click();

};

function invertColor(hexValue) {
    let hex = hexValue.replace(/^#/, '');
    if (hex.length === 3) hex = hex.replace(/./g, '$&$&'); // Expand
    if (hex.length !== 6) throw new Error(`Invalid HEX color: ${hexValue}`);
    return `#${(0xFFFFFF ^ parseInt(hex, 16)).toString(16).padStart(6, '0')}`;
};

function changeColor(clr) {

    document.getElementById("clr").style.backgroundColor = clr;
    document.getElementById("clr").style.color = invertColor(clr);
    document.getElementById("clr").style.borderColor = invertColor(clr);

    let qrCodeDiv = document.getElementById("qrcode");

    let link = qrCodeDiv.title;

    qrCodeDiv.innerHTML = '';

    var qrcode = new QRCode(qrCodeDiv, {
        text: link,
        width: 1080,
        height: 1080,
        colorDark: clr,
        colorLight: "#ffffff00",
        correctLevel: QRCode.CorrectLevel.H
    });

}

document.getElementById("btn").addEventListener("click", ev => {

    let link = document.getElementById("link").value.trim();

    let err = document.getElementById("err");

    if (!link == "") {
        err.innerText = "";
        document.getElementById("box").innerHTML = `<div id="qrcode"></div>
                                                    <input type="color" id="clrPick" oninput="changeColor(this.value)" value="#000000" style="display: none;">
                                                    <label id="clr" for="clrPick">Change Color</label>`;

        var qrcode = new QRCode(document.getElementById("qrcode"), {
            text: link,
            width: 1080,
            height: 1080,
            colorDark: "#000000",
            colorLight: "#ffffff00",
            correctLevel: QRCode.CorrectLevel.H
        });

        let newSpan = document.createElement("span");
        newSpan.id = "download";
        newSpan.innerText = "Download";

        newSpan.onclick = function (e) {
            let canvas = e.srcElement.parentElement.firstElementChild.firstElementChild
            downloadCanvasAsPNG(canvas, 'QR Code.png')
        };

        document.getElementById("box").append(newSpan);

    } else {
        err.innerText = "Please Insert the Text or URL."
    }

});