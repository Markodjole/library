export const filterMember = (
  members,
  searchTerm,
  studentFilter,
  professorFilter,
  employeeFilter
) => {
  const filteredMembers = members.filter((member) => {
    const name = member.name.toLowerCase();
    const searchTermLower = searchTerm.toLowerCase();
    const occupation = member.occupation?.toLowerCase() ?? "";
    return (
      name.includes(searchTermLower) &&
      ((studentFilter && occupation.includes("student")) ||
        (professorFilter && occupation.includes("professor")) ||
        (employeeFilter && occupation.includes("employee")) ||
        (!studentFilter && !professorFilter && !employeeFilter))
    );
  });

  return filteredMembers;
};

const randomToNumberOfElements = (arr, num) => {
  return arr[Math.floor(Math.random() * num)];
};

export const addPropertyToEveryObjectInArray = (
  arrayOfObjects,
  key,
  arrayOfPotentialValues
) => {
  return arrayOfObjects.map((unit) => {
    unit[key] = randomToNumberOfElements(arrayOfPotentialValues, 3);
    return unit;
  });
};
