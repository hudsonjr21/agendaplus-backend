/**
 * @description
 * Função que identifica itens vazios dentro de objetos e o retira do objeto.
 * @param obj Objeto a ser verificado
 * @returns Objeto sem itens vazios
 */
export function FormatEmptyObjects(obj: any) {
  for (const chave in obj) {
    const objValue = obj[chave];
    if (objValue === '' || objValue.length === 0) {
      delete obj[chave];
    } else if (typeof objValue === 'object') {
      FormatEmptyObjects(objValue);
    }
  }
  return obj;
}
