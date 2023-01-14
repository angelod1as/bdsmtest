/**
 * This silly function is used in forms that don't accept boolean as values,
 * only string (eg. Radio).
 */
export const stringToBoolean = (string: "false" | "true") => {
  if (string === "true") return true
  return false
}
