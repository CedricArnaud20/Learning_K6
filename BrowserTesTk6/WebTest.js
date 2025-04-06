import { browser } from 'k6/browser';

export const options = {
    scenarios: {
        ui: {
            executor: 'shared-iterations',
            options: {
                browser: {
                    type: 'chromium',
                },
            },
        },
    },
    thresholds: {
        checks: ['rate==1.0'],
        browser_web_vital_lcp: ['p(90) < 1000'],
        
    },
    ext:{
        loadimpact: {
            projectID: '3724609',
            name: 'K6 Mão na Massa'
        }
    }
};

export default async function () {
    const page = await browser.newPage();

    try {
        await page.goto('https://buger-eats.vercel.app/');
        await page.click('a[href="/deliver"]');

        const header = await page.$('h1')
        const headerText = await header.textContent();

        if (headerText.includes('Cadastre-se para ')) {
            console.log('Texto encontrado: ', headerText);
        } else {
            console.error('Texto não encontrado');
        }    

        } finally {
            await page.close();
        }
    }