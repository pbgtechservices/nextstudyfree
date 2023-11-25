import { useEffect } from 'react'

const MetaTagsUpdater = () => {
  const fetchLatestTitle = async (url) => {
    try {
      const response = await fetch(url)
      const html = await response.text()
      const doc = new DOMParser().parseFromString(html, 'text/html')
      const latestTitle = doc.querySelector('title').textContent
      return latestTitle
    } catch (error) {
      console.error('Error fetching latest title:', error)
      return null
    }
  }

  useEffect(() => {
    const updateMetaTagsWithLatestTitle = async () => {
      const currentUrl = window.location.href
      const latestTitle = await fetchLatestTitle(currentUrl)
      const ogTitleTag = document.querySelector('meta[property="og:title"]')
      const twitterTitleTag = document.querySelector(
        'meta[name="twitter:title"]',
      )

      if (ogTitleTag) {
        ogTitleTag.content = latestTitle
      }

      if (twitterTitleTag) {
        twitterTitleTag.content = latestTitle
      }
    }

    document.addEventListener('DOMContentLoaded', updateMetaTagsWithLatestTitle)
    return () => {
      document.removeEventListener(
        'DOMContentLoaded',
        updateMetaTagsWithLatestTitle,
      )
    }
  }, [])

  return null // This component doesn't render anything
}

export default MetaTagsUpdater
