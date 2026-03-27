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

    // ?깆씠 ?녿뒗 寃쎌슦 ??梨꾪똿?쇰줈 ?대갚
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
          title: '?먯꽭??蹂닿린',
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

/**
 * 移댁뭅?ㅽ넚 ?ㅽ뵂 梨꾪똿諛??닿린
 * ?섍꼍 蹂?섏뿉 NEXT_PUBLIC_KAKAO_OPEN_CHAT_LINK媛 ?ㅼ젙?섏뼱 ?덉쑝硫??ъ슜?섍퀬,
 * ?놁쑝硫?湲곕낯 留곹겕(https://open.kakao.com/o/sgiKk1Uh)瑜??ъ슜?⑸땲??
 */
export const openKakaoOpenChat = () => {
  const openChatLink = process.env.NEXT_PUBLIC_KAKAO_OPEN_CHAT_LINK || 'https://open.kakao.com/o/sgiKk1Uh'
  
  if (typeof window === 'undefined') {
    return
  }

  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  
  if (isMobile) {
    // 紐⑤컮?? 移댁뭅?ㅽ넚 ?깆씠 ?ㅼ튂?섏뼱 ?덉쑝硫??깆쑝濡??닿린 ?쒕룄
    // ?ㅽ뵂 梨꾪똿諛⑹? 吏곸젒 留곹겕瑜??ъ슜?섎뒗 寃껋씠 媛???덉젙??    window.open(openChatLink, '_blank')
  } else {
    // ?곗뒪?ы넲: ????뿉???닿린
    window.open(openChatLink, '_blank')
  }
}