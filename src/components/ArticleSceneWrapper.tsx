'use client'

import dynamic from 'next/dynamic'
import { pickScene, SceneType } from './ArticleScene'

const ArticleScene = dynamic(() => import('./ArticleScene'), { ssr: false })

interface Props {
  slug: string
  sceneOverride?: SceneType
}

export default function ArticleSceneWrapper({ slug, sceneOverride }: Props) {
  const scene = sceneOverride ?? pickScene(slug)
  return <ArticleScene scene={scene} />
}
