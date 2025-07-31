'use client'
import dynamic from 'next/dynamic'

const Dashboard = dynamic(() => import('@/components/dashboard').then(mod => mod.Dashboard), { ssr: false })

function ClientHome() {
  return <Dashboard />
}

export default function Home() {
  return <ClientHome />
}
