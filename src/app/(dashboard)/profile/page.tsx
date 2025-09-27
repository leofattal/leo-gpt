import { ProfileSettings } from '@/components/auth/profile-settings'

export default function ProfilePage() {
  return (
    <div className="container max-w-2xl mx-auto p-6">
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <ProfileSettings />
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Profile - LeoGPT',
  description: 'Manage your profile settings',
}