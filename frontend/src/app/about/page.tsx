import React from 'react'
import { Container } from '@/components/ui/layout/Container'
import { Card, CardContent } from '@/components/ui/layout/Card'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/data-display/Avatar'

export default function Page() {
  const team = [
    { name: 'John Doe', role: 'Founder & CEO', bio: 'Passionate about creating beautiful and functional UIs.' },
    { name: 'Jane Smith', role: 'Lead Designer', bio: 'Bringing user-centered design principles to every project.' },
    { name: 'Mike Johnson', role: 'Senior Developer', bio: 'Turning design concepts into reality with clean, efficient code.' },
  ]

  return (
    <Container>
      <h1 className="text-4xl font-bold text-center my-10">About Us</h1>
      <Card className="mb-10">
        <CardContent className="prose max-w-none p-6">
          <p>
            At UI Showcase, we're passionate about creating beautiful, functional, and accessible user interfaces. 
            Our mission is to empower developers and designers with a comprehensive set of UI components that can 
            be easily customized to fit any project's needs.
          </p>
          <p>
            Founded in 2020, we've grown from a small team of enthusiasts to a thriving community of developers, 
            designers, and UI/UX experts. Our components are used by thousands of developers worldwide, powering 
            websites and applications across various industries.
          </p>
          <p>
            We believe in the power of open-source and continually strive to give back to the community that has 
            supported us. That's why we maintain a free tier of our component library and actively contribute to 
            other open-source projects in the UI/UX space.
          </p>
        </CardContent>
      </Card>
      <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
      <div className="grid md:grid-cols-3 gap-6">
        {team.map((member) => (
          <Card key={member.name}>
            <CardContent className="flex flex-col items-center text-center p-6">
              <Avatar className="w-24 h-24 mb-4">
                <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${member.name}`} alt={member.name} />
                <AvatarFallback>{member.name[0]}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-bold">{member.name}</h3>
              <p className="text-sm text-muted-foreground mb-2">{member.role}</p>
              <p>{member.bio}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </Container>
  )
}