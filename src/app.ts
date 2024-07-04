import {
  cleanDuplicatesLinks,
  cleanSocialMediaLinks,
  getLinksFromUrl,
} from "./utils";
import { Link } from "./core/types";

(async () => {
  const links = await getLinksFromUrl("https://www.cemaco.com/");
  const uniqueLinks = cleanDuplicatesLinks(links as Link[]);
  const filteredLinks = cleanSocialMediaLinks(uniqueLinks);

  const moreLinks = await getLinksFromUrl(
    `https://www.cemaco.com${filteredLinks[0].href}`
  );

  const uniqueMoreLinks = cleanDuplicatesLinks(moreLinks as Link[]);
  const filteredMoreLinks = cleanSocialMediaLinks(uniqueMoreLinks);

  console.log(`Links from`);
  console.log(filteredMoreLinks);
  console.log("--------------------------");

  // filteredLinks.forEach(async (link) => {
  //   const moreLinks = await getLinksFromUrl(
  //     `https://www.cemaco.com${link.href}`
  //   );

  //   const uniqueMoreLinks = cleanDuplicatesLinks(moreLinks as Link[]);
  //   const filteredMoreLinks = cleanSocialMediaLinks(uniqueMoreLinks);

  //   console.log(`Links from ${link.text}:`);
  //   console.log(filteredMoreLinks);
  //   console.log("--------------------------");
  // });
})();
