export const getBgColorClassName = (text: string) => {
  const charCode = text.toUpperCase().charCodeAt(0);
  if (charCode >= 65 && charCode < 68) {
    return 'bg-amber-200';
  }
  if (charCode >= 68 && charCode < 70) {
    return 'bg-blue-200';
  }
  if (charCode >= 70 && charCode < 75) {
    return 'bg-orange-200';
  }
  if (charCode >= 75 && charCode < 85) {
    return 'bg-red-200';
  }

  return 'bg-green-200';
};
