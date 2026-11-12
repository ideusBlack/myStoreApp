export const C = {
  bg: '#F5F5F7', card: '#FFFFFF', text: '#1D1D1F', sub: '#86868B',
  blue: '#0071E3', red: '#E3002B', dark: '#000000', line: '#E8E8ED',
};
export const shadow = {
  shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 14,
  shadowOffset: { width: 0, height: 6 }, elevation: 4,
};
export const precioNum = (s) => parseInt(String(s).replace(/[^0-9]/g, ''), 10);
