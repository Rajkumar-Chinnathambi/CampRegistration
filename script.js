// JavaScript source code
const allinputs = document.getElementsByTagName('input');
const fname = document.getElementById('fname');
const gender = document.querySelectorAll('input[name="gender"]');
const submitForm = document.getElementById('submitForm');
const alertBoxContainer = document.getElementById('alertBox-container');



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
        i.addEventListener('focusout', () => {
            if (i.value == '') {
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

// check gender select or not
let isGenderChecked = () => {
    let GenderValue = false;
    for (let g of gender) {
        if (g.checked) {
            GenderValue = g.value;
        }

    }
    return GenderValue;

}

// check all input empty or not
let isAllInputFilled = () => {
    let inputFilled = true;
    for (let i of allinputs) {
        if (i.value == '') {
            inputFilled = false;
            i.style.borderColor = 'red';
            i.setAttribute('placeholder', 'Please Fill the field');
        }
    }
    return inputFilled
}

//  Form submission
submitForm.addEventListener('click', () => {
    if (isAllInputFilled() && isGenderChecked()) {
        alertBox('Form Submitted Successfully','s');
    }
    else {
        alertBox("Please Select All the Fields..",'w')
    }
})

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

 