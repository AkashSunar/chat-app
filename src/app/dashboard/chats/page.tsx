"use client";

import { useState } from "react";
import {
  Search,
  Plus,
  MessageSquare,
  Users,
  Clock,
  ChevronRight,
  X,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

const gradientColors = [
  "from-blue-500 to-blue-600",
  "from-cyan-500 to-cyan-600",
  "from-indigo-500 to-indigo-600",
  "from-purple-500 to-purple-600",
  "from-pink-500 to-pink-600",
  "from-red-500 to-red-600",
  "from-green-500 to-green-600",
  "from-teal-500 to-teal-600",
];

const initialChatRooms = [
  {
    id: 1,
    name: "Design Team",
    description: "5 members",
    avatar: "DT",
    color: "from-blue-500 to-blue-600",
    lastMessage: "Sarah: Great work on the designs!",
    time: "2 min",
    unread: 3,
  },
  {
    id: 2,
    name: "Marketing",
    description: "8 members",
    avatar: "MK",
    color: "from-cyan-500 to-cyan-600",
    lastMessage: "Emma: Campaign launches next week",
    time: "15 min",
    unread: 0,
  },
  {
    id: 3,
    name: "Development",
    description: "6 members",
    avatar: "DV",
    color: "from-indigo-500 to-indigo-600",
    lastMessage: "Alex: PR is ready for review",
    time: "45 min",
    unread: 1,
  },
  {
    id: 4,
    name: "Project Alpha",
    description: "4 members",
    avatar: "PA",
    color: "from-purple-500 to-purple-600",
    lastMessage: "David: 85% complete milestone reached",
    time: "1h",
    unread: 0,
  },
  {
    id: 5,
    name: "General Chat",
    description: "12 members",
    avatar: "GC",
    color: "from-slate-500 to-slate-600",
    lastMessage: "Lisa: Coffee break anyone?",
    time: "3h",
    unread: 2,
  },
  {
    id: 6,
    name: "Frontend",
    description: "4 members",
    avatar: "FE",
    color: "from-pink-500 to-pink-600",
    lastMessage: "Sam: New component library ready",
    time: "5h",
    unread: 0,
  },
];

export default function ChatsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [chatRooms, setChatRooms] = useState(initialChatRooms);

  const filteredRooms = chatRooms.filter((room) =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  const handleCreateChat = (e: any) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Please enter a chat room name");
      return;
    }

    const newRoom = {
      id: Math.max(...chatRooms.map((r) => r.id), 0) + 1,
      name: formData.name,
      description: "0 members",
      avatar: formData.name
        .split(" ")
        .slice(0, 2)
        .map((w) => w[0])
        .join("")
        .toUpperCase(),
      color: gradientColors[Math.floor(Math.random() * gradientColors.length)],
      lastMessage: formData.description || "No messages yet",
      time: "now",
      unread: 0,
    };

    setChatRooms([newRoom, ...chatRooms]);
    setIsModalOpen(false);
    setFormData({ name: "", description: "" });
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="h-screen bg-white flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Chats</h1>
            <p className="text-sm text-slate-500 mt-1">
              Manage all your conversations
            </p>
          </div>
          <Button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white gap-2 rounded-lg"
          >
            <Plus className="h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-slate-100 border-slate-200 text-slate-900 placeholder:text-slate-500 focus:bg-white rounded-lg"
          />
        </div>
      </div>

      {/* Content */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          {filteredRooms.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <MessageSquare className="h-12 w-12 text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-600 mb-2">
                No conversations found
              </h3>
              <p className="text-slate-500">
                Try a different search or create a new chat
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredRooms.map((room) => (
                <button
                  key={room.id}
                  className="group relative bg-white rounded-xl border border-slate-200 hover:border-slate-300 hover:shadow-lg transition-all duration-200 overflow-hidden text-left"
                >
                  {/* Unread Badge */}
                  {room.unread > 0 && (
                    <div className="absolute top-4 right-4 z-10">
                      <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-500 text-white text-xs font-bold">
                        {room.unread}
                      </span>
                    </div>
                  )}

                  {/* Gradient Header */}
                  <div className={`h-20 bg-gradient-to-r ${room.color}`} />

                  {/* Avatar */}
                  <div className="relative px-4 -mt-10 mb-4">
                    <div
                      className={`h-16 w-16 rounded-xl bg-gradient-to-r ${room.color} flex items-center justify-center text-white font-bold text-xl shadow-md`}
                    >
                      {room.avatar}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="px-4 pb-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      {room.name}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1">
                      {room.description}
                    </p>

                    {/* Last Message */}
                    <div className="mt-4 pt-4 border-t border-slate-100">
                      <p className="text-sm text-slate-600 truncate">
                        {room.lastMessage}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {room.time}
                        </span>
                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-slate-500 transition-colors" />
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Stats Footer */}
      <div className="border-t border-slate-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <div className="flex gap-6">
            <span className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              {chatRooms.length} conversations
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              {chatRooms.reduce((sum, room) => {
                const count = parseInt(room.description.split(" ")[0]);
                return sum + count;
              }, 0)}{" "}
              members
            </span>
          </div>
          <span className="text-slate-400">All up to date</span>
        </div>
      </div>
      {/* Modal Dialog */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <h2 className="text-2xl font-bold text-slate-900">
                Create New Chat
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleCreateChat} className="p-6 space-y-5">
              {/* Chat Name */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Chat Room Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="e.g., Product Team, Marketing"
                  className="w-full bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white rounded-lg"
                />
              </div>

              {/* Description/Purpose */}
              <div>
                <label className="block text-sm font-semibold text-slate-900 mb-2">
                  Purpose (Optional)
                </label>
                <Input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="e.g., Daily stand-ups and project updates"
                  className="w-full bg-slate-50 border-slate-300 text-slate-900 placeholder:text-slate-400 focus:bg-white rounded-lg"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-900 rounded-lg"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg"
                >
                  Create Chat
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
