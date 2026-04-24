/**
 * Límite superior inclusive para cada lado (condición de borde: fuera de rango).
 * @type {number}
 */
const MAX_LADO = 1_000_000;

const MSG_PARAMETROS = 'Número incorrecto de parámetros';
const MSG_NO_ENTERO = 'Las longitudes deben ser enteros';
const MSG_LONGITUD_INVALIDA = 'Longitudes no válidas';
const MSG_FUERA_DE_RANGO = 'Longitudes fuera del rango permitido';
const MSG_NO_TRIANGULO = 'No es un triángulo válido';

/**
 * Clasifica un triángulo según las longitudes de sus tres lados (enteros positivos).
 *
 * @param {number} a
 * @param {number} b
 * @param {number} c
 * @returns {'Equilátero' | 'Isósceles' | 'Escaleno'}
 */
function clasificarTriangulo(a, b, c) {
  if (arguments.length !== 3) {
    throw new Error(MSG_PARAMETROS);
  }

  if (![a, b, c].every((x) => Number.isInteger(x))) {
    throw new Error(MSG_NO_ENTERO);
  }

  if (a <= 0 || b <= 0 || c <= 0) {
    throw new Error(MSG_LONGITUD_INVALIDA);
  }

  if (a > MAX_LADO || b > MAX_LADO || c > MAX_LADO) {
    throw new Error(MSG_FUERA_DE_RANGO);
  }

  if (a + b <= c || a + c <= b || b + c <= a) {
    throw new Error(MSG_NO_TRIANGULO);
  }

  if (a === b && b === c) {
    return 'Equilátero';
  }

  if (a === b || b === c || a === c) {
    return 'Isósceles';
  }

  return 'Escaleno';
}

module.exports = {
  clasificarTriangulo,
  MAX_LADO,
  MSG_PARAMETROS,
  MSG_NO_ENTERO,
  MSG_LONGITUD_INVALIDA,
  MSG_FUERA_DE_RANGO,
  MSG_NO_TRIANGULO
};
