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
import OrderPage from "../pages/order.page";

describe('Navigace_do_objednavky', () => {
    beforeEach(() => {
        browser.reloadSession();
        browser.url('');
    });
    it('should show form for order', () => {
        const pro_ucitele = $('.dropdown-toggle=Pro učitelé');
        const order_forMSZS = $('.dropdown-item=Objednávka pro MŠ/ZŠ');
        pro_ucitele.click();
        expect(order_forMSZS).toBeDisplayed();
        order_forMSZS.click()
        expect(OrderPage.header).toBeDisplayed();
    });
});


describe('Objednavka_pro_MSZS', () => {
    beforeEach(() => {
        browser.reloadSession();
        browser.url('objednavka/pridat');
    });

    it('should auto fill items when set valid ICO ', () => {
        OrderPage.set_number_ICO(ICO);
        expect(OrderPage.getToastMessage()).toEqual('Data z ARESu úspěšně načtena');
        expect(OrderPage.fieldName).toEqual(clientName);
        expect(OrderPage.fieldAddress).toEqual(address);
    });

    it('should not auto fill items when set invalid ICO ', () => {
        OrderPage.set_number_ICO('12345');
        expect(OrderPage.getToastMessage()).toEqual('IČO nenalezeno, zkontrolujte jej prosím');
        expect(OrderPage.fieldName).toEqual('');
        expect(OrderPage.fieldAddress).toEqual('');
    });

//Uživatel může odeslat vyplněnou objednávku na příměstský tábor
    it('should create and send order', () => {
        OrderPage.set_number_ICO(ICO);
        //expect(OrderPage.getToastMessage()).toEqual('Data z ARESu úspěšně načtena');
        OrderPage.open_primestskyTabor();
        expect(OrderPage.partCamp).toBeDisplayed();
        const numStudents = 5;
        const age = '12';
        const numAdults = 2;
        OrderPage.fill_Order(substituteName, contactName, contactPhone, contactEmail, startDate, endDate, numStudents, age, numAdults)
        OrderPage.save_order();
        OrderPage.toast.waitForExist();
        expect(OrderPage.getToastMessage()).toEqual('Objednávka byla úspěšně uložena');
        const tableCardBody = $('.card-body');
        expect(tableCardBody).toBeDisplayed();
    });

    //Objednávku nelze odeslat pokud není řádně vyplněna
    it('should not create order with blank items ', () => {
        OrderPage.open_primestskyTabor();
        OrderPage.save_order();
        expect(OrderPage.header).toBeDisplayed();
    });

    // nastaveni nespravneho formatu telefonu
    it('should not create order with invalid phone number ', () => {
        OrderPage.set_number_ICO(ICO);
        OrderPage.open_primestskyTabor();
        expect(OrderPage.partCamp).toBeDisplayed();
        const numStudents = 5;
        const age = '12';
        const numAdults = 2;
        const invalidPhone = '123';
        const invalid_feedback_phone = $('#contact_tel').$('..').$('strong');
        OrderPage.fill_Order(substituteName, contactName, invalidPhone, contactEmail, startDate, endDate, numStudents, age, numAdults)
        OrderPage.save_order();
        OrderPage.toast.waitForExist();
        expect(OrderPage.getToastMessage()).toEqual('Některé pole obsahuje špatně zadanou hodnotu');
        expect(invalid_feedback_phone.getText()).toEqual('Telefon není ve správném formátu');
        expect(OrderPage.header).toBeDisplayed();
    });

    // nastaveni nespravneho formatu telofonu a emailu
    it('should not create order with invalid phone number and address ', () => {
        OrderPage.set_number_ICO(ICO);
        OrderPage.open_primestskyTabor();
        expect(OrderPage.partCamp).toBeDisplayed();
        const numStudents = 5;
        const age = '12';
        const numAdults = 2;
        const invalidPhone = '123';
        const invalidEmail = 'ahoj@gmail'
        const invalid_feedback_phone = $('#contact_tel').$('..').$('strong');
        const invalid_feedback_email = $('#contact_mail').$('..').$('strong');
        OrderPage.fill_Order(substituteName, contactName, invalidPhone, invalidEmail, startDate, endDate, numStudents, age, numAdults)
        OrderPage.save_order();
        OrderPage.toast.waitForExist();
        expect(OrderPage.getToastMessage()).toEqual('Více polí obsahuje špatně zadanou hodnotu');
        expect(invalid_feedback_phone.getText()).toEqual('Telefon není ve správném formátu');
        expect(invalid_feedback_email.getText()).toEqual('Zadaná adresa neexistuje, zkontrolujte překlepy');
        expect(OrderPage.header).toBeDisplayed();
    });
});

