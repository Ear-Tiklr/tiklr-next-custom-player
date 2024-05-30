const GetTopMusics = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_TOP_MUSICS_API, {
    headers: {
      Accept: "application/json",
      Cookie:
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY0NDg5MGZmYWFmMjBkMTUzMjM2OCIsImlhdCI6MTcxNjQ3MTIyOSwiZXhwIjoxNzE5MDYzMjI5fQ.Z78wLQJ8a8mB7yfXfKxK3XbsO0ZE92SF3LaEX_7mrTc",
    },
  });

  const musRes = await res.json();

  const data: Music[] = musRes.content;

  return data;
};

export default GetTopMusics;
