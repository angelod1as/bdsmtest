const commonNamespace = ["common"]

export const generateNamespace = (namespaces: string[]) => {
  return [...commonNamespace, ...namespaces]
}
