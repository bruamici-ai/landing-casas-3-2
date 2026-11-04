// Inclusive through December 31 in Mendoza; checked at runtime for static builds.
export function expireVouchers(document, now = Date.now()) {
  document.querySelectorAll('[data-voucher-expires]').forEach(card => {
    if (now < Date.parse(card.getAttribute('data-voucher-expires'))) return;
    card.querySelector('dialog[open]')?.close();
    card.remove();
  });
}
