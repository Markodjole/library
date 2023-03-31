import React from "react";
import { avatarBaseUrl } from "../services/services";
import { Member } from "../models/Models";

interface MemberCardProps {
  member: Member;
}

const MemberCard: React.FC<MemberCardProps> = ({ member }) => {
  return (
    <div>
      <li key={member.id}>
        <img
          src={`${avatarBaseUrl}${member.email}`}
          alt={`${member.name}'s avatar`}
        />
        <div>
          <p>{member.name}</p>
          <p>{member.address.city}</p>
          <p>{member.occupation}</p>
          <p>{member.company.bs}</p>
        </div>
      </li>
    </div>
  );
};

export default MemberCard;
