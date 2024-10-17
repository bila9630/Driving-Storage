'use client'

import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Edit, Save } from "lucide-react"

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = React.useState(false)
  const [userData, setUserData] = React.useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'I\'m a passionate V2G driver, always looking for efficient routes and ways to contribute to a greener future.',
  })

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    setIsEditing(false)
    // TODO: Implement API call to save user data
    console.log('Saving user data:', userData)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setUserData(prevData => ({ ...prevData, [name]: value }))
  }

  return (
    <div className="container mx-auto p-6">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="User avatar" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{userData.name}</CardTitle>
              <CardDescription>{userData.email}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={userData.bio}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          {isEditing ? (
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" /> Save Changes
            </Button>
          ) : (
            <Button onClick={handleEdit}>
              <Edit className="mr-2 h-4 w-4" /> Edit Profile
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProfilePage

