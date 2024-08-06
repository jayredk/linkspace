import { http, HttpResponse } from 'msw';

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT;

export const handlers = [
  http.get(`${API_ENDPOINT}/users/:userId/profile`, ({ params }) => {
    const { userId } = params;

    switch (userId) {
      case 'durayray': {
        const profile = {
          avatar:
            'https://img.portaly.cc/5m-nfNgxp5htRXAXdUp4SAIVgGc-qG8qJ0hiYRcELq4/rs:fill:640/q:75/aHR0cHM6Ly9maXJlYmFzZXN0b3JhZ2UuZ29vZ2xlYXBpcy5jb20vdjAvYi9wb3J0YWx5LWNhOWUxLmFwcHNwb3QuY29tL28vVUhpQlEwVTZJSlIwRHRWb2hIeTMlMkZhdmF0YXI_YWx0PW1lZGlhJnRva2VuPThlZjlkODAzLWQxOGUtNGM4Zi1iZmY3LWNlNTBmMDQwNzhhOA',
          email: 'durayray@gmail.com',
          name: '阿滴',
          description: '有妹妹然後教英文的那個',
          siteUrl: 'https://linkspace.com/durayray',
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

      default:
        break;
    }

    return HttpResponse.json({});
  }),
  
  http.get(`${API_ENDPOINT}/users/:userId/blockItems`, ({ params }) => {
    const { userId } = params;
    
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
        videoId: 'bQXLG1UNjdA',
        videoDescription:
                  ' 班機取消卡在非洲? 拍攝行程大亂! 肯亞航空給了我這輩子最雷的飛行體驗😍 ',
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

    switch (userId) {
      case 'durayray': {
        return HttpResponse.json({
          blockItems,
        });
      }

      default:
        break;
    }
  })
];
