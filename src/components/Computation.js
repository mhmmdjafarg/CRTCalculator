// const array = [
//   { remainder: 3, modulo: 5 },
//   { remainder: 5, modulo: 7 },
//   { remainder: 7, modulo: 11 },
//   { remainder: 2, modulo: 17 },
//   { remainder: 2, modulo: 17 },
// ];

const findGCD = (num1, num2) => {
  if (num1 === 0) {
    return num2;
  } else if (num2 === 0) {
    return num1;
  } else if (num1 === num2) {
    return num1;
  } else if (num1 > num2) {
    return findGCD(num1 - num2, num2);
  } else {
    return findGCD(num1, num2 - num1);
  }
};

function checkPairwiseCoprime(array) {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (findGCD(array[i].modulo, array[j].modulo) !== 1) {
        return false;
      }
    }
  }
  return true;
}

// contoh 77 . x =` 1 (mod 5), 77 =a, 5 = m
// Mengembalikan balikan dari Mk(a) dalam moulus mk
function modInverse(a, m) {
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

const solveCRT = (array) => {
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
    x = x % m;

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

// console.log(modInverse(77, 5));
// console.log(modInverse(55, 7));
// console.log(modInverse(35, 11));
// console.log(checkPairwiseCoprime(array));
// console.log(solveCRT(array));