import React, { useState, useEffect } from "react";
import "../style.scss";
import {
  filterMember,
  addPropertyToEveryObjectInArray,
} from "../utils/members-utils";
import { fetch } from "../services/services";
import { Member } from "../models/Models";
import MemberCard from "../components/MemberCard.tsx";

const MembersList: React.FC = () => {
  const [members, setMembers] = useState();
  const [allMembers, setAllMembers] = useState<Member[]>([]);
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [studentFilter, setStudentFilter] = useState<boolean>(false);
  const [professorFilter, setProfessorFilter] = useState<boolean>(false);
  const [employeeFilter, setEmployeeFilter] = useState<boolean>(false);
  const occupations: string[] = ["student", "professor", "employee"];
  const placeholder = "https://jsonplaceholder.typicode.com/users";

  useEffect(() => {
    const fetchMembers = async () => {
      const res = await fetch(placeholder);
      const response = addPropertyToEveryObjectInArray(
        res.data,
        "occupation",
        occupations
      );
      setAllMembers(response);
      setMembers(response);
      setFilteredMembers(response);
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    const filterMembers = () => {
      let filtered = filterMember(
        allMembers,
        searchTerm,
        studentFilter,
        professorFilter,
        employeeFilter
      );
      setFilteredMembers(filtered);
    };
    filterMembers();
  }, [searchTerm, studentFilter, professorFilter, employeeFilter, allMembers]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilter = (filter: string) => {
    switch (filter) {
      case "employee":
        return setEmployeeFilter(!employeeFilter);
      case "professor":
        return setProfessorFilter(!professorFilter);
      default:
        return setStudentFilter(!studentFilter);
    }
  };

  const checkBox = (occupation: string) => {
    return (
      <label key={occupation}>
        {occupation}
        <input
          type="checkbox"
          checked={eval(`${occupation}Filter`)}
          onChange={() => handleFilter(occupation)}
        />
      </label>
    );
  };

  return (
    <div className="container">
      <div className="member-list">
        <h3>Library</h3>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Type"
        />
        {occupations.map((occupation) => checkBox(occupation))}
      </div>
      <ul>
        {filteredMembers.map((member) => (
          <MemberCard member={member} />
        ))}
      </ul>
    </div>
  );
};

export default MembersList;
