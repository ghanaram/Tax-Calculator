function validateAndCalculate() {
    const grossIncome = parseFloat(document.getElementById('grossIncome').value);
    const extraIncome = parseFloat(document.getElementById('extraIncome').value);
    const ageGroup = document.getElementById('ageGroup').value;
    const deductions = parseFloat(document.getElementById('deductions').value);

    // Validate input fields
    let isValid = true;
    if (isNaN(grossIncome) || grossIncome <= 0) {
        isValid = false;
        document.getElementById('grossIncome').nextElementSibling.querySelector('.error-icon').classList.remove('d-none');
    } else {
        document.getElementById('grossIncome').nextElementSibling.querySelector('.error-icon').classList.add('d-none');
    }
    if (isNaN(extraIncome) || extraIncome < 0) {
        isValid = false;
        document.getElementById('extraIncome').nextElementSibling.querySelector('.error-icon').classList.remove('d-none');
    } else {
        document.getElementById('extraIncome').nextElementSibling.querySelector('.error-icon').classList.add('d-none');
    }
    if (ageGroup === '') {
        isValid = false;
        document.getElementById('ageGroup').nextElementSibling.classList.remove('d-none');
    } else {
        document.getElementById('ageGroup').nextElementSibling.classList.add('d-none');
    }
    if (isNaN(deductions) || deductions < 0) {
        isValid = false;
        document.getElementById('deductions').nextElementSibling.querySelector('.error-icon').classList.remove('d-none');
    } else {
        document.getElementById('deductions').nextElementSibling.querySelector('.error-icon').classList.add('d-none');
    }

    // If input is valid, calculate tax
    if (isValid) {
        const totalIncome = grossIncome + extraIncome - deductions;
        const taxRate = calculateTaxRate(totalIncome, ageGroup);
        const taxAmount = totalIncome * taxRate;
        const netIncome = totalIncome - taxAmount;

        // Show modal with results
        const modalBody = document.getElementById('modalBody');
        modalBody.innerHTML = `
            <p>Total Income: $${totalIncome.toFixed(2)}</p>
            <p>Tax Rate: ${taxRate * 100}%</p>
            <p>Tax Amount: $${taxAmount.toFixed(2)}</p>
            <p>Net Income: $${netIncome.toFixed(2)}</p>
        `;
        $('#resultModal').modal('show'); // Show Bootstrap modal
    }
}

function calculateTaxRate(totalIncome, ageGroup) {
    const threshold = 800000; // 8 Lakhs
    const excessIncome = Math.max(0, totalIncome - threshold);

    if (ageGroup === '<40') {
        return excessIncome * 0.3;
    } else if (ageGroup === '>=40 & <60') {
        return excessIncome * 0.4;
    } else {
        return excessIncome * 0.1;
    }
}

$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();
});
