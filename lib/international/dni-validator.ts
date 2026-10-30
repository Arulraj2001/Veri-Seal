import { DniValidationResult } from './types';

/**
 * Validates Spanish DNI, NIE, and CIF using the official Ministerio del Interior
 * Modulo 23 algorithm and Spanish tax office verification rules.
 */
export function validateDniNieCif(input: string): DniValidationResult {
  const rawInput = (input || '').trim().toUpperCase();
  const clean = rawInput.replace(/[-\s]/g, '');

  if (!clean) {
    return {
      rawInput,
      formatted: '',
      type: 'INVALID',
      isValid: false,
      detail: 'El campo de identificación no puede estar vacío.',
    };
  }

  const CONTROL_LETTERS = 'TRWAGMYFPDXBNJZSQVHLCKE';

  // 1. DNI (8 digits + 1 letter)
  const dniRegex = /^(\d{8})([A-Z])$/;
  if (dniRegex.test(clean)) {
    const match = clean.match(dniRegex)!;
    const number = parseInt(match[1], 10);
    const letter = match[2];
    const expectedLetter = CONTROL_LETTERS[number % 23];
    const isValid = letter === expectedLetter;

    return {
      rawInput,
      formatted: `${match[1]}-${letter}`,
      type: 'DNI',
      isValid,
      actualControlDigit: letter,
      expectedControlDigit: expectedLetter,
      detail: isValid
        ? 'DNI válido conforme al algoritmo oficial de la Policía Nacional y Ministerio del Interior.'
        : `Letra de control incorrecta. Para el número ${match[1]}, la letra esperada es "${expectedLetter}".`,
    };
  }

  // 2. NIE (X, Y, Z + 7 digits + 1 letter)
  const nieRegex = /^([XYZ])(\d{7})([A-Z])$/;
  if (nieRegex.test(clean)) {
    const match = clean.match(nieRegex)!;
    const prefix = match[1];
    const digits = match[2];
    const letter = match[3];

    let prefixNumber = '0';
    if (prefix === 'Y') prefixNumber = '1';
    if (prefix === 'Z') prefixNumber = '2';

    const fullNumber = parseInt(prefixNumber + digits, 10);
    const expectedLetter = CONTROL_LETTERS[fullNumber % 23];
    const isValid = letter === expectedLetter;

    return {
      rawInput,
      formatted: `${prefix}-${digits}-${letter}`,
      type: 'NIE',
      isValid,
      actualControlDigit: letter,
      expectedControlDigit: expectedLetter,
      detail: isValid
        ? 'NIE (Número de Identidad de Extranjero) válido verificado con éxito.'
        : `Dígito de control incorrecto. Para el NIE ${prefix}${digits}, la letra esperada es "${expectedLetter}".`,
    };
  }

  // 3. CIF (1 letter + 7 digits + 1 control alphanumeric)
  const cifRegex = /^([ABCDEFGHJNPQRSUVW])(\d{7})([0-9A-J])$/;
  if (cifRegex.test(clean)) {
    const match = clean.match(cifRegex)!;
    const letter = match[1];
    const digits = match[2];
    const control = match[3];

    // Algoritmo de validación CIF
    let evenSum = 0;
    let oddSum = 0;

    for (let i = 0; i < 7; i++) {
      const d = parseInt(digits[i], 10);
      if ((i + 1) % 2 === 0) {
        evenSum += d;
      } else {
        const doubled = d * 2;
        oddSum += Math.floor(doubled / 10) + (doubled % 10);
      }
    }

    const total = evenSum + oddSum;
    const controlDigit = (10 - (total % 10)) % 10;
    const controlChar = 'JABCDEFGHI'[controlDigit];

    const isNumericControl = /^[0-9]$/.test(control);
    const isValid =
      (isNumericControl && parseInt(control, 10) === controlDigit) ||
      (!isNumericControl && control === controlChar);

    return {
      rawInput,
      formatted: `${letter}-${digits}-${control}`,
      type: 'CIF',
      isValid,
      actualControlDigit: control,
      expectedControlDigit: `${controlDigit} o ${controlChar}`,
      detail: isValid
        ? `CIF de empresa (${letter}) válido conforme al Registro Mercantil y Agencia Tributaria.`
        : `Dígito de control CIF no coincide. Esperado: ${controlDigit} o ${controlChar}.`,
    };
  }

  return {
    rawInput,
    formatted: clean,
    type: 'INVALID',
    isValid: false,
    detail:
      'Formato no reconocido. Debe ser un DNI (8 números + letra), NIE (X/Y/Z + 7 números + letra) o CIF de empresa.',
  };
}

