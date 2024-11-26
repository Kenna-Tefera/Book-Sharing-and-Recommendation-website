import React from 'react';

const Sidebar = () => {
  const menuItems = [
    { label: 'Home', icon: '🏠', link: '/' },
    { label: 'Books', icon: '📚', link: '/books' },
    { label: 'Categories', icon: '📂', link: '/categories' },
    { label: 'Favorites', icon: '❤️', link: '/favorites' },
    { label: 'Settings', icon: '⚙️', link: '/settings' },
  ];

  return (
    <div className="w-64 bg-black text-white flex flex-col h-full">
      {/* Profile Section */}
      <div className="p-6 flex flex-col items-center">
        <img
          src="https://via.placeholder.com/100"
          alt="Profile"
          className="w-24 h-24 rounded-full border-2 border-gray-500 mb-4"
        />
        <h2 className="text-lg font-semibold">John Doe</h2>
        <p className="text-gray-400 text-sm">Book Lover</p>
      </div>

      {/* Menu Items */}
      <nav className="flex-grow">
        <ul className="space-y-2">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="flex items-center px-4 py-2 hover:bg-gray-700 transition-all"
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 text-gray-400 text-sm">
        © {new Date().getFullYear()} BookSite
      </div>
    </div>
  );
};

export default Sidebar;
