export default function filterElectriciansList(searchText, electricians) {
    const filteredData = electricians.filter((electrician) =>
      electrician?.firstname?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    console.log('filtered:', filteredData);
    return filteredData;
  };