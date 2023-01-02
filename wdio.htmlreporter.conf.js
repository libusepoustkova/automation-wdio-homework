import {ReportAggregator} from 'wdio-html-nice-reporter';
const reportsDirectory = './reports/html-reports/';

exports.config = {
    specs: [
        './specs/**/*.js'
    ],
    exclude: [
        './specs/examples/**/*.js'
    ],
    maxInstances: 10,
    capabilities: [{
        maxInstances: 5,
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:chromeOptions': {
            args: [
                '--window-size=1920,1080',
                '--headless',
                '--no-sandbox',
                '--disable-gpu',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-infobars'
            ]
        },
        "moz:firefoxOptions": {
            args: [
                '-headless'
            ]
        }
    }],
    logLevel: 'error', // trace | debug | info | warn | error | silent
    bail: 0,
    baseUrl: 'https://team8-2022brno.herokuapp.com',
    waitforTimeout: 10000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: [
        'selenium-standalone'
    ],
    framework: 'mocha',
    reporters: [
        'spec',
        ["html-nice", {
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Automatizované Testování',
            linkScreenshots: true,
            //to show the report in a browser when done
            showInBrowser: true,
            collapseTests: false,
            //to turn on screenshots after every test
            useOnAfterCommandForScreenshot: true
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 60000
    },
    onPrepare: (config, capabilities) => {
        let reportAggregator = new ReportAggregator({
            outputDir: reportsDirectory,
            filename: 'report.html',
            reportTitle: 'Czechitas Test Automation',
            browserName : capabilities.browserName,
            collapseTests: true,
        });
        reportAggregator.clean() ;
        global.reportAggregator = reportAggregator;
    },
    onComplete: async (exitCode, config, capabilities, results) => {
        await reportAggregator.createReport();
    },
    afterTest: async (test, context, { error, result, duration, passed, retries }) => {
        const screenshotName = (`./.tmp/${test.parent}__${test.title}.png`).replace(/ /g, '_');
        await browser.saveScreenshot(screenshotName);
    }
}
