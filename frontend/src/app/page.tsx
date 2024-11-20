'use client'

import React from 'react'
import { Button } from '@/components/ui/buttons/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/layout/Card'
import { Navbar } from '@/components/ui/navigation/Navbar'
import { Container } from '@/components/ui/layout/Container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/navigation/Tabs'
import { Input } from '@/components/ui/inputs/Input'
import { Badge } from '@/components/ui/data-display/Badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/data-display/Avatar'
import { AreaChart } from '@/components/ui/charts/AreaChart'
import { Progress } from '@/components/ui/feedback/Progress'
import { ThemeToggle } from '@/components/ui/theme/ThemeToggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar className="border-b">
        <Container>
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold">UI Showcase</h1>
            <div className="flex items-center space-x-4">
              <Button variant="ghost">Features</Button>
              <Button variant="ghost">Pricing</Button>
              <Button variant="ghost">About</Button>
              <ThemeToggle />
            </div>
          </div>
        </Container>
      </Navbar>

      <Container>
        <section className="py-20 text-center">
          <h2 className="text-4xl font-bold mb-4">Build Beautiful Interfaces</h2>
          <p className="text-xl mb-8">Showcase your product with our stunning UI components</p>
          <div className="flex justify-center space-x-4">
            <Button size="lg">Get Started</Button>
            <Button size="lg" variant="outline">Learn More</Button>
          </div>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold mb-8 text-center">Featured Components</h3>
          <Tabs defaultValue="tab1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="tab1">Charts</TabsTrigger>
              <TabsTrigger value="tab2">Forms</TabsTrigger>
              <TabsTrigger value="tab3">Data Display</TabsTrigger>
            </TabsList>
            <TabsContent value="tab1">
              <Card>
                <CardHeader>
                  <CardTitle>Area Chart</CardTitle>
                  <CardDescription>Visualize your data with smooth area charts</CardDescription>
                </CardHeader>
                <CardContent>
                  <AreaChart 
                    data={[
                      { name: 'Jan', value: 400 },
                      { name: 'Feb', value: 300 },
                      { name: 'Mar', value: 500 },
                      { name: 'Apr', value: 200 },
                      { name: 'May', value: 600 },
                    ]} 
                    xAxisKey="name"
                    yAxisKey="value"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab2">
              <Card>
                <CardHeader>
                  <CardTitle>Login Form</CardTitle>
                  <CardDescription>Secure and stylish login forms</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Input placeholder="Email" type="email" />
                  <Input placeholder="Password" type="password" />
                  <Button className="w-full">Log In</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="tab3">
              <Card>
                <CardHeader>
                  <CardTitle>User List</CardTitle>
                  <CardDescription>Display user information elegantly</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Alice', 'Bob', 'Charlie'].map((name) => (
                      <div key={name} className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${name}`} alt={name} />
                          <AvatarFallback>{name[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{name}</p>
                          <p className="text-sm text-muted-foreground">user@example.com</p>
                        </div>
                        <Badge>Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold mb-8 text-center">Pricing Plans</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {['Basic', 'Pro', 'Enterprise'].map((plan) => (
              <Card key={plan}>
                <CardHeader>
                  <CardTitle>{plan}</CardTitle>
                  <CardDescription>Perfect for {plan.toLowerCase()} users</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl font-bold mb-4">${plan === 'Basic' ? '9' : plan === 'Pro' ? '29' : '99'}<span className="text-sm font-normal">/month</span></p>
                  <ul className="space-y-2">
                    <li>Feature 1</li>
                    <li>Feature 2</li>
                    <li>Feature 3</li>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Choose {plan}</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold mb-8 text-center">What Our Customers Say</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { name: 'John Doe', role: 'CEO', comment: 'This UI library has transformed our product development process.' },
              { name: 'Jane Smith', role: 'Designer', comment: 'The components are not only beautiful but also highly customizable.' }
            ].map((testimonial) => (
              <Card key={testimonial.name}>
                <CardContent className="pt-6">
                  <p className="mb-4">"{testimonial.comment}"</p>
                  <div className="flex items-center">
                    <Avatar className="mr-4">
                      <AvatarImage src={`https://api.dicebear.com/6.x/initials/svg?seed=${testimonial.name}`} alt={testimonial.name} />
                      <AvatarFallback>{testimonial.name[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-20">
          <h3 className="text-3xl font-bold mb-8 text-center">Ready to Get Started?</h3>
          <div className="text-center">
            <p className="text-xl mb-8">Join thousands of satisfied customers and elevate your UI today</p>
            <Progress value={75} className="w-full max-w-md mx-auto mb-4" />
            <p className="mb-8">Over 75% of our free trial users upgrade to a paid plan</p>
            <Button size="lg">Start Free Trial</Button>
          </div>
        </section>
      </Container>

      <footer className="bg-muted mt-20">
        <Container>
          <div className="py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Features</a></li>
                <li><a href="#" className="hover:underline">Pricing</a></li>
                <li><a href="#" className="hover:underline">Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">About</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Resources</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Community</a></li>
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Partners</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Privacy</a></li>
                <li><a href="#" className="hover:underline">Terms</a></li>
                <li><a href="#" className="hover:underline">Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="py-6 text-center border-t">
            <p>&copy; 2024 UI Showcase. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}