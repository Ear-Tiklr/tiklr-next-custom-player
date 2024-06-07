"use client";
import Musics from "@/components/msuics/Musics";
import GetMusics from "@/services/server/musics/GetMusics";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

const MusicsPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";
  const [musics, setMusics] = useState<Music[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMusics = async () => {
      try {
        setLoading(true);
        let musicsData: Music[] = [];
        if (
          !query ||
          query == null ||
          query == "" ||
          query.startsWith("/search")
        ) {
          musicsData = await GetMusics(
            query.replace("/search", "").trim(),
            "search"
          );
        } else if (query.startsWith("/genre8")) {
          musicsData = await GetMusics(
            query.replace("/genre8", "").trim(),
            "genre8"
          );
        } else if (query.startsWith("/generate")) {
          musicsData = await GetMusics(
            query.replace("/generate", "").trim(),
            "generate"
          );
        } else {
          throw new Error("Invalid query prefix");
        }
        setMusics(musicsData);
      } catch (error) {
        console.error("Failed to fetch musics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMusics();
  }, [query]);

  return (
    <div>
      {loading && <div>Processing...</div>}
      <Musics musics={musics} query={query} />
    </div>
  );
};

export default MusicsPage;
