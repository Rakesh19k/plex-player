export const convertMinutesToHours = (total:string | any): string => {
  // Check if it's a string and contains "season" or "seasons"
  if (typeof total === 'string' && total.toLowerCase().includes('season')) {
    return total;
  }

  // If it's a number, convert to hours and minutes
  if (total) {
    const hours = Math.floor(total / 60);
    const minutes = total % 60;
    return `${hours}h ${minutes}m`;
  }

  // Handle invalid input
  return '';
};

export const truncateTitle = (title: string, number: 10) => {
    return title?.length > number ? title?.slice(0, number) + '...' : title;
  };