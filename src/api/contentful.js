import { createClient } from 'contentful';

let contentfulClient;

const getClient = () => {
  const space = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
  const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

  if (!space || !accessToken) {
    throw new Error(
      'Contentful is not configured. Set VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN.'
    );
  }

  if (!contentfulClient) {
    contentfulClient = createClient({ space, accessToken });
  }

  return contentfulClient;
};

export const client = {
  getEntries(query) {
    return getClient().getEntries(query);
  },
};
