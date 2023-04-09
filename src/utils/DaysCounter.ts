export const daysCounter = (startDate: string, endDate: string) => {
  const diffTime = Math.abs(+new Date(endDate) - +new Date(startDate));
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return days;
};
