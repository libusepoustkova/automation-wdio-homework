const {getFieldValueById} = require("./functions");
const {re} = require("@babel/core/lib/vendor/import-meta-resolve");
const {substituteName, contactName, contactPhone, contactEmail, startDate, endDate} = require("../specs/fixtures");

class OrderPage {
    get ico() { return  $('#ico'); }
    get fieldName() { return getFieldValueById('client'); }
    get fieldAddress() { return getFieldValueById('address'); }
    get toast() { return $('.toast-message'); }
    get header() { return $('header').$('h1*=Nová objednávka'); }
    get navbarPrimestskyTabor() { return  $('#nav-home-tab'); }
    get buttonPrimary() { return $('.btn-primary'); }

    get fieldSubstituteName() { return $('#substitute'); }

    get fieldContactName() { return $('#contact_name'); }

    get fieldContactTel () { return $('#contact_tel'); }

    get fieldContactMail () { return $('#contact_mail'); }

    get fieldStartDate () { return $('#start_date_1'); }

    get fieldEndDate () { return $('#end_date_1'); }

    get partCamp () { return $('#camp-date_part'); }
    get fieldCampStudents () { return $('#camp-students'); }
    get fieldCampAge () { return $('#camp-age'); }
    get fieldCampAdults () { return $('#camp-adults'); }

    getToastMessage() { return this.toast.getText(); }

    set_number_ICO(numberICO) {
        this.ico.setValue(numberICO);
        browser.keys('Enter');
        this.toast.waitForExist();
    }

    fill_Order(substituteName, contactName, contactPhone, contactEmail, startDate, endDate, numStudents, age, numAdults) {
        this.fieldSubstituteName.setValue(substituteName);
        this.fieldContactName.setValue(contactName);
        this.fieldContactTel.setValue(contactPhone);
        this.fieldContactMail.setValue(contactEmail);
        this.fieldStartDate.setValue(startDate);
        this.fieldEndDate.setValue(endDate);
        this.fieldCampStudents.setValue(numStudents);
        this.fieldCampAge.setValue(age);
        this.fieldCampAdults.setValue(numAdults);
    }
    open_primestskyTabor() {
        this.navbarPrimestskyTabor.click();
    }

    save_order() {
        this.buttonPrimary.click();
    }
}

module.exports = new OrderPage();
