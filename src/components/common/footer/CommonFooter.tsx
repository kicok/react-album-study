import { useEffect, useState } from "react";
import styles from "./CommonFooter.module.scss";
import { useSearchStore } from "@/stoer/searchStore";

function CommonFooter() {
  // Zustand store 에서 가져오는 상태들
  const { search, page, setPage, totalPages } = useSearchStore();

  // 현재 "페이지 그룹(step)"을 나타내는 상태 (예: 0번 그룹 → 1~10, 1번 그룹 → 11~20)
  const [step, setStep] = useState(0);

  // 검색어(search)가 바뀌면 페이지와 step을 초기화
  useEffect(() => {
    setPage(1);
    setStep(0);
  }, [search]);

  // 1 ~ totalPages 까지의 페이지 번호 배열 생성
  const newArr: number[] = new Array();
  for (let i = 1; i <= totalPages; i++) {
    newArr.push(i);
  }

  // 총 페이지 개수
  const length = newArr.length;

  // 페이지 번호를 10개씩 묶을 때, 총 몇 그룹이 필요한지 계산
  // 예: 총 23페이지 → 10개씩 묶으면 3그룹(1~10, 11~20, 21~23)
  const divide =
    Math.floor(length / 10) + (Math.floor(length % 10) > 0 ? 1 : 0);

  // 페이지 번호를 10개씩 잘라서 저장하는 2차원 배열
  const res: number[][] = [];

  // newArr를 10개씩 잘라 res에 넣음
  // 예: [[1,2,...,10], [11,...,20], [21,22,23]]
  for (let i = 0; i <= divide; i++) {
    res.push(newArr.splice(0, 10));
  }

  // 현재 step에 해당하는 그룹의 페이지 번호들을 버튼으로 렌더링
  const pages =
    res[step] &&
    res[step].map((item: number) => {
      return (
        <button
          className={
            page === item
              ? `${styles.pagination__button} ${styles.active}` // 현재 페이지 강조
              : `${styles.pagination__button} ${styles.icactive}`
          }
          key={item}
          onClick={() => moveToPage(item)} // 클릭 시 해당 페이지로 이동
        >
          {item}
        </button>
      );
    });

  // 특정 페이지 번호로 이동
  const moveToPage = (selected: number) => {
    setPage(selected);
  };

  // 이전 그룹으로 이동
  const moveToPrev = () => {
    if (step === 0) return; // 첫 그룹이면 더 못 감
    else {
      setStep(step - 1); // 이전 그룹으로 이동
      setPage(res[step - 1][0]); // 해당 그룹의 첫 번째 페이지로 이동
    }
  };

  // 다음 그룹으로 이동
  const moveToNext = () => {
    if (step < res.length - 1) {
      // 마지막 그룹이 아니면 이동
      setStep(step + 1);
      setPage(res[step + 1][0]); // 다음 그룹의 첫 번째 페이지로 이동
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.pagination}>
        {/* 이전 그룹 버튼 */}
        <button className={styles.pagination__button} onClick={moveToPrev}>
          <img src="/src/assets/icons/icon-arrowLeft.svg" alt="" />
        </button>

        {/* 현재 그룹의 페이지 버튼들 */}
        {pages}

        {/* 다음 그룹 버튼 */}
        <button className={styles.pagination__button} onClick={moveToNext}>
          <img src="/src/assets/icons/icon-arrowRight.svg" alt="" />
        </button>
      </div>
    </footer>
  );
}

export default CommonFooter;
