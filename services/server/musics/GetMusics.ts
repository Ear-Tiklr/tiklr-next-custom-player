// Adjust the import path according to your project structure

const GetMusics = async (query: string = ""): Promise<Music[]> => {
  let url = process.env.NEXT_PUBLIC_MUSICS_API as string;
  if (query) {
    url += "?query=" + query;
  }
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      Cookie:
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY0NDg5MGZmYWFmMjBkMTUzMjM2OCIsImlhdCI6MTcxNjQ3MTIyOSwiZXhwIjoxNzE5MDYzMjI5fQ.Z78wLQJ8a8mB7yfXfKxK3XbsO0ZE92SF3LaEX_7mrTc",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch musics");
  }
  const musicRes = await res.json();
  const data: Music[] = musicRes.content;
  return data;
};

export default GetMusics;
