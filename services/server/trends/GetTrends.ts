const GetTrends = async () => {
  //   const res1 = await fetch(
  //     "https://my-json-server.typicode.com/aligod8001/music-player-Trends-Server/trends"
  //   );

  //   const json1 = await res1.json();
  //   console.log(json1);

  //   const data1: Music[] = json1;

  try {
    const res = await fetch(process.env.NEXT_PUBLIC_TRENDS_API, {
      headers: {
        Accept: "application/json",
        Cookie:
          "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY0NDg5MGZmYWFmMjBkMTUzMjM2OCIsImlhdCI6MTcxNjQ3MTIyOSwiZXhwIjoxNzE5MDYzMjI5fQ.Z78wLQJ8a8mB7yfXfKxK3XbsO0ZE92SF3LaEX_7mrTc",
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch: ${res.status} ${res.statusText}`);
    }

    const json2 = await res.json();

    const data = json2.content; // Assuming json2 is an array of Music objects
    return data;
  } catch (error) {
    console.error("Error fetching trends:", error);
    return null;
  }
};

export default GetTrends;
