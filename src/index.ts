import * as p from 'pakertaja';
import wiki from 'wikijs';

import './style.sass';

const initialize = () => {
  const container = p.div({ id: 'container' });
  // TODO: Add support for more languages.
  const client = wiki({ apiUrl: 'https://en.wikipedia.org/w/api.php' });
  const addEntry = (url: string, imageUrl: string) => {
    p.append(container, p.a({ href: url }, p.img({ src: imageUrl })));
  };
  const load = async (amount: number) => {
    try {
      (await client.random(25)).forEach(async pageTitle => {
        const page = await client.page(pageTitle);
        const mainImageUrl = await page.mainImage();

        if (mainImageUrl != null &&
            !/^\s*$/.test(mainImageUrl) &&
            !/\.(mp3|ogg)$/i.test(mainImageUrl)) {
          addEntry(page.url().toString(), mainImageUrl);
        }
      });
    } catch (err) {
      console.error(err);
    }
  };

  p.append(document.body, container);
  load(25);
};

document.addEventListener('DOMContentLoaded', initialize);
