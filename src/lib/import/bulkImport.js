import wait from 'waait';

// Where the magic happens
const bulkImport = async (
  jwApiInstance,
  videos,
  setImportTotal,
  setImporting
) => {
  let count = 0;

  // eslint-disable-next-line no-restricted-syntax
  for await (const video of videos) {
    const shouldWait = Number.isInteger((count + 1) / 40);

    if (shouldWait) {
      console.log('Waiting for rate limit reset...');
      await wait(70000);
    }

    jwApiInstance.videos.create(video);

    count += 1;
  }

  setImporting(false);
  setImportTotal(count);
};

export default bulkImport;
