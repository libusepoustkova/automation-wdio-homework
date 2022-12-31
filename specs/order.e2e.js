import {
    ICO,
    clientName,
    address,
    substituteName,
    contactName,
    contactPhone,
    contactEmail,
    startDate,
    endDate
} from './fixtures.js'
import {getFieldValueById} from "../pages/functions";

describe ('Navigace_do_objednavky', () => {
    beforeEach(() => {
        browser.reloadSession();
        browser.url('');
    });
    it('should show form for order', () => {
        const pro_ucitele = $('.dropdown-toggle=Pro učitelé');
        // console.log(pro_ucitele.getText(), pro_ucitele.getTagName());
        const order_forMSZS = $('.dropdown-item=Objednávka pro MŠ/ZŠ');
        pro_ucitele.click();
        expect(order_forMSZS).toBeDisplayed();
        order_forMSZS.click()
        const header = $('header').$('h1*=Nová objednávka')
        expect(header).toBeDisplayed();
    });
});


describe('Objednavka_pro_MSZS', () => {
    beforeEach(() => {
        browser.reloadSession();
        browser.url('objednavka/pridat');
    });

     it('should auto fill items when set valid ICO ', () => {

        const ico = $('#ico');
        ico.setValue(ICO);
        const client = $('#client');
        browser.keys('Enter');
        // browser.pause(5000);
        const toastMessage = $('.toast-message');
        toastMessage.waitForExist();
        expect(toastMessage.getText()).toEqual('Data z ARESu úspěšně načtena');
        const fieldName = getFieldValueById('client');
        const fieldAddress = getFieldValueById('address');
        // console.log(fieldName, fieldAddress)
        expect(fieldName).toEqual(clientName);
        expect(fieldAddress).toEqual(address);
        browser.saveScreenshot('vyplneno.png');

    });
    it('should not auto fill items when set invalid ICO ', () => {
        const ico = $('#ico');
        ico.setValue('12345');
        browser.keys('Enter');
        const toastMessage = $('.toast-message');
        toastMessage.waitForExist();
        expect(toastMessage.getText()).toEqual('IČO nenalezeno, zkontrolujte jej prosím');
        const fieldName = getFieldValueById('client');
        const fieldAddress = getFieldValueById('address');
        expect(fieldName).toEqual('');
        expect(fieldAddress).toEqual('');
        browser.saveScreenshot('vyplneno2.png');


    });
//Uživatel může odeslat vyplněnou objednávku na příměstský tábor
    it('should create order', () => {
        browser.url('objednavka/pridat');
        const ico = $('#ico');
        ico.setValue(ICO);
        const client = $('#client');
        browser.keys('Enter');
        const toastMessage = $('.toast-message');
        toastMessage.waitForExist();
        expect(toastMessage.getText()).toEqual('Data z ARESu úspěšně načtena');

        const fieldName = getFieldValueById('client');
        const fieldAddress = getFieldValueById('address');

        console.log(fieldName, fieldAddress)
        expect(fieldName).toEqual(clientName);
        expect(fieldAddress).toEqual(address);

        const fieldSubstituteName = $('#substitute');
        const fieldContactName = $('#contact_name');
        const fieldContactTel = $('#contact_tel');
        const fieldContactMail = $('#contact_mail');
        const fieldStartDate = $('#start_date_1');
        const fieldEndDate = $('#end_date_1');
        const navbarPrimestskyTabor = $('#nav-home-tab');
        navbarPrimestskyTabor.click();
        const partCamp = $('#camp-date_part');
        expect(partCamp).toBeDisplayed();
        const fieldCampStudents = $('#camp-students');
        const fieldCampAge = $('#camp-age');
        const fieldCampAdults = $('#camp-adults');
        const buttonPrimary = $('.btn-primary');
        fieldSubstituteName.setValue(substituteName);
        fieldContactName.setValue(contactName);
        fieldContactTel.setValue(contactPhone);
        fieldContactMail.setValue(contactEmail);
        fieldStartDate.setValue(startDate);
        fieldEndDate.setValue(endDate);
        fieldCampStudents.setValue('5');
        fieldCampAge.setValue('12-13');
        fieldCampAdults.setValue('3');
        browser.saveScreenshot('vyplneno3.png');
        buttonPrimary.click();
        toastMessage.waitForExist();
        expect(toastMessage.getText()).toEqual('Objednávka byla úspěšně uložena');
        const tableCardBody = $('.card-body');
        expect(tableCardBody).toBeDisplayed();
    });

    //Objednávku nelze odeslat pokud není řádně vyplněna
     it('should not create order with blank items ', () => {
        browser.url('objednavka/pridat');
        const header = $('header').$('h1*=Nová objednávka')
        expect(header).toBeDisplayed();
        const navbarPrimestskyTabor = $('#nav-home-tab');
        const ico = $('#ico');
        navbarPrimestskyTabor.click();
        const buttonPrimary = $('.btn-primary');
        buttonPrimary.click();
        //const error = ico.fieldError.getText()
        //const fieldError = $('.invalid-feedback');
        //expect(fieldError.getText()).toEqual('Vyplňte prosím toto pole.')

        expect(header).toBeDisplayed();

    });
     // Zadaná adresa neexistuje, zkontrolujte překlepy
     it('should not create order with invalid addresse ', () => {
        browser.url('objednavka/pridat');
        const header = $('header').$('h1*=Nová objednávka');
        const ico = $('#ico');
        ico.setValue(ICO);
        const client = $('#client');
        browser.keys('Enter');
        const toastMessage = $('.toast-message');
        toastMessage.waitForExist();
        expect(toastMessage.getText()).toEqual('Data z ARESu úspěšně načtena');
        //
        const fieldName = getFieldValueById('client');
        const fieldAddress = getFieldValueById('address');
        expect(fieldName).toEqual(clientName);
        expect(fieldAddress).toEqual(address);
        //
        const fieldSubstituteName = $('#substitute');
        const fieldContactName = $('#contact_name');
        const fieldContactTel = $('#contact_tel');
        const fieldContactMail = $('#contact_mail');
        const fieldStartDate = $('#start_date_1');
        const fieldEndDate = $('#end_date_1');
        const navbarPrimestskyTabor = $('#nav-home-tab');
        navbarPrimestskyTabor.click();
        const partCamp = $('#camp-date_part');
        // expect(partCamp).toBeDisplayed();
        const fieldCampStudents = $('#camp-students');
        const fieldCampAge = $('#camp-age');
        const fieldCampAdults = $('#camp-adults');

        fieldSubstituteName.setValue(substituteName);
        fieldContactName.setValue(contactName);
        // nastaveni nespravneho formatu telefonu
        fieldContactTel.setValue('123');
        // nastaveni nespravneho formatu telefonu
        fieldContactMail.setValue('ghj@g');
        fieldStartDate.setValue(startDate);
        fieldEndDate.setValue(endDate);
        fieldCampStudents.setValue('5');
        fieldCampAge.setValue('12-13');
        fieldCampAdults.setValue('3');
        const buttonPrimary = $('.btn-primary');
        buttonPrimary.click();
        expect(header).toBeDisplayed();
        toastMessage.waitForExist();
        //expect(toastMessage.getText()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');
        expect(toastMessage.getText()).toEqual('Více polí obsahuje špatně zadanou hodnotu');
        expect(header).toBeDisplayed();
})

});

