var teldivamount = 1
var emaildivamount = 1

function addTelForm() {
    if ('content' in document.createElement('template')) {
        teldivamount++;

        var divtel = document.getElementById("tel")
        var template = document.getElementById('appendTelTemplate')

        var clone = template.content.cloneNode(true)
        var clonetellabel = clone.querySelectorAll("label")
        clonetellabel[1].textContent = '電話番号 #' + teldivamount
        var clonetelselect = clone.querySelector("select")
        clonetelselect.id = 'telselect' + teldivamount
        var clonetelinput = clone.querySelector("input")
        clonetelinput.id = 'tel' + teldivamount

        divtel.appendChild(clone)
    }
}

function addemailForm() {
    if ('content' in document.createElement('template')) {
        emaildivamount = emaildivamount + 1
        
        var divemail = document.getElementById("email")
        var template = document.getElementById('appendemailTemplate')

        var clone = template.content.cloneNode(true)
        var cloneemaillabel = clone.querySelectorAll("label")
        cloneemaillabel[1].textContent = 'メールアドレス #' + emaildivamount
        var cloneemailselect = clone.querySelector("select")
        cloneemailselect.id = 'emailselect' + emaildivamount
        var cloneemailinput = clone.querySelector("input")
        cloneemailinput.id = 'email' + emaildivamount

        divemail.appendChild(clone)
    }
}

function generateVCard() {
    const LastName = document.getElementById("LastName").value;
    const FirstName = document.getElementById("FirstName").value;
    const LastNameKana = document.getElementById("LastNameKana").value;
    const FirstNameKana = document.getElementById("FirstNameKana").value;
    const Organization = document.getElementById("Organization").value;
    const Role = document.getElementById("Role").value;
    const Country = document.getElementById("Country").value;
    const PostalCode = document.getElementById("PostalCode").value;
    const Prefecture = document.getElementById("Prefecture").value;
    const City = document.getElementById("City").value;
    const Address1 = document.getElementById("Address1").value;
    const Address2 = document.getElementById("Address2").value;
    const HomePage = document.getElementById("HomePage").value;

    const telamount = document.getElementById("tel").childElementCount + 1;
    const emailamount = document.getElementById("email").childElementCount + 1;

    const data = [];
    data.push("BEGIN:VCARD");
    data.push("VERSION:3.0");
    data.push("FN:" + LastName + ' ' + FirstName);
    data.push("N:" + LastName + ";" + FirstName + ";");
    data.push("X-PHONETIC-FIRST-NAME:" + FirstNameKana);
    data.push("X-PHONETIC-LAST-NAME:" + LastNameKana);
    for(i=1;i<telamount;i++) {
        telselectvalue = document.getElementById("telselect" + i).value;
        telidvalue = document.getElementById("tel" + i).value;
        data.push("TEL;TYPE=" + telselectvalue + ":" + telidvalue)
    }
    for(i=1;i<emailamount;i++) {
        emailselectvalue = document.getElementById("emailselect" + i).value;
        emailidvalue = document.getElementById("email" + i).value;
        data.push("EMAIL;TYPE=" + emailselectvalue + ":" + emailidvalue)
    }
    data.push("ORG:" + Organization);
    data.push("TITLE:" + Role);
    data.push("ADR;TYPE=HOME:;" + Address2 + ";" + Address1 + ";" + City + ";" + Prefecture + ";" + PostalCode + ";" + Country + ";" + Country + ", " + PostalCode + Prefecture + City + Address1 + Address2);
    data.push("URL:" + HomePage);
    data.push("END:VCARD")

    return data
}

function downloadVCardRAW() {
    var str = ''
    data = generateVCard()
    for (i=0;i<data.length;i++){
        str = str + data[i] + "\n"
    }
    const blob = new Blob([str],{type:"text/x-vcard"});
    let element = document.createElement('a');
    element.href = URL.createObjectURL(blob);
    element.download = 'vcard.vcf';
    element.target = '_blank';
    element.click();
}

const toUtf8 = str =>
    Array.from(new TextEncoder().encode(str)).map(c =>
        String.fromCharCode(c)
    ).join('');

function generateQR() {
    var str = ''
    data = generateVCard()
    for (i=0;i<data.length;i++){
        str = str + data[i] + "\r\n"
    }

    var qr = new QRious({
        element: document.getElementById('canvas_qr'),
        value: toUtf8(str),
    })
    qr.background = '#FFF'; //背景色
    qr.backgroundAlpha = 1.0; // 背景の透過率
    qr.foreground = '#000000'; //QRコード自体の色
    qr.foregroundAlpha = 1.0; //QRコード自体の透過率
    qr.level = 'Q'; // QRコードの誤り訂正レベル
    qr.size = 600; // QRコードのサイズ

    png = qr.toDataURL();
    document.getElementById("qr").src = png;
}
