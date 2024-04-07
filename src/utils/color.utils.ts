export const getBgColorClassName = (text: string) => {
  // 194 - 244
  const charCode = text.toLocaleLowerCase().charCodeAt(0) + text.charCodeAt(1);
  if (charCode >= 194 && charCode < 200) {
    return 'bg-amber-200';
  }
  if (charCode >= 200 && charCode < 205) {
    return 'bg-blue-200';
  }
  if (charCode >= 205 && charCode < 210) {
    return 'bg-orange-200';
  }
  if (charCode >= 210 && charCode < 215) {
    return 'bg-red-200';
  }
  if (charCode >= 215 && charCode < 218) {
    return 'bg-lime-200';
  }
  if (charCode >= 218 && charCode < 220) {
    return 'bg-cyan-200';
  }
  if (charCode >= 220 && charCode < 225) {
    return 'bg-yellow-200';
  }
  if (charCode >= 225 && charCode < 230) {
    return 'bg-teal-200';
  }
  if (charCode >= 235 && charCode < 235) {
    return 'bg-sky-200';
  }
  if (charCode >= 235 && charCode < 240) {
    return 'bg-indigo-200';
  }

  return 'bg-green-200';
};
