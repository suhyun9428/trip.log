import { useState } from 'react';
import { useAtom } from 'jotai';
import { activeTabIndex } from './atom/atom';
import Popup from './Popup';
import styles from '../css/timeline.module.css';
import { Clock3, MapPin } from 'lucide-react';

const tabData = [
  {
    title: '🍚 맛집',
    id: 'panel01',
    list: [
      {
        id: 'jeokdeok',
        name: '적덕식당',
        img: 'https://ldb-phinf.pstatic.net/20260305_170/1772688190659gfV98_JPEG/IMG_7998.jpeg',
        address: '대전 동구 우암로 220-3',
        description: '두부 오징어 두루치기, 밥보다 사리 추천, 전현무계획',
      },
      {
        id: 'sigolgil',
        name: '시골길 내륙본점',
        img: 'https://imagefarm.baemin.com/smartmenuimage/upload/image/2023/10/4/ybfcLoKOHUMOoImAHQzGtXLEO2XUbNMWiIAGO03GipmuUzme3rdX7ScJPsMrW-ITyHpBA74N3XFNyPGMK_nXlkhZqjwx8y8GbA0_cD3HH4g=.jpg',
        address: '대전 서구 둔산로31번길 61',
        description: '매운 낙지볶음집',
      },
      {
        id: 'sindo',
        name: '신도칼국수',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjA1MTdfMTcy%2FMDAxNzc5MDExNDI2MDI0.8VesImT8ysm4S7M4nqCvlqwC4nx2V13N6qTWhhz__DEg.ez8OMHgCgERsZFQNUyO9vNqk-aO2PiDoArdlBhSUuCwg.JPEG%2FE3A43D2D-FDD5-4E3A-B068-48355DB617AF.jpeg%3Ftype%3Dw1500_60_sharpen',
        address: '대전 동구 대전로825번길 11',
        description: null,
      },
      {
        id: 'sinseon',
        name: '신선칼국수',
        img: 'https://ldb-phinf.pstatic.net/20200411_293/1586603262800nxhrG_JPEG/GaqgTtv1T27nxlxnYwb9MO63.jpg',
        address: '대전 동구 계족로 188',
        description: '물총조개칼국수, 감자전',
      },
      {
        id: 'moseon',
        name: '모선',
        img: 'https://ldb-phinf.pstatic.net/20241220_242/1734668125802LULGt_JPEG/0A8D4712-DA45-4CAE-97D6-3234BE81293E.jpeg',
        address: '대전 계룡로585번길 24',
        description: null,
      },
      {
        id: 'sushikitto',
        name: '스시킷도',
        img: 'https://ldb-phinf.pstatic.net/20250829_89/1756473584455Wbd5A_JPEG/KakaoTalk_20250829_221443408_02.jpg',
        address: '대전 중구 중앙로112번길 42',
        description: null,
      },
      {
        id: 'chomidan',
        name: '초미당 세번째',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjA5MTNfOTQg%2FMDAxNzg5MjkyNTMwMjUz.LmXkW6LbX7pRatB7K4s-7Fhl-SoHlAI4zSbXD854n_og.FBBq1WYho7QGZ01UnoPvT0XeJPlnUT5dTRmQCgKms1kg.JPEG%2F20260913_183652.jpg.jpg%3Ftype%3Dw1500_60_sharpen',
        address: '대전 동구 백룡로 32-1',
        description: '깔끔한 매장 분위기',
      },
      {
        id: 'ogoya',
        name: '오고야',
        img: 'https://imagefarm.baemin.com/smartmenuimage/upload/image/2026/4/16/tnUfmrEMPxrgRIzIECLX3dnIJyjcCgVesiafrx0j8m2aNInDF2Cmh18tZjY5HHeo7TEW_W0T0KvJDfFaydOLcw==.jpg',
        address: '대전 동구 백룡로11번길 148',
        description: '웨이팅 있음',
      },
      {
        id: 'bongsan',
        name: '봉산순대국밥',
        img: 'https://ldb-phinf.pstatic.net/20250402_4/1743580178699EQ71p_PNG/1000020331.png',
        address: '대전 유성구 봉산로40번길 24',
        description: '24시간 끓인 사골로 만드는 순대국밥',
      },
      {
        id: 'cheonrijip',
        name: '천리집',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjA5MjFfMjc1%2FMDAxNzg5OTQ0Nzc2NTc0.oY_NMGpd_JamsmaqnmOFt2AAQwgjzW_S5EDcV7RoQYsg.oBCfmynxVhJoBA059Hc5Y32zCAG7wkJ9aF-N0QSXQbQg.JPEG%2F10D2233A-0F1F-4950-9D59-1B809736C69F.jpeg%3Ftype%3Dw1500_60_sharpen',
        address: '대전 유성구 신성남로 127',
        description: '순대를 직접 만드는 순대국밥',
      },
      {
        id: 'nongmin',
        name: '농민순대',
        img: 'https://pup-review-phinf.pstatic.net/MjAyNjA5MTFfMTk4/MDAxNzg5MDk2NzI5NzM1.S9VmHiFCWtViUbPLXEvG83KDmP-K995qysNMFIoOYZgg.pY7YidZZaiO-JjkCNuIAqLgkDMEePNQ4aEnO14ihN0Qg.JPEG/1000121829.jpg.jpg?type=w1500_60_sharpen',
        address: '대전 중구 충무로 138',
        description: '맛있고 가성비 높은 국밥집',
      },
      {
        id: 'omunchang',
        name: '오문창순대국밥',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyNjA4MDRfMjg3%2FMDAxNzg1ODM0MTM2Njg0.L2Nb2iw2EAAe-DULcB_yY-ED_RgxTuNvwayLBFZsHGkg.2D_elYftEY8qTWbxQoH5zSfRH016a_fUfpFNZNWRbowg.JPEG%2F0C54B830-3E1E-4CAB-A6B2-C0F399FE290B.jpeg%3Ftype%3Dw1500_60_sharpen',
        address: '대전 대덕구 한밭대로 1153',
        description: null,
      },
      {
        id: 'katsugomei',
        name: '카츠고메이',
        img: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250812_92%2F1754982496209bxzQo_JPEG%2FIMG_0131.jpeg',
        address: '대전 서구 문정로48번길 52',
        description: '120시간 이상 숙성시킨 1등급 한돈 돈까스',
      },
      {
        id: 'kaiteki',
        name: '카이테키',
        img: 'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250225_261%2F1740442407751tS5wS_JPEG%2FIMG_1210.jpeg',
        address: '대전 서구 계룡로491번길 82',
        description: null,
      },
      {
        id: 'amazing-katsu',
        name: '어메이징카츠',
        img: 'https://ldb-phinf.pstatic.net/20211118_276/1637211781288aqSiT_JPEG/D93675F7-2779-4854-842D-520F0343B6F4.jpeg',
        address: '대전 서구 둔산로 74번길 12',
        description: '360시간 교차 숙성한 돈카츠',
      },
      {
        id: 'sungbul-katsu',
        name: '숯불돈까스',
        img: 'https://ldb-phinf.pstatic.net/20220208_241/1644248876076COGve_JPEG/8FFEB535-F760-49E1-9BE8-4A88884D0B02.jpeg',
        address: '대전 서구 문정로 82',
        description:
          '최고급 한돈을 항아리에 300시간 저온숙성하여 만드는 돈까스',
      },
    ],
  },
  {
    title: '🥐 빵집·카페',
    id: 'panel02',
    list: [
      {
        id: 'jeongdong',
        name: '정동문화사',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20220718_19%2F1658144842098Ct0Jg_JPEG%2FA63099FF-D289-4886-BF2D-3653AC485624.jpeg',
        address: '대전 동구 창조2길 11',
        description: '구움과자류 - 에그타르트, 휘낭시에, 까눌레',
      },
      {
        id: 'kua',
        name: '쿠아',
        img: 'https://ldb-phinf.pstatic.net/20221109_100/1667963525363evT07_JPEG/may-pha-staresso-01_1dc95878ac7f4dc485cf4e194eb3a915_master.jpg',
        address: '대전 유성구 신성로61번안길 53 1층',
        description: '과학 테마 카페',
      },
      {
        id: 'cold-butter',
        name: '콜드버터베이크샵',
        img: 'https://ldb-phinf.pstatic.net/20230824_255/1692883549957MySRu_JPEG/D2FF22DC-82A8-4C78-ABB2-A06BB8E0AA4B.jpeg',
        address: '대전 중구 중앙로112번길 37',
        description: '소금빵 맛집',
      },
      {
        id: 'mongshim',
        name: '몽심',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240212_12%2F1707704697875KItvX_JPEG%2FIMG_5105.jpeg',
        address: '대전 대덕구 한남로38번길 28',
        description: '대전 빵축제 1위',
      },
    ],
  },
  {
    title: '📍 명소',
    id: 'panel03',
    list: [
      {
        id: 'kkumdol-house',
        name: '꿈돌이 하우스 2호',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20250810_251%2F1754802357318bPCUJ_JPEG%2FKakaoTalk_20250810_135744580.jpg',
        address: '대전 유성구 대덕대로 480 1-2층',
        description: null,
      },
      {
        id: 'sangsodong',
        name: '상소동산림욕장',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fblogfiles.pstatic.net%2FMjAyNjA5MjZfMTQz%2FMDAxNzkwMzk4NTgyOTcz.3mZZgl23XebvE196ud2Y4Z8JsBkdMLSocG4atWc-Dgsg.d7QZWex3acgccKqH0oEgyi_AyyTEVgQjvIn6hvKTeU0g.JPEG%2FKakaoTalk_20260923_210837239_23.jpg%2F1440x1081',
        address: '대전 동구 산내로 714',
        description: null,
      },
      {
        id: 'hanbat-arboretum',
        name: '한밭수목원',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150831_76%2F1441007266841iAabl_JPEG%2F11622659_0.jpg',
        address: '대전 서구 둔산대로 169',
        description: null,
      },
      {
        id: 'expo-bridge',
        name: '엑스포 다리',
        img: 'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20191228_74%2F15775366989875CuId_JPEG%2FM5JBa-hmArCKV1fPYr8jTWwA.jpg',
        address: '대전 유성구 도룡동',
        description: null,
      },
    ],
  },
];

