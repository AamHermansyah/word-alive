/** Small validators and input formatters for the admin sign-in screens. */

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
}

/** Keep digits only, at most six, and group them as "482 913". */
export function formatAuthenticatorCode(value: string) {
  const digits = value.replace(/\D/g, "").slice(0, 6)
  return digits.length > 3 ? `${digits.slice(0, 3)} ${digits.slice(3)}` : digits
}

export function isCompleteAuthenticatorCode(value: string) {
  return value.replace(/\D/g, "").length === 6
}

/** Upper-case letters and digits only, at most eight, grouped as "A7K2-9QX4". */
export function formatRecoveryCode(value: string) {
  const code = value
    .replace(/[^a-z0-9]/gi, "")
    .toUpperCase()
    .slice(0, 8)
  return code.length > 4 ? `${code.slice(0, 4)}-${code.slice(4)}` : code
}

export function isCompleteRecoveryCode(value: string) {
  return value.replace(/[^a-z0-9]/gi, "").length === 8
}
