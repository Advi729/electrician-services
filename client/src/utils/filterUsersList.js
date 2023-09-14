export default function filterUsersList(searchText, users) {
    const filteredData = users.filter((user) =>
      user?.firstname?.toLowerCase()?.includes(searchText?.toLowerCase())
    );
    console.log('filtered:', filteredData);
    return filteredData;
  };