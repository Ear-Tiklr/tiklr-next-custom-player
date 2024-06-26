const GetUser = async (userId: number): Promise<ServiceResponse<User>> => {
  let status: number = 101;
  let error: string = "";
  let data: User;

  const res = await fetch(`${process.env.NEXT_PUBLIC_USERS_API}/${userId}`, {
    headers: {
      Accept: "application/json",
      Cookie:
        "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NGY0NDg5MGZmYWFmMjBkMTUzMjM2OCIsImlhdCI6MTcxNjQ3MTIyOSwiZXhwIjoxNzE5MDYzMjI5fQ.Z78wLQJ8a8mB7yfXfKxK3XbsO0ZE92SF3LaEX_7mrTc",
    },
  });
  console.log(res);

  if (res.ok) {
    console.log(res);
    data = await res.json();
  } else {
    status = res.status;
    error = res.statusText;
  }

  return {
    status,
    error,
    data,
  };
};

export default GetUser;
