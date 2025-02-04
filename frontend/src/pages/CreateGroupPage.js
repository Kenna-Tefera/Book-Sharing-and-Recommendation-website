import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';

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
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-6">Create New Group</h2>
        <div className="mb-6">
          <label htmlFor="groupName" className="block text-xl font-medium mb-2">
            Group Name
          </label>
          <input
            type="text"
            id="groupName"
            placeholder="Enter Group Name"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className="w-full p-3 border rounded-md shadow-md"
          />
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-medium mb-4">Select Members</h3>
          <ul>
            {allMembers.map((member) => (
              <li key={member.id} className="mb-3 flex items-center">
                <input
                  type="checkbox"
                  id={`member-${member.id}`}
                  checked={selectedMembers.includes(member)}
                  onChange={() => toggleMemberSelection(member)}
                  className="mr-3"
                />
                <label htmlFor={`member-${member.id}`} className="text-lg">
                  {member.name}
                </label>
              </li>
            ))}
          </ul>
        </div>

        <button
          onClick={handleCreateGroup}
          className="w-full bg-blue-600 text-white py-3 rounded-md shadow-md hover:bg-blue-700 transition"
        >
          Create Group
        </button>
      </div>
    </div>
  );
};

export default CreateGroupPage;
