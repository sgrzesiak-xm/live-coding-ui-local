from playwright.sync_api import sync_playwright


def test_careers():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=False)
        context = browser.new_context()
        page = context.new_page()

        # Navigate to the careers
        page.goto("http://127.0.0.1:8000/careers", wait_until="domcontentloaded")

        # Click "Accept All" cookies btn
        page.get_by_text("Accept All").click()

        # Close browser
        browser.close()
