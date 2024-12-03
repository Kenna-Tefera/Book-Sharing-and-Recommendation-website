import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateGroupPage = () => {
  const [groupName, setGroupName] = useState('');
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [allMembers] = useState([
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 3, name: 'Charlie' },
  ]); // Mock members list

  const navigate = useNavigate();

  const toggleMemberSelection = (member) => {
    setSelectedMembers((prev) =>
      prev.includes(member)
        ? prev.filter((m) => m !== member)
        : [...prev, member]
    );
  };

  const handleCreateGroup = () => {
    if (groupName && selectedMembers.length > 0) {
      // Pass group details to the chat room
      navigate('/GroupChatPage', { state: { groupName, selectedMembers } });
    } else {
      alert('Please provide a group name and select members.');
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-semibold mb-4">Create New Group</h2>
      <input
        type="text"
        placeholder="Group Name"
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        className="w-full p-2 border mb-4 rounded"
      />
      <h3 className="text-xl mb-2">Select Members:</h3>
      <ul className="mb-4">
        {allMembers.map((member) => (
          <li key={member.id} className="mb-2 flex items-center">
            <input
              type="checkbox"
              id={`member-${member.id}`}
              checked={selectedMembers.includes(member)}
              onChange={() => toggleMemberSelection(member)}
            />
            <label htmlFor={`member-${member.id}`} className="ml-2">
              {member.name}
            </label>
          </li>
        ))}
      </ul>
      <button
        onClick={handleCreateGroup}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Create Group
      </button>
    </div>
  );
};

export default CreateGroupPage;
