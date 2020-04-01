import { uniqBy } from 'lodash';
import parser from 'fast-xml-parser';
import getDate from './getDate';
import bulkImport from './bulkImport';

const sitemapFetch = (
  jwApiInstance,
  sitemapUrl,
  setError,
  setImportTotal,
  setImporting
) => {
  fetch(sitemapUrl)
    .then(res => res.text())
    .then(
      res => {
        if (!parser.validate(res)) {
          console.error(`Invalid XML\n\nResponse: ${res}`);
          setError(true);

          return;
        }

        const parsedXML = parser.parse(res);

        if (!parsedXML || !parsedXML.urlset) {
          console.error(
            `Invalid response or XML\n\nResponse: ${res}\n\nXML: ${JSON.stringify(
              parsedXML
            )}`
          );
          setError(true);

          return;
        }

        setImporting(true);

        const videoArray = parsedXML.urlset.url.reduce(
          (prevLocation, location) => {
            if (Array.isArray(location['video:video'])) {
              const nestedVideoArray = location['video:video'].map(video => ({
                title: video['video:title'],
                download_url: video['video:content_loc'],
                date: getDate(video['video:publication_date']),
                description: video['video:description'],
                link: location.loc,
              }));

              return [...prevLocation, ...nestedVideoArray];
            }

            return [
              ...prevLocation,
              {
                title: location['video:video']['video:title'],
                download_url: location['video:video']['video:content_loc'],
                date: getDate(
                  location['video:video']['video:publication_date']
                ),
                description: location['video:video']['video:description'],
                link: location.loc,
              },
            ];
          },
          []
        );

        const videos = uniqBy(videoArray, 'download_url');

        bulkImport(jwApiInstance, videos, setImportTotal, setImporting);
      },
      error => console.log('Error: ', error)
    );
};

export default sitemapFetch;
