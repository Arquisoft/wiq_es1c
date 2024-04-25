async function textVerifyByXpath(page, xpath, expectedText) {
    const element = await page.waitForXPath(xpath, { visible: true });
    const text = await page.evaluate(e => e.innerText, element);
    expect(text).toBe(expectedText);
}

module.exports = {
    textVerifyByXpath
};