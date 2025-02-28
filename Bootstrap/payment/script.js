// Valige elemendid
const UserCardInfo = document.querySelector(".UserCardInfo");
const CardInfoNumber = document.querySelector(".CardInfoNumber");
const monthBtn = document.querySelector("#dropDownMonthBtn");
const yearBtn = document.querySelector("#dropDownYearBtn");
const monthDropdownItems = document.querySelectorAll('.dropDownMonth li a');
const yearDropdownItems = document.querySelectorAll('.dropDownYear li a');
const NextButton = document.querySelector(".NextButton");

// Kaardi info tähemärkide arv
let NumbersToEnter = 16;
updateCardInfo();

// Uuenda sildi kuvamine, kui palju tähemärke on veel vaja sisestada
CardInfoNumber.addEventListener("input", () => {
    NumbersToEnter = 16 - String(CardInfoNumber.value).length;
    updateCardInfo();
});

// Kuu rippmenüü valiku käsitlemine
monthDropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        monthBtn.textContent = item.textContent;
        validateDropdown(monthBtn, "Palun valige kuu");
    });
});

// Aasta rippmenüü valiku käsitlemine
yearDropdownItems.forEach(item => {
    item.addEventListener('click', () => {
        yearBtn.textContent = item.textContent;
        validateDropdown(yearBtn, "Palun valige aasta");
    });
});

// Kehtivuse kontrollimine ja ümbersuunamine, kui "Jätka" nuppu klõpsatakse
NextButton.addEventListener("click", () => {
    let isError = false;

    // Eemaldame kõik eelnevad veateated enne kontrolli tegemist
    clearErrorMessages();

    // Kontrollige, kas kõik väljad on täidetud
    const fields = [
        { id: 'first-name', name: 'Eesnimi' },
        { id: 'last-name', name: 'Perekonnanimi' },
        { id: 'billing-address', name: 'Aadress' },
        { id: 'city', name: 'Linn' },
        { id: 'zip', name: 'Postiindeks' },
        { id: 'phone', name: 'Telefoninumber' },
        { id: 'card-number', name: 'Kaardi number' },
        { id: 'country', name: 'Riik' }
    ];

    fields.forEach(field => {
        const input = document.getElementById(field.id);

        // Ensure the input element exists
        if (input) {
            if (!input.value.trim()) {
                setErrorState(input, `${field.name} on kohustuslik!`);
                isError = true;
            } else {
                setValidState(input);
            }
        } else {
            // If the element is not found, log an error
            console.error(`Element with ID "${field.id}" not found.`);
        }
    });

    // Kontrollige kaardi numbri täpsustust
    if (NumbersToEnter !== 0) {
        setErrorState(CardInfoNumber, `Kaardi number | Sisestamiseks vajaminevad numbrid: ${NumbersToEnter}`);
        isError = true;
    }

    // Kontrollige, kas kuu ja aasta on valitud
    if (monthBtn.textContent.trim() === "---" || yearBtn.textContent.trim() === "---") {
        if (monthBtn.textContent.trim() === "---") {
            setErrorState(monthBtn, "Palun valige kuu");
            isError = true;
        }
        if (yearBtn.textContent.trim() === "---") {
            setErrorState(yearBtn, "Palun valige aasta");
            isError = true;
        }
    }

    // Kui vigu pole, liikuge järgmisele lehele
    if (!isError) {
        window.location.href = "../Thank User/index.html"; // sihtleht
    }
});


// Aita funktsioon kaardi info sildi värskendamiseks
function updateCardInfo() {
    UserCardInfo.textContent = `Kaardi number | Sisestamiseks vajaminevad numbrid: ${NumbersToEnter}`;
}

// Aita funktsioon veateate staatuse määramiseks
function setErrorState(element, message) {
    element.classList.add("redInputField");
    element.classList.remove("greenInputField");

    // Lisame uue veateate ainult siis, kui eelmist ei ole
    let errorMessage = element.parentElement.querySelector('.error-message');
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.classList.add('error-message');
        element.parentElement.appendChild(errorMessage);
    }
    errorMessage.textContent = message;
}

// Aita funktsioon õigesti täidetud väljade määramiseks
function setValidState(element) {
    element.classList.add("greenInputField");
    element.classList.remove("redInputField");

    // Eemalda veateade, kui see eksisteerib
    const errorMessage = element.parentElement.querySelector('.error-message');
    if (errorMessage) {
        errorMessage.remove();
    }
}

// Aita funktsioon valideerimise käigus, et tagada, et kõik väljad on täidetud
function validateDropdown(element, message) {
    if (!element.textContent || element.textContent.trim() === "---") {
        setErrorState(element, message);
    } else {
        setValidState(element);
    }
}

// Eemaldab kõik veateated vormist
function clearErrorMessages() {
    const errorMessages = document.querySelectorAll('.error-message');
    errorMessages.forEach(errorMessage => {
        errorMessage.remove();
    });

    // Eemaldab kõik negatiivsed (punased) staatuseklassid
    const fieldsWithErrors = document.querySelectorAll('.redInputField');
    fieldsWithErrors.forEach(field => {
        field.classList.remove('redInputField');
    });
}
