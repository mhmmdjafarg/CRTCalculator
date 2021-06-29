export const findGCD = (num1, num2) => {
  if (num2 === 0){
    return num1;
  }
  return findGCD(num2, num1 % num2);
};

export function checkPairwiseCoprime(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (findGCD(parseInt(array[i].modulo), parseInt(array[j].modulo)) !== 1) {
        return false;
      }
    }
  }
  return true;
}

// contoh 77 . x =` 1 (mod 5), 77 =a, 5 = m
// Mengembalikan balikan dari Mk(a) dalam moulus mk
export function modInverse(a, m) {
  const m0 = m;
  let y = 0;
  let x = 1;

  if (m === 1) return 0;

  while (a > 1) {
    // q is quotient
    let q = parseInt(a / m);
    let t = m;

    // m is remainder now,
    // process same as
    // Euclid's algo
    m = a % m;
    a = t;
    t = y;

    // Update y and x
    y = x - q * y;
    x = t;
  }
  // agar x positif
  if (x < 0) {
    x += m0;
  }
  return x;
}

/**
 *
 * @param {*} array
 * Solve CRT:
 * Cek pairwise coprime
 * Cari m dari perkalian tiap modulo
 * Cari M1 - Mk simpan kedalam array
 * Cari y1 - yk simpan kedalam array
 * Hitung x = a1M1y1 + ... akMkyk
 * k = panjang array
 */

export const solveCRT = (array) => {
  // Cek setiap pasangan modulo pairwise coprime
  if (checkPairwiseCoprime(array)) {
    const length = array.length;
    let m = 1;
    array.forEach((element) => {
      m *= parseInt(element.modulo);
    });

    // Collect M value
    let Mdata = [];
    array.forEach((element) => {
      Mdata.push(m / parseInt(element.modulo));
    });

    // Collect y value
    let yData = [];
    for (let i = 0; i < length; i++) {
      yData.push(modInverse(Mdata[i], parseInt(array[i].modulo)));
    }

    // Get x value
    let x = 0;
    for (let j = 0; j < length; j++) {
      x += parseInt(array[j].remainder) * Mdata[j] * yData[j];
    }

    // sederhanakan x menjadi terkecil
    // x = x % m;

    return {
      remainders: array.map((element) => parseInt(element.remainder)),
      modulos: array.map((element) => parseInt(element.modulo)),
      m: m,
      x: x,
      MData: Mdata,
      yData: yData,
    };
  } else {
    return null;
  }
};