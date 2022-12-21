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

     it('should auto fill items when set ICO ', () => {
        const header = $('header').$('h1*=Nová objednávka')
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
        const client = $('#client');
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

     it('should create order', () => {
        browser.url('objednavka/pridat');
        const header = $('header').$('h1*=Nová objednávka')
        expect(header).toBeDisplayed();
        const ico = $('#ico');
        ico.setValue(ICO);
        const client = $('#client');
        browser.keys('Enter');
        // browser.pause(5000);
        const toastMessage = $('.toast-message');
        toastMessage.waitForExist();
        // na stránce je toast message
        expect(toastMessage.getText()).toEqual('Data z ARESu úspěšně načtena');
        browser.saveScreenshot('vyplneno.png');

        const fieldName = getFieldValueById('client');
        const fieldAddress = getFieldValueById('address');

        console.log(fieldName, fieldAddress)
        expect(fieldName).toEqual(clientName);
        expect(fieldAddress).toEqual(address);
    });
});
