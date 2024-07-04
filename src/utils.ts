import { Link } from "./core/types";
import { chromium } from "playwright";

export async function getLinksFromUrl(url: string) {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(url);

  const links = await page.$$eval("a", (elements) =>
    elements.map((element) => ({
      href: element.getAttribute("href"),
      text: element.textContent?.trim(),
    }))
  );

  await browser.close();

  return links;
}

export function cleanDuplicatesLinks(links: Link[]) {
  return links
    .filter((link) => link.href && link.href !== "#" && link.href !== "/")
    .filter(
      (link, index, self) =>
        index === self.findIndex((t) => t.href === link.href)
    );
}

export function cleanSocialMediaLinks(links: Link[]) {
  return links.filter(
    (link) =>
      !link.href?.includes("facebook") &&
      !link.href?.includes("instagram") &&
      !link.href?.includes("twitter") &&
      !link.href?.includes("whatsapp") &&
      !link.href?.includes("yotpo") &&
      !link.href?.includes("javascript") &&
      !link.href?.includes("#") &&
      !link.href?.includes("?page") &&
      !link.href?.includes("productClusterIds") &&
      !link.href?.includes("linkedin")
  );
}
