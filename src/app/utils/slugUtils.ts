/**
 * Gera um slug baseado no nome do produto
 * @param name - Nome do produto
 * @returns Slug formatado para URL
 */
export function generateProductSlug(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/[^a-z0-9\s]/g, '') // Remove caracteres especiais
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove hífens duplicados
    .trim();
}

/**
 * Gera a URL completa do produto
 * @param name - Nome do produto
 * @param id - ID do produto
 * @returns URL completa do produto
 */
export function generateProductUrl(name: string, id: number): string {
  const slug = generateProductSlug(name);
  return `/produto/${slug}/${id}`;
}
