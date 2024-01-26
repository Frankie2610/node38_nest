const initAvatar = (fullName: string) => {
  const name = fullName.split(' ');
  // console.log(initAvatar);
  // lấy chữ cái đầu của họ ghép với chữ cái đầu của tên => tạo avatar
  const newAvatar = name[0][0] + name[name.length - 1][0];
  return `https://ui-avatars.com/api/?name=${newAvatar}&background=random&size=100`;
};

export { initAvatar };
