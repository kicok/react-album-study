import type { CardDto } from "@/pages/index/types/card";
import styles from "./DetailDialog.module.scss";

interface Props {
  data: CardDto;
  handleDialog: (eventValue: boolean) => void;
}
function DetailDialog({ data, handleDialog }: Props) {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // e.target이 overlay일 때만 닫기 (내용 클릭 시 무시)
    if (e.target === e.currentTarget) {
      handleDialog(false);
    }
  };

  const closeDialog = () => handleDialog(false);
  return (
    <div className={styles.container} onClick={handleOverlayClick}>
      <div className={styles.container__dialog}>
        <div className={styles.container__dialog__header}>
          <div className={styles.close}>
            <button className={styles.close__button} onClick={closeDialog}>
              {/* 구글아이콘사용 */}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 28 }}
              >
                close
              </span>
            </button>
            <img
              src={data.user.profile_image.small}
              alt="사진작가 프로필 사진"
              className={styles.close__authorImage}
            />
            <span className={styles.close_authorName}>{data.user.name}</span>
          </div>
          <div className={styles.bookmark}>
            <button className={styles.bookmark_button}>
              {/* 구글아이콘사용 */}
              <span
                className="material-symbols-outlined"
                style={{ fontSize: 16 }}
              >
                favorite
              </span>
              북마크
            </button>
            <button className={styles.bookmark_button}>
              {/* 구글아이콘사용 */}다운로드
            </button>
          </div>
        </div>
        <div className={styles.container__dialog__body}>
          <img
            src={data.urls.small}
            alt="상세이미지"
            className={styles.image}
          />
        </div>
        <div className={styles.container__dialog__footer}>
          <div className={styles.infoBox}>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>이미지 크기</span>
              <span className={styles.infoBox__item__value}>
                {data.width} X {data.height}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>업로드</span>
              <span className={styles.infoBox__item__value}>
                {data.created_at.split("T")[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>
                마지막 업데이트
              </span>
              <span className={styles.infoBox__item__value}>
                {data.updated_at.split("T")[0]}
              </span>
            </div>
            <div className={styles.infoBox__item}>
              <span className={styles.infoBox__item__label}>다운로드</span>
              <span className={styles.infoBox__item__value}>{data.likes}</span>
            </div>
          </div>
          <div className={styles.tagBox}>
            <div className={styles.tagBox__tag}>태그 데이터</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DetailDialog;
