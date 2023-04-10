export const daysCounter = (startDate: string, endDate: string) => {
  const diffTime = +new Date(endDate) - +new Date(startDate);
  if (diffTime < 0) {
    throw new Error('Start Date must be before End Date');
  }
  if (diffTime === 0) {
    throw new Error('Start Date and End Date must be different');
  }
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return days;
};
