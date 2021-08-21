import MenuItem from "../../common/HomeMenuItem/MenuItem";

const AdminWelcome = () => {
  const adminMenu = [
    {
      title: "Dodaj produkt",
      link: "/admin/add",
      image:
        "https://static.highsnobiety.com/thumbor/8uQ9HZ_XpAo-rQErI9vvUVCcp6s=/1600x1067/static.highsnobiety.com/wp-content/uploads/2021/04/16162418/how-to-care-for-clothes-02.jpg",
      id: 1,
      size: "large-admin",
    },
    {
      title: "Zarządzaj",
      link: "#",
      image: "https://duext.com/wp-content/uploads/2018/10/blog-3-option-1.jpg",
      id: 2,
      size: "large-admin",
    },
  ];

  return (
    <>
      {adminMenu.map(({ title, image, id, size, link }) => (
        <MenuItem
          key={id}
          title={title}
          image={image}
          size={size}
          linkUrl={link}
          store={false}
        />
      ))}
    </>
  );
};

export default AdminWelcome;
