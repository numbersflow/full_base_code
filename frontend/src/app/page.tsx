import React from 'react'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/buttons/Button'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/layout/Card'
import { Container } from '@/components/ui/layout/Container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/navigation/Tabs'
import { Input } from '@/components/ui/inputs/Input'
import { Badge } from '@/components/ui/data-display/Badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/data-display/Avatar'
import { AreaChart } from '@/components/ui/charts/AreaChart'
import { Progress } from '@/components/ui/feedback/Progress'

export default function Home() {
  return (
    <Layout>
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
          <h3 className="text-3xl font-bold mb-8 text-center">Ready to Get Started?</h3>
          <div className="text-center">
            <p className="text-xl mb-8">Join thousands of satisfied customers and elevate your UI today</p>
            <Progress value={75} className="w-full max-w-md mx-auto mb-4" />
            <p className="mb-8">Over 75% of our free trial users upgrade to a paid plan</p>
            <Button size="lg">Start Free Trial</Button>
          </div>
        </section>
      </Container>
    </Layout>
  )
}