export const fetchCountriesAPI = async () => {
    const response = await fetch(
      'https://restcountries.com/v2/all?fields=name,region,flag'
    );
  
    if (!response.ok) {
      throw new Error('Failed to fetch countries');
    }
  
    return await response.json();
  };