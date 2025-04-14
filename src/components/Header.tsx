
import React from 'react';
import { Bell, Settings, Search, User } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
  return (
    <header className="bg-dashboard-blue-dark text-white border-b border-gray-700 py-4 px-6 flex justify-between items-center shadow-md">
      <div className="flex-1">
        <h1 className="text-2xl font-bold">Dashboard Inspektorat IV</h1>
      </div>
      
      {/* <div className="hidden md:flex items-center relative max-w-xs w-full mr-4">
        <Search className="absolute left-2 h-4 w-4 text-gray-400" />
        <Input 
          className="pl-8 pr-4 py-2 rounded-lg bg-white/10 border-white/20 text-white placeholder-gray-300"
          placeholder="Cari..." 
        />
      </div>
      
      <div className="flex items-center space-x-4">
        <button className="p-2 rounded-full hover:bg-white/10">
          <Bell className="h-5 w-5 text-white" />
        </button>
        <button className="p-2 rounded-full hover:bg-white/10">
          <Settings className="h-5 w-5 text-white" />
        </button>
        <div className="h-8 w-8 rounded-full bg-dashboard-accent flex items-center justify-center text-white">
          <User className="h-4 w-4" />
        </div>
      </div> */}
    </header>
  );
};

export default Header;
