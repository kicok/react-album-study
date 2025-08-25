import { useEffect, useMemo, useState } from "react";
import styles from "./CommonFooter.module.scss";
import { useSearchStore } from "@/stoer/searchStore";

function CommonFooter() {
  const { search, page, setPage, totalPages } = useSearchStore();
  const [step, setStep] = useState(0);

  // ✅ 검색어 바뀌면 첫 페이지부터 시작
  useEffect(() => {
    setPage(1);
    setStep(0);
  }, [search, setPage]);

  // ✅ 배열 쪼개기 함수
  const chunkArray = (arr: number[], size: number) => {
    const result: number[][] = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  // ✅ 페이지 그룹 계산 (10개 단위)
  const res = useMemo(() => {
    const newArr = Array.from({ length: totalPages }, (_, i) => i + 1);
    return chunkArray(newArr, 3);
  }, [totalPages]);

  // ✅ 현재 step의 페이지 버튼 목록
  const pages = res[step]?.map((item) => (
    <button
      key={item}
      className={
        page === item
          ? `${styles.pagination__button} ${styles.active}`
          : `${styles.pagination__button} ${styles.icactive}`
      }
      onClick={() => setPage(item)}
    >
      {item}
    </button>
  ));

  // ✅ 이전 페이지 그룹으로 이동
  const moveToPrev = () => {
    if (step > 0) {
      setStep(step - 1);
      setPage(res[step - 1][0]);
    }
  };

  // ✅ 다음 페이지 그룹으로 이동
  const moveToNext = () => {
    if (step < res.length - 1) {
      setStep(step + 1);
      setPage(res[step + 1][0]);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        <button className={styles.pagination__button} onClick={moveToPrev}>
          <img src="/src/assets/icons/icon-arrowLeft.svg" alt="이전" />
        </button>
        {pages}
        <button className={styles.pagination__button} onClick={moveToNext}>
          <img src="/src/assets/icons/icon-arrowRight.svg" alt="다음" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
