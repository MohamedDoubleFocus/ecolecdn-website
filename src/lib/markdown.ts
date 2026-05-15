/**
 * Convertit le markdown inline (gras **texte**, italique *texte*) en HTML.
 * Échappe d'abord les caractères HTML pour éviter toute injection.
 * Utilisé pour rendre les paragraphes éditables dans TinaCMS sans HTML brut.
 */
export function inlineMd(text: string | undefined | null): string {
  if (!text) return '';
  const escaped = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
  return escaped
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-navy font-semibold">$1</strong>')
    .replace(/(?<!\*)\*(?!\*)([^*]+)\*(?!\*)/g, '<em>$1</em>');
}
