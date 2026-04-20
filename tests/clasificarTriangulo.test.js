const {
  clasificarTriangulo,
  MAX_LADO,
  MSG_PARAMETROS,
  MSG_NO_ENTERO,
  MSG_LONGITUD_INVALIDA,
  MSG_FUERA_DE_RANGO,
  MSG_NO_TRIANGULO
} = require('../src/clasificarTriangulo');

describe('clasificarTriangulo — clases de equivalencia válidas', () => {
  test('válido: equilátero', () => {
    // Arrange
    const a = 5;
    const b = 5;
    const c = 5;
    const expected = 'Equilátero';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('válido: isósceles — permutación (a, b) iguales', () => {
    // Arrange
    const a = 4;
    const b = 4;
    const c = 3;
    const expected = 'Isósceles';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('válido: isósceles — permutación (b, c) iguales', () => {
    // Arrange
    const a = 3;
    const b = 4;
    const c = 4;
    const expected = 'Isósceles';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('válido: isósceles — permutación (a, c) iguales', () => {
    // Arrange
    const a = 4;
    const b = 3;
    const c = 4;
    const expected = 'Isósceles';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('válido: escaleno', () => {
    // Arrange
    const a = 3;
    const b = 4;
    const c = 5;
    const expected = 'Escaleno';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });
});

describe('clasificarTriangulo — clases de equivalencia inválidas', () => {
  test('inválido: triángulo imposible (desigualdad triangular)', () => {
    // Arrange
    const a = 1;
    const b = 2;
    const c = 10;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_TRIANGULO);
  });

  test('inválido: un lado con longitud 0', () => {
    // Arrange
    const a = 0;
    const b = 3;
    const c = 3;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_LONGITUD_INVALIDA);
  });

  test('inválido: longitud negativa', () => {
    // Arrange
    const a = -1;
    const b = 3;
    const c = 3;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_LONGITUD_INVALIDA);
  });

  test('inválido: lado con valor de punto flotante', () => {
    // Arrange
    const a = 3.5;
    const b = 4;
    const c = 5;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_ENTERO);
  });

  test('inválido: número incorrecto de parámetros (menos de tres)', () => {
    // Arrange
    const a = 3;
    const b = 3;

    // Act
    const act = () => clasificarTriangulo(a, b);

    // Assert
    expect(act).toThrow(MSG_PARAMETROS);
  });

  test('inválido: número incorrecto de parámetros (más de tres)', () => {
    // Arrange
    const args = [3, 3, 3, 1];

    // Act
    const act = () => clasificarTriangulo(...args);

    // Assert
    expect(act).toThrow(MSG_PARAMETROS);
  });
});

describe('condiciones de borde — casi equilátero / casi isósceles', () => {
  test('isósceles casi equilátero (dos lados iguales, tercero cercano)', () => {
    // Arrange
    const a = 100;
    const b = 100;
    const c = 99;
    const expected = 'Isósceles';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('escaleno cercano a isósceles (enteros consecutivos)', () => {
    // Arrange
    const a = 10;
    const b = 11;
    const c = 12;
    const expected = 'Escaleno';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });
});

describe('condiciones de borde — triángulos muy pequeños y muy grandes', () => {
  test('triángulo muy pequeño (mínimo entero válido equilátero)', () => {
    // Arrange
    const a = 1;
    const b = 1;
    const c = 1;
    const expected = 'Equilátero';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('triángulo muy grande dentro del rango (equilátero en el máximo)', () => {
    // Arrange
    const a = MAX_LADO;
    const b = MAX_LADO;
    const c = MAX_LADO;
    const expected = 'Equilátero';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });
});

describe('condiciones de borde — combinaciones lado muy largo y muy corto (permutaciones)', () => {
  test('orden: largo, largo, corto', () => {
    // Arrange
    const a = 500_000;
    const b = 500_000;
    const c = 1;
    const expected = 'Isósceles';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('orden: largo, corto, largo', () => {
    // Arrange
    const a = 500_000;
    const b = 1;
    const c = 500_000;
    const expected = 'Isósceles';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('orden: corto, largo, largo', () => {
    // Arrange
    const a = 1;
    const b = 500_000;
    const c = 500_000;
    const expected = 'Isósceles';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });
});

describe('condiciones de borde — fuera de rango máximo', () => {
  test('un lado mayor que MAX_LADO', () => {
    // Arrange
    const a = MAX_LADO + 1;
    const b = 1;
    const c = 1;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_FUERA_DE_RANGO);
  });
});

describe('condiciones de borde — un lado igual a la suma de los otros dos (degenerado, tres permutaciones)', () => {
  test('c = a + b', () => {
    // Arrange
    const a = 2;
    const b = 3;
    const c = 5;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_TRIANGULO);
  });

  test('b = a + c', () => {
    // Arrange
    const a = 2;
    const b = 5;
    const c = 3;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_TRIANGULO);
  });

  test('a = b + c', () => {
    // Arrange
    const a = 5;
    const b = 2;
    const c = 3;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_TRIANGULO);
  });
});

describe('condiciones de borde — un lado apenas menor que la suma de los otros dos (tres permutaciones)', () => {
  test('c = a + b - 1', () => {
    // Arrange
    const a = 4;
    const b = 5;
    const c = 8;
    const expected = 'Escaleno';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('b = a + c - 1', () => {
    // Arrange
    const a = 4;
    const b = 8;
    const c = 5;
    const expected = 'Escaleno';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });

  test('a = b + c - 1', () => {
    // Arrange
    const a = 8;
    const b = 4;
    const c = 5;
    const expected = 'Escaleno';

    // Act
    const result = clasificarTriangulo(a, b, c);

    // Assert
    expect(result).toBe(expected);
  });
});

describe('condiciones de borde — un lado apenas mayor que la suma de los otros dos (tres permutaciones)', () => {
  test('c = a + b + 1', () => {
    // Arrange
    const a = 4;
    const b = 5;
    const c = 10;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_TRIANGULO);
  });

  test('b = a + c + 1', () => {
    // Arrange
    const a = 4;
    const b = 10;
    const c = 5;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_TRIANGULO);
  });

  test('a = b + c + 1', () => {
    // Arrange
    const a = 10;
    const b = 4;
    const c = 5;

    // Act
    const act = () => clasificarTriangulo(a, b, c);

    // Assert
    expect(act).toThrow(MSG_NO_TRIANGULO);
  });
});
