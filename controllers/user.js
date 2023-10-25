let users = [
 {
  id: 1,
  name: "Jabriel Bamasena Javier Rahardjanto",
  email: "jabrielbams@gmail.com",
 },
 { id: 2, name: "Alexandro Christian Hananto", email: "hananto@gmail.com" },
 { id: 3, name: "Cahyo Maryuandi", email: "cahyo123@gmail.com" },
 { id: 4, name: "Azra Rizqia Putri", email: "azzr1@gmail.com" },
 { id: 5, name: "Sheren Aura Vi", email: "sauravi2@gmail.com" },
];

module.exports = {
 index: (req, res) => {
  if (users.length > 0) {
   res.json({
    status: true,
    data: users,
    method: req.method,
    url: req.url,
   });
  } else {
   res.json({
    status: false,
    message: "Data masih kosong",
   });
  }
 },

 store: (req, res) => {
  users.push(req.body);
  res.json({
   status: true,
   data: users,
   method: req.method,
   url: req.url,
   message: "Data berhasil ditambahkan",
  });
 },

 update: (req, res) => {
  const id = req.params.id;
  users.filter((user) => {
   if (user.id == id) {
    user.name = req.body.name;
    user.email = req.body.email;
    return user;
   }
  });
  res.json({
   status: true,
   data: users,
   method: req.method,
   url: req.url,
   message: "Data berhasil diubah",
  });
 },
 delete: (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id != id);

  res.json({
   status: true,
   data: users,
   method: req.method,
   url: req.url,
   message: "Data berhasil dihapus",
  });
 },
};
