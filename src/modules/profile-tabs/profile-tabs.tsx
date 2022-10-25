import createStore from '@/stores/store'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { FC } from 'react'
import CareerTab from './career-tab'
import EducationTab from './education-tab'
import GalleryTab from './gallery-tab'
import InformationTab from './information-tab'
import { ProfileTabsProps } from './profile-tabs.model'

const ProfileTabs: FC<ProfileTabsProps> = ({ data = null, loading }) => {
  return (
    <TabsPrimitive.Root
      defaultValue="information-tab"
      className="gap-16 flex flex-col"
    >
      <TabsPrimitive.List
        aria-label="Profile"
        className="border-b border-privblack-0 text-lg font-poppins font-medium text-privblack-0 overflow-y-auto whitespace-nowrap md:whitespace-normal"
      >
        <TabsPrimitive.Trigger
          data-testid="information-tab"
          value="information-tab"
          className="px-4 py-2 border-b-4  border-transparent radix-state-active:border-privgreen-500 radix-state-active:text-privgreen-500"
        >
          Information
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          data-testid="career-tab"
          value="career-tab"
          className="priv-tabs radix-state-active:text-privgreen-500"
        >
          Career
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          data-testid="education-tab"
          value="education-tab"
          className="priv-tabs radix-state-active:text-privgreen-500"
        >
          Education
        </TabsPrimitive.Trigger>
        <TabsPrimitive.Trigger
          data-testid="gallery-tab"
          value="gallery-tab"
          className="priv-tabs radix-state-active:text-privgreen-500"
        >
          Gallery
        </TabsPrimitive.Trigger>
      </TabsPrimitive.List>

      <TabsPrimitive.Content value="information-tab">
        <InformationTab loading={loading} data={data} />
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="career-tab">
        <CareerTab data={data?.career} loading={loading} />
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="education-tab">
        <EducationTab data={data?.education} loading={loading} />
      </TabsPrimitive.Content>
      <TabsPrimitive.Content value="gallery-tab">
        <GalleryTab />
      </TabsPrimitive.Content>
    </TabsPrimitive.Root>
  )
}

export default ProfileTabs
