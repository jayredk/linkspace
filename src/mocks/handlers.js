import { http, HttpResponse } from 'msw';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const handlers = [
  http.get(`${API_ENDPOINT}/users/:userId/profile`, ({ params }) => {
    const { userId } = params;

    switch (userId) {
      case 'durayray': {
        const profile = {
          avatar:
            'https://yt3.googleusercontent.com/ytc/AIdro_mtdkYT4SQDLrtDLcZDLTjox4gC2-_4YctZk-cvZ3GKMh4=s160-c-k-c0x00ffffff-no-rj',
          email: 'durayray@gmail.com',
          name: '阿滴',
          description: '有妹妹然後教英文的那個',
          siteUrl: 'https://linkspace.com/durayray',
          bgColor: 'white',
          textColor: 'black',
          themeColor: 'purple',
          links: [
            {
              icon: 'facebook',
              text: 'Facebook',
              url: 'https://www.facebook.com/RayDuEnglish',
            },
            {
              icon: 'instagram',
              text: 'Instagram',
              url: 'https://www.instagram.com/rayduenglish/',
            },
            {
              icon: 'twitter',
              text: 'Twitter',
              url: 'https://twitter.com/durayray',
            },
          ],
        };

        return HttpResponse.json({
          profile,
        });
      }

      case 'briantseng': {
        const profile = {
          avatar:
            'https://img.portaly.cc/VD4pZA0y7KZWZLMk7mNWUWzoM858xvOcd-34xrys8lk/rs:fill:640/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vbUhPUDhraHdiQ2t3eUVUUUhrdzElMkZhdmF0YXI_YWx0PW1lZGlhJnRva2VuPTBkNGQ4MzBjLTVkOTgtNGJjOS04YjBmLWZhZmYwNjg2MjFkYg',
          email: 'briantseng@gmail.com',
          name: '曾博恩 Brian Tseng',
          description: `薩泰爾娛樂 內容長｜單口喜劇演員
三重標準 講師｜ Podcast #博音`,
          siteUrl: 'https://linkspace.com/briantseng',
          bgColor: 'black',
          textColor: 'white',
          themeColor: 'blue',
          links: [
            {
              icon: 'facebook',
              text: 'Facebook',
              url: 'https://www.facebook.com/brianstandup',
            },
            {
              icon: 'youtube',
              text: 'Youtube',
              url: 'https://www.youtube.com/@brianptseng',
            },
            {
              icon: 'instagram',
              text: 'Instagram',
              url: 'https://www.instagram.com/brianptseng/',
            },
            {
              icon: 'threads',
              text: 'Threads',
              url: 'https://www.threads.net/@brianptseng',
            },
            {
              icon: 'podcast',
              text: 'Apple Podcast',
              url: 'https://open.firstory.me/user/brian/platforms',
            },
            {
              icon: 'website',
              text: '官方網站',
              url: 'https://content.strnetwork.cc/',
            },
          ],
        };

        return HttpResponse.json({
          profile,
        });
      }

      default:
        return HttpResponse.json({});
    }

    
  }),
  
  http.get(`${API_ENDPOINT}/users/:userId/blockItems`, ({ params }) => {
    const { userId } = params;
    
    

    
    switch (userId) {
      case 'durayray': {
        const blockItems = [
          {
            id: 1,
            type: 'text-button',
            isSolid: true,
            hasSubtitle: false,
            fontSize: 'sm',
            buttons: [
              {
                effect: 'wobble',
                text: '訂閱阿滴',
                subText: 'hello',
                icon: 'youtube',
                linkUrl:
                  'https://www.youtube.com/@rayduenglish/featured?sub_confirmation=1',
              },
            ],
          },
          {
            id: 2,
            type: 'video-player',
            videoUrl: 'https://www.youtube.com/watch?v=UNMsCRx3WDk',
            videoDescription: '我這輩子喝到最貴的珍奶居然在肯亞',
          },
          {
            id: 3,
            type: 'double-square-board',
            blocks: [
              {
                imageUrl:
                  'https://img.portaly.cc/qHx90MonPTYB1p1VfDPAHttiyLUTW4PEKPf-Hhf84pw/rs:fill:1080/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vVUhpQlEwVTZJSlIwRHRWb2hIeTMlMkZibG9ja3MlMkZGWmZ6anZFR2s2SGlVT01XeWlWTiUyRml0ZW1NYXAuLXVTQTNHQklxYlhXaXdBNDZadEZMLmltYWdlP2FsdD1tZWRpYSZ0b2tlbj0wMjQzNGIzOC1lN2RiLTRjMzUtODY1NS02YmYwODkzNDUzOTM',
                text: '阿滴英文 YT',
                linkUrl: 'https://www.youtube.com/@rayduenglish/featured',
              },
              {
                imageUrl:
                  'https://img.portaly.cc/GRody5jF4DKi9XYBqU_YK7oYQSuPRr_UKO_CP0NUeIo/rs:fill:1080/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vVUhpQlEwVTZJSlIwRHRWb2hIeTMlMkZibG9ja3MlMkZGWmZ6anZFR2s2SGlVT01XeWlWTiUyRml0ZW1NYXAueEJYWG84eWJ1RVBZME9IaHJkUW1FLmltYWdlP2FsdD1tZWRpYSZ0b2tlbj0yNjA5NmE4Zi1lZjAzLTQ1N2ItYTQ3NC0xMWM4NDYzMzUyZjE',
                text: '阿滴日常 YT',
                linkUrl:
                  'https://www.youtube.com/channel/UCL--AnIMxQQdbcH4ESEK0Iw/videos',
              },
            ],
          },
          {
            id: 4,
            type: 'text-button',
            isSolid: false,
            hasSubtitle: true,
            fontSize: 'sm',
            buttons: [
              {
                effect: 'none',
                text: '阿滴的IG',
                subText: '有妹妹然後教英文的那個🙋🏻‍♂️',
                icon: 'instagram',
                linkUrl: 'https://www.instagram.com/rayduenglish/',
              },
              {
                effect: 'none',
                text: '阿滴的日常IG',
                subText: '比較多日常廢文那個',
                icon: 'instagram',
                linkUrl: 'https://www.instagram.com/raydudaily/',
              },
              {
                effect: 'none',
                text: '阿滴英文Facebook粉專',
                subText: '',
                icon: 'facebook',
                linkUrl: 'https://www.facebook.com/RayDuEnglish',
              },
              {
                effect: 'none',
                text: '阿滴個人Facebook帳號',
                subText: '',
                icon: 'facebook',
                linkUrl: 'https://www.facebook.com/durayray',
              },
            ],
          },
        ];

        return HttpResponse.json({
          blockItems,
        });
      }

      case 'briantseng': {
        const blockItems = [
          {
            id: 1,
            type: 'square-board',
            blocks: [
              {
                imageUrl:
                  'https://img.portaly.cc/CQaH7T5Ev7-HnJjWCPnWciJF0-LjiCQlDy68pyzIXcw/rs:fill:2048/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vbUhPUDhraHdiQ2t3eUVUUUhrdzElMkZibG9ja3MlMkZWTG1PUjJndUEyczR0bERoZlMzMCUyRml0ZW1NYXAuYUZVTml5NE52dUNZTkFtRTE2dzRFLmltYWdlP2FsdD1tZWRpYSZ0b2tlbj0zZWMzNjlkYi04NGU5LTQ0YzgtYmRiYi04YjZkOWEyZTRhM2Y',
                text: '2024賀博台瘋單口喜劇世界巡演首爾站',
                linkUrl: 'https://str.network/2024KR',
              },
            ],
          },
          {
            id: 2,
            type: 'text-button',
            isSolid: false,
            hasSubtitle: false,
            fontSize: 'sm',
            buttons: [
              {
                effect: 'pulse',
                text: '訂閱巡迴場開賣通知 🎫',
                subText: '',
                icon: 'pin',
                linkUrl: 'https://str.network/rnbrian',
              },
              {
                effect: 'none',
                text: '8月25日 登陸首爾 🇰🇷',
                subText: '',
                icon: 'pin',
                linkUrl: 'https://str.network/2024KR',
              },
              {
                effect: 'none',
                text: '10月6日 登陸吉隆坡 🇲🇾',
                subText: '',
                icon: 'pin',
                linkUrl: 'https://str.network/2024KL',
              },
              {
                effect: 'none',
                text: '10月9日 登陸檳城 🇲🇾',
                subText: '',
                icon: 'pin',
                linkUrl: 'https://str.network/2024PG',
              },
              {
                effect: 'none',
                text: '搶先預購線上版 🌀',
                subText: '',
                icon: 'pin',
                linkUrl: 'https://str.network/ythQ6',
              },
              {
                effect: 'none',
                text: '巡迴資訊一次看 🚩',
                subText: '',
                icon: 'send',
                linkUrl: 'https://str.network/2024TOUR',
              },
              {
                effect: 'none',
                text: '世界巡迴登陸地圖 🗺️',
                subText: '',
                icon: 'website',
                linkUrl: 'https://str.network/2024MAPS',
              },
            ],
          },
          {
            id: 3,
            type: 'square-board',
            blocks: [
              {
                imageUrl:
                  'https://img.portaly.cc/qKdAjkbRVZYzxTX6YLgXVAJzaIzgQZnMOkRdCZVID34/rs:fill:2048/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vbUhPUDhraHdiQ2t3eUVUUUhrdzElMkZibG9ja3MlMkZHWnRTeGdCUkx5ekFKR2FORHJxaCUyRml0ZW1NYXAuV1ZjcHltbm55Sk5uTnZqWW1BaFdsLmltYWdlP2FsdD1tZWRpYSZ0b2tlbj1kMDRjMjQ3MC0zYTI5LTQ1M2MtYjdhMC05NmFjZjk0YjBmZDI',
                text: '奧德後背包',
                linkUrl:
                  'https://www.robinmaybag.com/pages/co-branded-rm-x-standupbrian?utm_source=KOL&utm_medium=brianptseng_igs&utm_campaign=rm-x-standupbrian',
              },
            ],
          },
          {
            id: 4,
            type: 'text-button',
            isSolid: false,
            hasSubtitle: true,
            fontSize: 'sm',
            buttons: [
              {
                effect: 'none',
                text: 'YouTube 新頻道✨',
                subText: '馬上訂閱 🔔',
                icon: 'youtube',
                linkUrl: 'https://www.youtube.com/@brianptseng',
              },
              {
                effect: 'pulse',
                text: '訂閱博恩最新消息 🔔',
                subText: '',
                icon: 'bell',
                linkUrl: 'https://str.network/rnbrian',
              },
            ],
          },
          {
            id: 5,
            type: 'video-player',
            videoUrl: 'https://www.youtube.com/watch?v=8WlSlkw2JCo',
            videoDescription: '【#初識啦阿博】EP2｜跨性別者 ft. 愛里',
          },
          {
            id: 6,
            type: 'video-player',
            videoUrl: 'https://www.youtube.com/watch?v=ZSfiWjFjXdE',
            videoDescription:
              ' 【#博音】 EP133 | 處事圓滑反而得罪人 ft. 黃豪平 ',
          },
          {
            id: 7,
            type: 'banner-board',
            blocks: [
              {
                imageUrl:
                  'https://img.portaly.cc/83kKXTQuIb0aZpbAQOJqwhXy-HAPyKIppzcdcqslRB0/rs:fill:2048/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vbUhPUDhraHdiQ2t3eUVUUUhrdzElMkZibG9ja3MlMkZaQzRMdWJxYzVIalNBYjROUHdBUCUyRml0ZW1NYXAudTdrd0c3cUYxNVlhQV9BaEJzemE4LmltYWdlP2FsdD1tZWRpYSZ0b2tlbj1hOWMyNGEzYy1lMTk3LTQ4MGEtOWZkYi01M2Q5MjQ4NTFlYjc',
                text: '2023 曾博恩世界巡迴《破蛋者》BALLBREAKER',
                linkUrl: 'https://content.strnetwork.cc/courses/ballbreaker',
              },
            ],
          },
        ];

        return HttpResponse.json({
          blockItems,
        });
      }

      default:
        break;
    }
  }),
  
  // http.get('*', (req, res, ctx) => {
  //   // 使用正則表達式檢查請求是否為靜態資源
  //   const staticResourceRegex = /\.(png|jpg|jpeg|gif|svg|css|js)$/;
  //   if (staticResourceRegex.test(req.url.pathname)) {
  //     return req.passthrough(); // 讓靜態資源的請求繞過 MSW 攔截
  //   }

  //   // 模擬其他 API 請求
  //   return res(
  //     ctx.status(200),
  //     ctx.json({ message: 'Mocked API response' })
  //   );
  // })
];
