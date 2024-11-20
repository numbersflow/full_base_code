'use client'

import React, { useState } from 'react'  // useState import 추가
import { Button } from '@/components/ui/buttons/Button'
import { ButtonGroup } from '@/components/ui/buttons/ButtonGroup'
import { DropdownButton } from '@/components/ui/buttons/DropdownButton'
import { FloatingButton } from '@/components/ui/buttons/FloatingButton'
import { IconButton } from '@/components/ui/buttons/IconButton'
import { ToggleButton } from '@/components/ui/buttons/ToggleButton'
import { Plus, Bell, Menu } from 'lucide-react'

export function ButtonsShowcase() {
  // 토글 버튼 상태 추가
  const [isToggled1, setIsToggled1] = useState(false)
  const [isToggled2, setIsToggled2] = useState(false)

  // 드롭다운 메뉴 아이템
  const dropdownItems = [
    { label: '메뉴 1', onClick: () => console.log('메뉴 1 클릭') },
    { label: '메뉴 2', onClick: () => console.log('메뉴 2 클릭') },
    { label: '메뉴 3', onClick: () => console.log('메뉴 3 클릭') },
  ]

  return (
    <div className="space-y-8">
      {/* 기본 버튼 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Button Variants</h2>
        <div className="flex flex-wrap gap-4">
          <Button variant="default">Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </section>

      {/* 버튼 그룹 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Button Group</h2>
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Middle</Button>
          <Button>Right</Button>
        </ButtonGroup>
      </section>

      {/* 드롭다운 버튼 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Dropdown Button</h2>
        <DropdownButton items={dropdownItems}>
          Dropdown
        </DropdownButton>
      </section>

        {/* 플로팅 버튼 */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Floating Button</h2>
            <div className="relative h-[200px] border rounded-lg">
                <FloatingButton 
                onClick={() => console.log('Default FAB clicked')} 
                position="bottom-right"
                />
                <FloatingButton 
                variant="secondary"
                size="sm"
                position="top-right"
                icon={<Bell className="h-4 w-4" />}
                onClick={() => console.log('Secondary FAB clicked')} 
                />
                <FloatingButton 
                variant="success"
                position="bottom-left"
                icon={<Plus className="h-6 w-6" />}
                onClick={() => console.log('Success FAB clicked')} 
                />
        </div>
        </section>

      {/* 아이콘 버튼 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Icon Button</h2>
        <div className="flex gap-4">
          <IconButton icon={<Bell />} onClick={() => console.log('Bell clicked')} />
          <IconButton icon={<Menu />} onClick={() => console.log('Menu clicked')} />
        </div>
      </section>

      {/* 토글 버튼 */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Toggle Button</h2>
        <div className="space-y-4 max-w-md">
          <ToggleButton
            variant="default"
            pressed={isToggled1}
            onPressedChange={setIsToggled1}
            content={
              <div className="space-y-2">
                <p>토글된 내용이 여기에 표시됩니다.</p>
                <p>여러 줄의 내용을 포함할 수 있습니다.</p>
              </div>
            }
          >
            기본 토글 버튼
          </ToggleButton>

          <ToggleButton
            variant="outline"
            pressed={isToggled2}
            onPressedChange={setIsToggled2}
            content={
              <div className="space-y-2">
                <p>다른 스타일의 토글 버튼입니다.</p>
                <p>클릭하면 내용이 표시됩니다.</p>
              </div>
            }
          >
            아웃라인 토글 버튼
          </ToggleButton>
        </div>
      </section>
    </div>
  )
}