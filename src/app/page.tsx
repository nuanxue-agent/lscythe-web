import { getAllProjects } from '@/lib/content'
import HomePageClient from '@/components/layouts/HomePageClient'

export const metadata = {
  title: 'lscythe',
  description: 'Android engineer from Jakarta. Building mobile systems, KMP libraries, and developer tooling.',
}

export default function HomePage() {
  const featured = getAllProjects().filter(p => p.featured).slice(0, 3)
  return <HomePageClient featured={featured} />
}
