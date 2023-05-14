export const get = (obj: any, string: string, defaultValue?: any) => {
  const parts = string.split(/[\]\[\.]/).filter(x => x);
  let attempt = obj;
  for (let part of parts) {
    if(attempt == null || attempt[part] === undefined) return defaultValue;
    attempt = attempt[part];
  }
  return attempt;
}