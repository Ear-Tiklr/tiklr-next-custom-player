"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Icon from "../ui/Icon";
import styles from "./HeaderSearch.module.scss";

const HeaderSearch = () => {
  const router = useRouter();
  const [query, setQuery] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState(query);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const searchSubmitHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setQuery(searchTerm);
      router.push(`/musics?query=${searchTerm}`);
    } else if (e.key === "Tab") {
      // Handle Tab key if necessaryreturn;
    } else if (e.key === "Backspace") {
      setSearchTerm((prevTerm) => prevTerm.slice(0, -1));
    } else if (e.key === "j" || e.key === "r") {
      setSearchTerm((prevTerm) => prevTerm);
    } else if (e.key.length === 1) {
      // Ensures only character keys are processed
      setSearchTerm((prevTerm) => prevTerm + e.key);
    }

    // Clear the previous timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout
    const newTimeoutId = setTimeout(() => {
      setQuery(searchTerm);
      router.push(`/musics?query=${searchTerm}`);
    }, 20000000);

    setTimeoutId(newTimeoutId);
  };

  useEffect(() => {
    setSearchTerm(query);
  }, [query]);

  useEffect(() => {
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [timeoutId]);

  return (
    <div className={styles["search-wrapper"]}>
      <Icon className={styles.icon} icon="search" />
      <input
        id="input_search"
        className={styles.search}
        type="text"
        placeholder="/search or /generate command"
        value={searchTerm}
        onChange={handleChange}
        onKeyDownCapture={searchSubmitHandler}
      />
    </div>
  );
};

export default HeaderSearch;
