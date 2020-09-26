export const makeQuery = (queryElements: Record<string, string>) =>
  Object.entries(queryElements).reduce(
    (acc, [key, value]) =>
      acc === '?' ? `${acc}${key}=${value}` : `${acc}&${key}=${value}`,
    '?'
  );
