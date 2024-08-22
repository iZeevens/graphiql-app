function getCookie(name: string) {
  const matches = new RegExp(
    '(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)',
  ).exec(document.cookie);
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export default getCookie;
