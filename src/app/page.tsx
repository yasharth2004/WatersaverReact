import dynamic from 'next/dynamic'

const EnhancedWaterSaverDashboard = dynamic(
  () => import('@/components/enhanced-water-saver-dashboard'),
  { ssr: false }
)

export default function Home() {
  return <EnhancedWaterSaverDashboard />
}