const SelectSchedule = () => {
  const [activeIndex, setActiveIndex] = useAtom(activeTabIndex);
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [isPopupActive, setIsPopupActive] = useState(false);
  const [schedules, setSchedules] = useState([
    {
      id: 'fixed-hotel',
      day: 'DAY 1',
      time: '15:00',
      title: '숙소',
      desc: '숙소 도착 후 코낸내',
      address: '대전 서구 둔산로51번길 76 레지던스호텔 라인',
      fixed: true,
      editable: true,
    },
    {
      id: 'fixed-marathon',
      day: 'DAY 2',
      time: '07:40',
      title: '마라톤',
      desc: '빵빵런 🏃',
      address: '대전 서구 둔산대로 169',
      fixed: true,
      editable: false,
    },
  ]);

  const handleSelect = (e, id) => {
    const { checked } = e.target;

    if (checked) {
      setSelectedPlaces((prev) => [...prev, id]);
    } else {
      setSelectedPlaces((prev) => prev.filter((placeId) => placeId !== id));
    }
  };

  const handleAddSchedule = (newSchedules) => {
    setSchedules((prev) =>
      [...prev, ...newSchedules].sort((a, b) => {
        const dayA = parseInt(a.day.replace(/[^0-9]/g, ''), 10);
        const dayB = parseInt(b.day.replace(/[^0-9]/g, ''), 10);

        if (dayA !== dayB) {
          return dayA - dayB;
        }

        return a.time.localeCompare(b.time);
      })
    );

    setSelectedPlaces([]);
  };

  const selectedPlaceList = tabData
    .flatMap((tab) => tab.list)
    .filter((place) => selectedPlaces.includes(place.id));

  return (
    <>
      <h3>대전에서 뭐하지?</h3>
      <ul className="list__tab" role="tablist">
        {tabData.map((item, idx) => {
          return (
            <li className="list-item" role="none" key={`tab-${idx}`}>
              <button
                type="button"
                className="button__tab"
                aria-selected={activeIndex === idx}
                aria-controls={item.id}
                tabIndex={activeIndex === idx ? 0 : -1}
                onClick={(e) => {
                  e.preventDefault();
                  setActiveIndex(idx);
                }}
              >
                {item.title}
              </button>
            </li>
          );
        })}
      </ul>
      <div className="box__tab-container">
        {tabData.map((item, idx) => {
          return (
            <div
              key={`content-${idx}`}
              className="box__content"
              role="tabpanel"
              id={item.id}
              tabIndex={0}
              hidden={activeIndex === idx ? false : true}
            >
              {selectedPlaces.length > 0 && (
                <div className="box__selected">
                  <strong className="text__result">
                    선택한 장소 {selectedPlaces.length}개
                  </strong>
                  <button
                    type="button"
                    className="button__submit"
                    onClick={() => setIsPopupActive(true)}
                  >
                    일정에 추가
                  </button>
                </div>
              )}
              {item.list.map((place) => {
                return (
                  <div className="box__info">
                    <label className="form__place">
                      <input
                        type="checkbox"
                        className="form__checkbox"
                        checked={selectedPlaces.includes(place.id)}
                        onChange={(e) => handleSelect(e, place.id)}
                      ></input>
                      <span className="text__title">{place.name}</span>
                    </label>
                    <div className="box__detail">
                      {place.img !== null && (
                        <img src={place.img} className="image" />
                      )}
                      <div>
                        {place.description !== '' && (
                          <span>💡 {place.description}</span>
                        )}
                        <p>🚗 {place.address}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      {isPopupActive && (
        <Popup
          selectedPlaces={selectedPlaceList}
          onClose={() => setIsPopupActive(false)}
          onAddSchedule={handleAddSchedule}
        />
      )}
      {schedules.length > 0 && (
        <div className={styles.timeline}>
          <div className={styles.header}>
            <h2>Travel Schedule</h2>
            <p>우리의 대전 여행 일정</p>
          </div>

          <div className={styles.line} />

          {schedules.map((item, index) => (
            <article
              key={`${item.day}-${item.time}-${item.title}-${index}`}
              className={`${styles.card} ${
                index % 2 === 0 ? styles.left : styles.right
              }`}
            >
              <div className={styles.dot} />

              <div className={styles.box}>
                <div className={styles.cardHeader}>
                  <span className={styles.day}>{item.day}</span>
                </div>

                <h3>{item.title}</h3>

                <div className={styles.time}>
                  <Clock3 size={16} />
                  {item.time}
                </div>

                {item.desc && <p className={styles.desc}>{item.desc}</p>}

                {item.address && (
                  <div className={styles.locationWrapper}>
                    <div className={styles.locationInfo}>
                      <MapPin size={15} />
                      <span>{item.address}</span>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </>
  );
};

export default SelectSchedule;
