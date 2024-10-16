"use client"

import { useState } from "react"
import { Dribbble, Facebook, Linkedin, Twitter, ChevronDown } from "lucide-react"
import { useAuth } from "../../../Authentication/AuthProvider/AuthContext"
import useGetData from "../../../common/Hooks/useGetData"

export default function ProfileUpdate() {
      // Replace with actual user role from backend
    const {userAuth} = useAuth()
    const profilePic = userAuth?.profile_img || ""
    const name = userAuth?.name
    const token = userAuth?.token;
    const {userRole} = useGetData(token)
    console.log('====================================');
    console.log(userRole);
    console.log('====================================');
  const [activeTab, setActiveTab] = useState("personal")

  const TabButton = ({ id, label }: { id: string; label: string }) => (
    <button
      onClick={() => setActiveTab(id)}
      className={`py-2 px-4 text-sm font-medium rounded-lg transition-colors ${
        activeTab === id
          ? "bg-blue-600 text-white"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      {label}
    </button>
  )

  return (
    <div className="flex flex-col lg:flex-row gap-2">
      {/* Sidebar */}
      <div className="w-full lg:w-64 bg-white p-6 shadow-md">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-gray-300 mb-4 overflow-hidden">
            <img src={profilePic} alt="William Bond" className="w-full h-full object-cover" />
          </div>
          <h2 className="text-xl font-semibold">{userAuth?.name}</h2>
          <p className="text-sm text-gray-500">{userRole} 🚀</p>
          <p className="text-sm text-gray-500">{userAuth?.email} 🚀</p>
        </div>
        <div className="flex justify-center space-x-4 mb-6">
          {[Dribbble, Facebook, Twitter, Linkedin].map((Icon, index) => (
            <button key={index} className="text-gray-400 hover:text-gray-600" aria-label={Icon.name}>
              <Icon className="h-5 w-5" />
            </button>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-500 mb-6">
          {[
            { label: "Post", value: "86" },
            { label: "Products", value: "40" },
            { label: "Customer", value: "4.5K" },
          ].map(({ label, value }) => (
            <div key={label} className="text-center">
              <div className="font-semibold">{value}</div>
              <div>{label}</div>
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <TabButton id="personal" label="Personal Information" />
          <TabButton id="account" label="Account Information" />
          <TabButton id="password" label="Change Password" />
          <TabButton id="email" label="Email Settings" />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:p-6">
        {activeTab === "personal" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Personal Information</h2>
            <p className="text-gray-600 mb-6">Update your personal details here.</p>
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    defaultValue={name}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your country"
                  />
                </div>
                <div>
                  <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700 mb-1">
                    Zip Code
                  </label>
                  <input
                    type="text"
                    id="zipCode"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter your zip code"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  id="bio"
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Tell us about yourself"
                ></textarea>
              </div>
              <div>
                <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                  Profile Pic
                </label>
                <input
                    type="text"
                    id="imageInput"
                    defaultValue={profilePic}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="profile image"
                  />
                
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Changes
              </button>
            </form>
          </div>
        )}

        {activeTab === "account" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Account Information</h2>
            <p className="text-gray-600 mb-6">Manage your account settings.</p>
            <form className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your phone number"
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <input
                  type="text"
                  id="location"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your location"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Update Account
              </button>
            </form>
          </div>
        )}

        {activeTab === "password" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Change Password</h2>
            <p className="text-gray-600 mb-6">Update your password here.</p>
            <form className="space-y-4">
              <div>
                <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  id="currentPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter current password"
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  id="newPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter new password"
                />
              </div>
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Confirm new password"
                />
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Change Password
              </button>
            </form>
          </div>
        )}

        {activeTab === "email" && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-2xl font-bold mb-4">Email Settings</h2>
            <p className="text-gray-600 mb-6">Manage your email preferences.</p>
            <form className="space-y-4">
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="marketingEmails" className="rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="marketingEmails" className="text-sm text-gray-700">
                  Receive marketing emails
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="newsletterEmails" className="rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="newsletterEmails" className="text-sm text-gray-700">
                  Receive newsletter
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="checkbox" id="accountEmails" className="rounded text-blue-600 focus:ring-blue-500" />
                <label htmlFor="accountEmails" className="text-sm text-gray-700">
                  Receive account updates
                </label>
              </div>
              <button
                type="submit"
                className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Save Preferences
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}