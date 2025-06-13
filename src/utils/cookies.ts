const expiredDate = new Date();

export const setCookie = (name: string, value: string, daysToLive: number) => {
  expiredDate.setTime(expiredDate.getTime() + (daysToLive * 24 * 60 * 60 * 1000));
  let cookie = name + "=" + encodeURIComponent(value);
  cookie += "; max-age=" + daysToLive * 24 * 60 * 60;
  cookie += "; expires=" + expiredDate.toUTCString();
  cookie += "; samesite=strict; path=/;";
  // cookie += "; samesite=strict; path=/; secure;"; -> aktifkan jika menggunakan ssl
  document.cookie = cookie;
};

export const getCookie = (name: string) => {
  let cookieArr = document.cookie.split(";");
  for (let i = 0; i < cookieArr.length; i++) {
    let cookiePair = cookieArr[i].split("=");
    if (name == cookiePair[0].trim()) {
      return decodeURIComponent(cookiePair[1]);
    }
  }
  return null;
};

export const removeCookie = (name: string) => {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
};

export const currencyMode = localStorage.getItem('currency_mode') ? localStorage.getItem('currency_mode') : 'IDR';
export const currencyLocale = localStorage.getItem('currency_mode') ? localStorage.getItem('currency_mode') === "IDR" ? "id-ID" : "en-US" : "id-ID";