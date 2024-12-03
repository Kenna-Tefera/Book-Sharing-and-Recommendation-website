import React, { useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/sidebar/sidebar';
import { FaMicrophone, FaVideo, FaStop, FaVideoSlash } from 'react-icons/fa'; // Importing icons

const GroupChatPage = () => {
  const location = useLocation();
  const { groupName, selectedMembers = [] } = location.state || {};
  
  // State to manage the group members (add/remove functionality)
  const [members, setMembers] = useState(selectedMembers);
  const [message, setMessage] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isVideoRecording, setIsVideoRecording] = useState(false);
  const [showMemberModal, setShowMemberModal] = useState(false);

  const audioRef = useRef();
  const videoRef = useRef();

  // Add member to group
  const handleAddMember = (newMember) => {
    setMembers((prevMembers) => [...prevMembers, newMember]);
  };

  // Remove member from group
  const handleRemoveMember = (memberId) => {
    setMembers((prevMembers) => prevMembers.filter((member) => member.id !== memberId));
  };

  // Message sending
  const handleSendMessage = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  // Voice Recording functions
  const startVoiceRecording = () => {
    setIsRecording(true);
    // Recording logic goes here
    console.log('Recording voice...');
  };

  const stopVoiceRecording = () => {
    setIsRecording(false);
    console.log('Voice recording stopped');
    // Process and send the recorded audio
  };

  // Video Recording functions
  const startVideoRecording = () => {
    setIsVideoRecording(true);
    console.log('Recording video...');
    // Implement video recording logic using getUserMedia API or a library like RecordRTC
  };

  const stopVideoRecording = () => {
    setIsVideoRecording(false);
    console.log('Video recording stopped');
    // Process and send the recorded video
  };

  return (
    <div className="flex h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="ml-8 flex-1 flex flex-col">
          <h2 className="text-2xl font-semibold mb-4">
            <span 
              className="cursor-pointer text-blue-500 hover:underline"
              onClick={() => setShowMemberModal(true)}
            >
              Group Chat: {groupName}
            </span>
          </h2>

          {/* Chat box */}
          <div className="chat-box flex-1 overflow-y-auto border rounded p-4 mb-4">
            <p>Chat functionality can be implemented here.</p>
          </div>

          {/* Group members modal */}
          {showMemberModal && (
            <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
              <div className="bg-white p-6 rounded-md max-w-lg w-full">
                <h3 className="text-xl font-semibold mb-4">Group Members</h3>
                <ul className="mb-4">
                  {members.map((member) => (
                    <li key={member.id} className="flex items-center justify-between mb-2">
                      <span>{member.name}</span>
                      <button
                        className="text-red-500 hover:text-red-700"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <button
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  onClick={() => setShowMemberModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          )}

          {/* Voice/Video Recording Box */}
          <div className="flex justify-between items-center mb-4 border-t pt-4">
            <div className="flex space-x-4">
              <button
                className={`bg-green-500 text-white p-3 rounded-full ${isRecording ? 'opacity-50' : ''}`}
                onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                disabled={isRecording}
              >
                {isRecording ? <FaStop /> : <FaMicrophone />}
              </button>
              <button
                className={`bg-red-500 text-white p-3 rounded-full ${isVideoRecording ? 'opacity-50' : ''}`}
                onClick={isVideoRecording ? stopVideoRecording : startVideoRecording}
                disabled={isVideoRecording}
              >
                {isVideoRecording ? <FaVideoSlash /> : <FaVideo />}
              </button>
            </div>
          </div>

          {/* Message Input Box (fixed at the bottom) */}
          <div className="flex mb-4">
            <input
              type="text"
              className="border rounded px-4 py-2 flex-grow"
              placeholder="Type a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleSendMessage}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupChatPage;
