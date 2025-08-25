import CommonHeader from "@/components/common/header/CommonHeader";
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar";
import CommonNav from "@/components/common/navigation/CommonNav";
import CommonFooter from "@/components/common/footer/CommonFooter";
import styles from "./styles/index.module.scss";
import Card from "./components/Card";
import { useEffect, useState } from "react";
import { useSearchStore } from "@/stoer/searchStore";
import type { CardDto, ResDto } from "./types/card";
import { fetchImages } from "./searchService";
import DetailDialog from "@/components/common/dialog/DetailDialog";
import { useQuery } from "@tanstack/react-query";

export default function index() {
  const [imgData, setImgData] = useState<CardDto>();
  const { page, search, per_page } = useSearchStore();
  const { setTotal, setTotalPages } = useSearchStore();
  const [open, setOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<ResDto>({
    queryKey: ["images", search, page, per_page],
    queryFn: () => fetchImages(search, page, per_page),
    enabled: !!search, // 검색어 있을 때만 실행
    staleTime: 1000 * 60, // 1분동안 캐싱
  });

  useEffect(() => {
    if (data) {
      setTotal(data.total);
      setTotalPages(data.total_pages);
    }
  }, [data, setTotal, setTotalPages]);

  const cardList = data?.results.map((card: CardDto) => {
    return (
      <Card
        data={card}
        key={card.id}
        handleDialog={setOpen}
        handleSetData={setImgData}
      />
    );
  });

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
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

      {open && imgData && (
        <DetailDialog data={imgData} handleDialog={setOpen} />
      )}
    </div>
  );
}
