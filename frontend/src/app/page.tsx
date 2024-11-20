'use client'

import React, { Suspense } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/navigation/Tabs"

// 컴포넌트들을 직접 import
import { ButtonsShowcase } from '@/components/pages/ButtonsShowcase'

export default function Page() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Component Showcase</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <Tabs defaultValue="buttons" className="w-full">
          <TabsList className="grid grid-cols-3 lg:grid-cols-9 mb-8">
            <TabsTrigger value="buttons">Buttons</TabsTrigger>
            <TabsTrigger value="charts">Charts</TabsTrigger>
            <TabsTrigger value="data-display">Data Display</TabsTrigger>
            <TabsTrigger value="feedback">Feedback</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
            <TabsTrigger value="inputs">Inputs</TabsTrigger>
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="navigation">Navigation</TabsTrigger>
            <TabsTrigger value="other">Other</TabsTrigger>
          </TabsList>
          <TabsContent value="buttons">
            <ButtonsShowcase />
          </TabsContent>
        </Tabs>
      </Suspense>
    </div>
  )
}