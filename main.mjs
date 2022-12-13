import puppeteer from "puppeteer";

const horaire =
  process.argv
    .find((arg) => arg.startsWith("--horaire="))
    ?.replace("--horaire=", "") ?? "18:00";

console.log("Booking padel court at", horaire, "in 7 days");

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const log = async (msg) => console.log(JSON.stringify(msg));

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.exposeFunction("log", log);

  // Login
  await page.goto("https://toulousepadelclub.gestion-sports.com");

  // Get a span with text "Connexion" and click it
  await page.$$eval("span", (spans) => {
    spans.filter((span) => span.innerText === "Connexion")[0].click();
  });

  await page.type("input[type=text][name=email]", "etienner37@gmail.com");
  await page.type("input[type=password][name=pass]", "7c3bK!k6ca4qbYy");
  await page.keyboard.press("Enter");

  // Accueil
  await Promise.all([
    page.waitForNavigation(),
    page.waitForSelector('a[href="reservation.html"]'),
  ]);
  await wait(2000);
  await page.click('a[href="reservation.html"]');

  // Réservation
  await page.waitForSelector("select#sport option"),
  await wait(200);
  // Obligé de select Padel manuellement car page.select ne fonctionne pas
  await page.$eval("select#sport", (select) => {
    const options = Array.from(select.options);
    const option = options.find((option) => option.innerText === "Padel");
    option.selected = true;
    select.value = option.value;
    select.dispatchEvent(new Event("change"));
  });
  await page.waitForSelector("input#date");
  await wait(3000);
  await page.click("input#date");
  const dateIn7Days = new Date();
  dateIn7Days.setDate(dateIn7Days.getDate() + 7);
  if (new Date().getMonth() !== dateIn7Days.getMonth()) {
    // Si le jour de la semaine suivante est dans le mois suivant
    // Sélectionner le mois suivant en cliquant sur le bouton suivant
    await page.click(".ui-datepicker-next");
  }
  // Get an a with text dateIn7Days and click it
  await page.$$eval(
    ".ui-datepicker-calendar a",
    (as, dateIn7Days) => {
      // Allez savoir pourquoi, dateIn7Days arrive en string il faut le reconvertir en date
      dateIn7Days = new Date(dateIn7Days);
      as.filter((a) => a.innerText === dateIn7Days.getDate().toString())[0].click();
    },
    dateIn7Days
  );
  await page.waitForSelector("select#heure");
  await page.waitForSelector('select#heure option[value=" 07:00"]');
  await page.$eval("select#heure", (select) => {
    const options = Array.from(select.options);
    const option = options.find((option) => option.innerText === "07:00");
    option.selected = true;
    select.value = option.value;
    select.dispatchEvent(new Event("change"));
  });
  await page.waitForSelector("div.card-body");
  const courtDivs = await page.$$('div.card-body');
  await wait(400);
  let babolatDiv;
  for (const div of courtDivs) {
    const title = await div.$eval("div.card-title", (div) => div.innerText);
    if (title.includes("court 7 Babolat")) {
      babolatDiv = div;
      break;
    }
  }
  await page.evaluate(el => el.style.cssText += "border: 5px solid red !important;", babolatDiv);
  const horaireButtons = await babolatDiv.$$("button");
  let horaireButton;
  for (const button of horaireButtons) {
    const text = await button.evaluate((button) => button.innerText);
    if (text.includes(horaire)) {
      horaireButton = button;
      break;
    }
  }
  if (!horaireButton) {
    throw new Error("Horaire non trouvé");
  }
  await page.evaluate(el => el.style.cssText += "border: 5px solid hotpink !important;", horaireButton);
  await page.evaluate((button) => button.click(), horaireButton);
  const date = new Date();
  const time =
    date.toISOString().substring(0, 10) +
    "-" +
    date.toLocaleTimeString("fr").replace(/:/g, "-");
  const babolatDivButtons = await babolatDiv.$$('button');
  let reserverButton;
  for (const button of babolatDivButtons) {
    const text = await button.evaluate((button) => button.innerText);
    if (text.includes("Réserver")) {
      reserverButton = button;
      break;
    }
  }
  await page.evaluate(el => el.style.cssText += "border: 5px solid orange !important;", reserverButton);
  await page.$eval('div.appBottomMenu', (div) => div.remove())
  await babolatDiv.screenshot({
    path: `.screenshots/${time}-reservation-horaire.png`,
  });
  await page.evaluate(button => button.click(), reserverButton);
  await page.waitForSelector('div.modal#choix_paiement');
  await wait(500);
  await page.screenshot({ path: `.screenshots/${time}-reservation-paiement.png` });
  await browser.close();
})().catch((err) => console.error(err));
