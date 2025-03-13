document.getElementById('generate-chalan').addEventListener('click', function () {
    const bankAccount = document.getElementById('bank-account').value;
    const date = document.getElementById('date').value;
    const studentName = document.getElementById('student-name').value;
    const fatherName = document.getElementById('father-name').value;
    const studentNIC = document.getElementById('student-nic').value;
    const bankAddress = document.getElementById('bank-address').value;
    const applyFor = document.getElementById('apply-for').value;
    const feeCategory = document.getElementById('fee-category').value;
    const feeDescription = document.getElementById('fee-description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const penalty = parseFloat(document.getElementById('penalty').value);
    const totalFee = amount + penalty;

    document.getElementById('total-fee').value = totalFee.toFixed(2);

    const studentNicPattern = /^\d{5}-\d{7}-\d{1}$/;
    const errorMessage = document.getElementById('error-message');

    if (!studentName || !fatherName || !studentNIC || !applyFor || !amount) {
        errorMessage.textContent = "Please fill in all required fields.";
        return;
    }

    if (!studentNicPattern.test(studentNIC)) {
        errorMessage.textContent = "Please enter a valid Student's CNIC in the format: 12345-1234567-1.";
        return;
    }

    errorMessage.textContent = "";

    const newWindow = window.open('', '_blank');
    newWindow.document.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
         <link rel="icon" type="image/jpeg" href="njv logo.jpeg">
            <title>NJV Fee Voucher</title>
            <link rel="stylesheet" href="styles.css">
            <style>
                .chalan-container {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 0px;
                }
                .chalan-section {
                    border: 1px solid #000;
                    padding: 10px;
                }
                .header-print {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }
                .logo-print {
                    width: 50px; 
                }
                .section-title {
                    text-align: center;
                    margin-top: 10px;
                }
                hr {
                    margin: 10px 0;
                }
                .chalan-content {
                    display: grid;
                    grid-template-rows: repeat(11, auto);
                    row-gap: 5px;
                }
                .chalan-content div {
                    display: flex;
                    justify-content: space-between;
                }
                .print-btn-container {
                    text-align: left;
                    margin-top: 20px; 
                    position: absolute;
                    left: 20px;
                    bottom: 0;
                }
                
                .print-btn {
                    padding: 10px 20px;
                    color: #fff;
                    background-color: blue;
                    border: none;
                    cursor: pointer;
                }
            </style>
        </head>
        <body>
            <div class="chalan-container">
                ${['Bank Copy', 'Admin Copy', 'Student Copy'].map(copyType => `
                    <div class="chalan-section">
                        <div class="header-print">
                            <img src="njv logo.jpeg" alt="NJV Logo" class="logo-print">
                            <span><h4>BANK CHALAN NJV HIGHER SECONDARY SCHOOL KARACHI</h4></span> 
							<img src="hbl_logo.jpg" alt="HBL Logo" class="logo-print">
                        </div>
                        <hr>
                        <div class="chalan-content">
                        <div><span>Bank Account Number:</span><span>${bankAccount}</span></div>
                            <hr>
                            <div><span>Date:</span><span>${date}</span></div>
                            <hr>
                            <div><span>Student's Name:</span><span>${studentName}</span></div>
                            <hr>
                            <div><span>Father's Name:</span><span>${fatherName}</span></div>
                            <hr>
                            <div><span>Student's NIC:</span><span>${studentNIC}</span></div>
                            <hr>
                            <div><span>Bank Address:</span><span>${bankAddress}</span></div>
                            <hr>
                            <div><span>Apply For:</span><span>${applyFor}</span></div>
                            <hr>
                            <div><span>Fee Category:</span><span>${feeCategory}</span></div>
                            <hr>
                            <div><span>Fee Description:</span><span>${feeDescription}</span></div>
                            <hr>
                            <div><span>Amount:</span><span>${amount.toFixed(2)}</span></div>
                            <hr>
                            <div><span>Penalty:</span><span>${penalty.toFixed(2)}</span></div>
                            <hr>
                            <div><span>Total Fee:</span><span>${totalFee.toFixed(2)}</span></div>
                            <hr>
                        </div>
                        <div class="section-title">${copyType}</div>
                    </div>
                `).join('')}
            </div>
            <div class="print-btn-container">
                <button class="print-btn" onclick="window.print()">Print</button>
            </div>
        </body>
        </html>
    `);
});