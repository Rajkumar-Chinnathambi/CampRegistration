// JavaScript source code
const allinputs = document.getElementsByTagName('input');
const fname = document.getElementById('fname');
const gender = document.querySelectorAll('input[name="gender"]');
const submitForm = document.getElementById('submitForm');
const alertBoxContainer = document.getElementById('alertBox-container');
const registrationForm = document.getElementById('registrationForm');

let fnameStatus = false;
let lnameStatus = false;

// Initialize Month , Day and Year select field

let initailizeDate = () => {
    const month = document.getElementById('month');
    const day = document.getElementById('day');
    const year = document.getElementById('year');
    const allMonth = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "SEP", "NOV", "DEC"];

    for (let m of allMonth) {
        let option = document.createElement('option');
        option.innerHTML = m;
        month.append(option);
    }
    for (let y = 2024; y >= 2000; y--) {
        let option = document.createElement('option');
        option.innerHTML = y;
        year.append(option);
    }

    month.addEventListener('change', () => {
        day.innerHTML = `<option>Choose Day</option>`;        
        
    })

    day.addEventListener('click', () => {
        
        let totalDays = 31;
        if (month.value == "Choose Month") {
            alert("Please select Month");
        }
        else {
            let monthPos = allMonth.indexOf(month.value);
            if (monthPos == 1) {
                totalDays = 29;
            }
            else if (monthPos % 2 != 0 && monthPos != 5) {
                totalDays = 30;
            }
            else {
                totalDays;
            }
            for (let d = 1; d <= totalDays; d++) {
                let option = document.createElement('option');
                option.innerHTML = d;
                day.append(option);
            }
        }
    })
}

// check inputs fill or not

let isInputFill = () => {
    for (let i of allinputs) {
        if (i.id == "zip") {
            i.addEventListener("focusout", () => {
                if (i.value.length != 6) {
                    document.querySelector(`#zip-msg`).innerText = "Zip can't less than or greater than 6 digit";
                    i.style.borderColor = 'red';
                }
                else {
                    i.style.borderColor = 'green';
                }
            })
        }
        else if (i.id == 'fname' || i.id == 'lname') {
            i.addEventListener('focusout', () => {
                i.id == 'fname' ? fnameStatus = fnameLnameValidation(i, i.id) : lnameStatus = fnameLnameValidation(i, i.id);
                
            })
        }
        else {

            i.addEventListener('focusout', () => {

                if (i.value.trim() == '') {
                    i.style.borderColor = 'red';
                    i.setAttribute('placeholder', 'Please Fill the field')
                }
                else if (i.value != '') {
                    i.style.borderColor = 'green';
                }
                else {
                    i.style.borderColor = 'black';
                }
            })
        }
    }
}

// fname and lname validation

function fnameLnameValidation(ifield, fieldname) {
    let FnameLnameStatus = false;
    let Value = ifield.value;
    let displayFieldName = fieldname == "fname" ? "First Name" : "Last Name";
    if (Value!= '') {
        if (Value.startsWith(" ") != true) {
            if (Value.match(/[0-9]/) == null) {
                ifield.style.borderColor = 'green';
                fnameLnameErrorDisplay(`${fieldname}-msg`, `${displayFieldName}`, 'black');
                FnameLnameStatus = true;
            }
            else {
                ifield.style.borderColor = 'red';
                fnameLnameErrorDisplay(`${fieldname}-msg`, `${displayFieldName} cannot include number`,'red')
            }
        }
        else {
            ifield.style.borderColor = 'red';
            fnameLnameErrorDisplay(`${fieldname}-msg`, `${displayFieldName} cannot starts with space`,'red')
        }
        
    }
    else {
        ifield.style.borderColor = 'red';
        fnameLnameErrorDisplay(`${fieldname}-msg`, `${displayFieldName} doesn't empty`,'red');        
    }
    return FnameLnameStatus;
}
// display firtname and lname error msg 

function fnameLnameErrorDisplay(msgfieldname,msg,color) {
    let msgInput = document.getElementById(msgfieldname);
    msgInput.innerText = msg;
    msgInput.style.color = color;
}


// check date wheather select or not
function isDateSelected() {
    if (month.value != 'Choose Month' && day.value != 'Choose Day' && year.value != 'Choose Year') {
        return true;
    }
    else {
        return false;
    }
}


// check gender select or not
let isGenderChecked = () => {
    let GenderValue = false;
    for (let g of gender) {
        if (g.checked) {
            GenderValue = g.value;
        }

    }
    if(!GenderValue){
        document.getElementById('gender-msg').innerHTML = "Please Select the gender";
    }
    else{
        document.getElementById('gender-msg').innerHTML = "";
    }
    return GenderValue;

}

// check all input empty or not
let isAllInputFilled = () => {
    let inputFilled = true;
    for (let i of allinputs) {
        if (i.value.trim() == '') {
            inputFilled = false;
            i.style.borderColor = 'red';
            i.setAttribute('placeholder', 'Please Fill the field');
        }
    }
    return inputFilled
}

//  Form submission
submitForm.addEventListener('click', formSubmition);


function formSubmition(event) {
    event.preventDefault();
    if (isAllInputFilled() && fnameStatus && lnameStatus) {
        if (isGenderChecked()) {
            if (isDateSelected()) {
                alertBox('Form Submitted Successfully', 's');
                registrationForm.reset();
            }
            else {
                alertBox("Please Select Date..", 'w')
            }
        }
        else {
            alertBox("Please Select Gender..", 'w');
            isGenderChecked();
        }

    }
    else {
        alertBox("Please Select All the Fields..", 'w');

    }
}

// Alert Box function to all mode ( error, success , warning )
function alertBox(msg, type) {
    alertBoxContainer.style.display = 'flex';
    let msgContent = document.getElementById('msg-content');
    let msgLogo = document.getElementById('msgLogo');
    
    switch (type) {
        case 's':
            msgContent.innerText = msg;
            msgLogo.src = "https://static.vecteezy.com/system/resources/thumbnails/048/721/459/small_2x/a-green-check-mark-the-check-mark-is-a-symbol-of-approval-or-satisfaction-png.png";
            break;
        case 'w':
            msgContent.innerText = msg;
            msgLogo.src = "https://static.vecteezy.com/system/resources/thumbnails/012/042/301/small/warning-sign-icon-transparent-background-free-png.png";
            break;
        default:
            console.log('mention correct type');
    }
    document.getElementById('msgCancel-icon').addEventListener('click', () => {
        alertBoxContainer.style.display = 'none'
        msgLogo.src = '';
    });
}

// Add Eventlistner to all inputFields and initial Date
function initializeAllFunction() {
    isInputFill();
    initailizeDate();
}
initializeAllFunction()

// input value and lenghth checking.....
function inputValueAndLengthValidation(field, minlen, maxlen, pattern = null) {
    let value = field.value.trim();
    if (value != '' && value.length >= minlen && value.length <= maxlen) {
        return true;
    }
    else {
        return false;
    }
}

