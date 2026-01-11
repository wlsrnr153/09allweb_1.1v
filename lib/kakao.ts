// Kakao SDK Utility Functions

declare global {
  interface Window {
    Kakao: any;
  }
}

export const initKakao = () => {
  if (typeof window !== 'undefined' && window.Kakao && !window.Kakao.isInitialized()) {
    const kakaoAppKey = process.env.NEXT_PUBLIC_KAKAO_APP_KEY
    if (kakaoAppKey) {
      window.Kakao.init(kakaoAppKey)
      console.log('Kakao SDK initialized')
    } else {
      console.error('Kakao App Key is not defined')
    }
  }
}

export const openKakaoChannel = () => {
  if (typeof window !== 'undefined' && window.Kakao) {
    const channelId = process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID
    if (channelId) {
      window.Kakao.Channel.chat({
        channelPublicId: channelId,
      })
    } else {
      console.error('Kakao Channel ID is not defined')
    }
  }
}

export const openKakaoApp = (channelId?: string) => {
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  const finalChannelId = channelId || process.env.NEXT_PUBLIC_KAKAO_CHANNEL_ID

  if (!finalChannelId) {
    console.error('Kakao Channel ID is not defined')
    return
  }

  if (isMobile) {
    const kakaoUrl = `kakaoplus://plusfriend/talk/chat/${finalChannelId}`
    window.location.href = kakaoUrl

    // 앱이 없는 경우 웹 채팅으로 폴백
    setTimeout(() => {
      openKakaoChannel()
    }, 500)
  } else {
    openKakaoChannel()
  }
}

export const shareToKakao = (data: {
  title: string
  description: string
  imageUrl: string
  link: string
}) => {
  if (typeof window !== 'undefined' && window.Kakao) {
    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        link: {
          mobileWebUrl: data.link,
          webUrl: data.link,
        },
      },
      buttons: [
        {
          title: '자세히 보기',
          link: {
            mobileWebUrl: data.link,
            webUrl: data.link,
          },
        },
      ],
    })
  }
}

export const copyMessageToClipboard = (message: string) => {
  if (navigator.clipboard) {
    navigator.clipboard.writeText(message).then(() => {
      console.log('Message copied to clipboard')
    })
  }
}

