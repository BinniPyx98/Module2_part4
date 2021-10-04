/*
Catch click on button "LogIn" and start function LogIn
 */
let clickOnButtonLogIn: HTMLElement = document.getElementById('SingIn');

if (clickOnButtonLogIn) {
    clickOnButtonLogIn.addEventListener('click', ev => {
        ev.preventDefault();
        (async () => {
            await registration()
        })();
    })
}

async function registration() {
    console.log('registr')
    let validationResult: boolean = null;
    let regexp: RegExp = /^.+@.+\..+$/igm;
    let regexpPass: RegExp = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]).{8,}$/;
    let userPassword: string | void = getElement('userPassword');
    let userEmail: string | void = getElement('userEmail');


    if (userPassword && userEmail) {
        if (regexp.test(userEmail) && regexpPass.test(userPassword)) {
            validationResult = true;
            sendNewUser(userEmail,userPassword)
        } else {
            alert('некорректные данные')
        }
    }
    if (validationResult) {

    }

}

async function sendNewUser(userEmail: string, userPassword: string) {

    let userJsonDate: any = JSON.stringify({
        email: userEmail,
        password: userPassword
    })

    let resolve = await fetch('http://localhost:5400/registration', {
        method: 'POST',
        headers: {
            'Access-Control-Allow-Methods': 'POST',
            "Content-Type": "application/json"
        },
        body: userJsonDate
    })

    return resolve
}


function getElement(tagId: string): string | void {
    let Element: HTMLInputElement = <HTMLInputElement>document.getElementById(tagId);

    return Element ? Element.value : alert("don't find tag");
}