const orders = [
  {
    id: 1,
    fullName: "WUN ZHE",
    mobile: "+60 11223344",
    total: 153,
    paymentType: "Credit Card",
    status: "In Warehouse",
    discount: 10,
    books: [
      { bookId: "B001", bookName: "React for Beginners", pricePerUnit: 50, quantity: 2 },
      { bookId: "B002", bookName: "JavaScript Essentials", pricePerUnit: 70, quantity: 1 }
    ]
  },
  {
    id: 2,
    fullName: "WUN LIM",
    mobile: "+60 11223344",
    total: 260,
    paymentType: "Cash",
    status: "Delivering",
    books: [
      { bookId: "B003", bookName: "CSS Mastery", pricePerUnit: 60, quantity: 3 },
      { bookId: "B004", bookName: "HTML Basics", pricePerUnit: 40, quantity: 2 }
    ]
  },
  {
    id: 3,
    fullName: "SCRUM MASTER",
    mobile: "+60 11220099",
    total: 275,
    paymentType: "Credit Card",
    status: "Completed",
    books: [
      { bookId: "B005", bookName: "Agile Methodologies", pricePerUnit: 75, quantity: 1 },
      { bookId: "B006", bookName: "Project Management", pricePerUnit: 100, quantity: 2 }
    ]
  },
  {
    id: 4,
    fullName: "JOHN DOE",
    mobile: "+60 12345678",
    total: 420,
    paymentType: "Debit Card",
    status: "Pending",
    books: [
      { bookId: "B007", bookName: "Node.js for Beginners", pricePerUnit: 80, quantity: 3 },
      { bookId: "B008", bookName: "Express.js Essentials", pricePerUnit: 90, quantity: 2 }
    ]
  },
  {
    id: 5,
    fullName: "ALICE WONG",
    mobile: "+60 12223344",
    total: 550,
    paymentType: "Credit Card",
    status: "Returned",
    books: [
      { bookId: "B009", bookName: "Vue.js Guide", pricePerUnit: 120, quantity: 2 },
      { bookId: "B010", bookName: "Sass Essentials", pricePerUnit: 110, quantity: 3 }
    ]
  },
  {
    id: 6,
    fullName: "BOB TAN",
    mobile: "+60 11122333",
    total: 315,
    paymentType: "Cash",
    status: "Shipping",
    books: [
      { bookId: "B011", bookName: "Python for Data Science", pricePerUnit: 95, quantity: 2 },
      { bookId: "B012", bookName: "Machine Learning Basics", pricePerUnit: 125, quantity: 1 }
    ]
  },
  {
    id: 7,
    fullName: "MIA CHONG",
    mobile: "+60 11554433",
    total: 380,
    paymentType: "Credit Card",
    status: "In Warehouse",
    books: [
      { bookId: "B013", bookName: "Django for Web Development", pricePerUnit: 160, quantity: 1 },
      { bookId: "B014", bookName: "Flask Essentials", pricePerUnit: 220, quantity: 1 }
    ]
  },
  {
    id: 8,
    fullName: "DAVID NG",
    mobile: "+60 11667788",
    total: 480,
    paymentType: "Debit Card",
    status: "Completed",
    books: [
      { bookId: "B015", bookName: "React Native Handbook", pricePerUnit: 240, quantity: 1 },
      { bookId: "B016", bookName: "Firebase for Beginners", pricePerUnit: 240, quantity: 1 }
    ]
  },
  {
    id: 9,
    fullName: "JANE LEE",
    mobile: "+60 11778899",
    total: 270,
    paymentType: "Credit Card",
    status: "Cancelled",
    books: [
      { bookId: "B017", bookName: "Java for Beginners", pricePerUnit: 130, quantity: 1 },
      { bookId: "B018", bookName: "Spring Framework", pricePerUnit: 140, quantity: 1 }
    ]
  },
  {
    id: 10,
    fullName: "SAMUEL LEE",
    mobile: "+60 11446688",
    total: 390,
    paymentType: "Cash",
    status: "Pending",
    books: [
      { bookId: "B019", bookName: "PHP Programming", pricePerUnit: 160, quantity: 1 },
      { bookId: "B020", bookName: "Laravel Framework", pricePerUnit: 230, quantity: 1 }
    ]
  },
  {
    id: 11,
    fullName: "PETER TAN",
    mobile: "+60 11889900",
    total: 520,
    paymentType: "Credit Card",
    status: "Delivering",
    books: [
      { bookId: "B021", bookName: "Flutter for Mobile Apps", pricePerUnit: 220, quantity: 1 },
      { bookId: "B022", bookName: "Angular Development", pricePerUnit: 300, quantity: 1 }
    ]
  },
  {
    id: 12,
    fullName: "LUCY LIM",
    mobile: "+60 11334455",
    total: 450,
    paymentType: "Debit Card",
    status: "Shipping",
    books: [
      { bookId: "B023", bookName: "Web Development with Node.js", pricePerUnit: 180, quantity: 1 },
      { bookId: "B024", bookName: "JavaScript Algorithms", pricePerUnit: 270, quantity: 1 }
    ]
  }
];

export default orders;