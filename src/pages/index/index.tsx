import CommonHeader from "@/components/common/header/CommonHeader";
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar";
import CommonNav from "@/components/common/navigation/CommonNav";
import CommonFooter from "@/components/common/footer/CommonFooter";
import styles from "./styles/index.module.scss";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/stoer/searchStore";
import type { CardDto } from "./types/card";
import { fetchImages } from "./searchService";

export default function index() {
  const [imgUrls, setImgUrls] = useState<CardDto[]>([]);
  const { pageValue, searchValue, per_page } = useSearchStore();

  const cardList = imgUrls.map((card: CardDto) => {
    return <Card data={card} key={card.id} />;
  });

  useEffect(() => {
    async function loadImages() {
      try {
        const data = await fetchImages(searchValue, pageValue, per_page);
        setImgUrls(data);
      } catch (error) {}
    }
    loadImages();
  }, [searchValue, pageValue, per_page]);
  return (
    <div className={styles.page}>
      {/* 공통 헤더 UI 부분 */}
      <CommonHeader />
      {/* 공통 네비게이션 UI 부분 */}
      <CommonNav />
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>PhotoSplash</span>
            <span className={styles.wrapper__desc}>
              인터넷의 시각 자료 출처입니다. <br />
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/* 검색창 UI 부분 */}
            <CommonSearchBar />
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>{cardList}</div>
      </div>
      {/* 공통 푸터 UI 부분 */}
      <CommonFooter />
    </div>
  );
}
