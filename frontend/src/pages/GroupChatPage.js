import React from 'react';
import { useLocation } from 'react-router-dom';

const GroupChatPage = () => {
  const location = useLocation();
  const { groupName, selectedMembers } = location.state || {};

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Group Chat: {groupName}</h2>
      <h3 className="text-xl mb-2">Members:</h3>
      <ul className="mb-4">
        {selectedMembers.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
      <div className="chat-box border rounded p-4">
        <p>Chat functionality can be implemented here.</p>
      </div>
    </div>
  );
};

export default GroupChatPage;