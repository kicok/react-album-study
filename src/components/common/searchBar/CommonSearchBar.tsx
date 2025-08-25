import { useState } from "react";
import styles from "./CommonSearchBar.module.scss";
import { useSearchStore } from "@/stoer/searchStore";

function CommonSearchBar() {
  const { search, setSearch } = useSearchStore();
  const [text, setText] = useState("");

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  const onSearch = () => {
    if (text === "") {
      setSearch("korea");
    } else {
      setSearch(text);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      if (text === "") {
        setSearch("korea");
      } else {
        setSearch(text);
      }
    }
  };

  return (
    <div className={styles.searchBar}>
      <div className={styles.searchBar__search}>
        <input
          type="text"
          placeholder="찾으실 이미지를 검색하세요."
          className={styles.searchBar__search__input}
          onChange={onChange}
          onClick={onSearch}
          value={text}
          onKeyDown={handleKeyDown}
        />
        <img src="src/assets/icons/icon-search.svg" alt="" />
      </div>
    </div>
  );
}

export default CommonSearchBar;
