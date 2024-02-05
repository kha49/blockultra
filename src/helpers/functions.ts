function getImageType(base64String: string) {
  const decodedData = atob(base64String);
  const uintArray = new Uint8Array(decodedData.length);

  for (let i = 0; i < decodedData.length; i++) {
    uintArray[i] = decodedData.charCodeAt(i);
  }

  // Check for PNG signature
  if (
    uintArray.length > 8 &&
    uintArray[0] === 137 &&
    uintArray[1] === 80 &&
    uintArray[2] === 78 &&
    uintArray[3] === 71 &&
    uintArray[4] === 13 &&
    uintArray[5] === 10 &&
    uintArray[6] === 26 &&
    uintArray[7] === 10
  ) {
    return 'png';
  }

  // Check for SVG declaration
  const svgRegex = /<svg.*?>/i;
  if (svgRegex.test(decodedData)) {
    return 'svg';
  }

  // If neither PNG nor SVG, return null or handle accordingly
  return null;
}

export function changeImageUrl(logo: string) {
  if (!logo) return '';
  if (
    logo.includes('img.api.cryptorank.io') ||
    logo.includes('img.cryptorank.io')
  ) {
    return logo;
  } else {
    if (logo.includes('data:image/')) {
      return logo;
    }

    const type = getImageType(logo);
    if (type === 'svg') {
      return `data:image/svg+xml;base64,${logo}`;
    }

    return `data:image/png;base64,${logo}`;
  }
}

export function getValue(obj: any, path: string) {
  const keysArray = path.split('.');
  let newObject = JSON.parse(simpleStringify(obj));
  for (let i = 0; i < keysArray.length; i++) {
    if (typeof newObject[keysArray[i]] === undefined) {
      return newObject[keysArray[i]];
    }
    newObject = newObject[keysArray[i]];
  }
  return newObject;
}

function simpleStringify(object: any) {
  var simpleObject = {};
  for (var prop in object) {
    if (!object.hasOwnProperty(prop)) {
      continue;
    }
    if (typeof object[prop] == 'object') {
      continue;
    }
    if (typeof object[prop] == 'function') {
      continue;
    }
    //@ts-ignore
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
}

export function caculatorAverage24h(price: any, histPrice: any) {
  try {
    if (price && histPrice) {
      const currentPrice = price ? price['USD'] : 0;
      const usdHistPrice = histPrice ? histPrice['24H']['USD'] : 0;
      const average = (currentPrice - usdHistPrice) / usdHistPrice;
      return average;
    }
  } catch (error) {
    return 0;
  }
  return 0;
}
