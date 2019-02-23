[
  {
    "repeat(100)": {
      _id: "{{index()}}",
      name: {
        first: "{{firstName()}}",
        last: "{{surname()}}"
      },
      is_active: "{{bool()}}",
      picture: "http://placehold.it/32x32",
      password: "$2a$10$305wqgHMmiwrMKqcS5dMeuIF/MXrNplQBaknS7hiUsGbAU6ecWL86",

      email(tags) {
        return `${this.name.first}.${this.name.last}@${
          this.company
        }${tags.domainZone()}`.toLowerCase();
      },
      phone: "+3 {{phone()}}",
      alt_phones: [
        {
          "repeat(0,3)": "+3 {{phone()}}"
        }
      ],
      address:
        "{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}",
      position: "{{integer(0, 14)}} ",
      birth:
        '{{moment(this.date(new Date(1975, 0, 1), new Date(2001, 0, 1))).format("LLLL")}}',

      comments: [
        {
          "repeat(1,4)": {
            text: '{{lorem(1, "paragraphs")}}',
            date:
              '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
            author: "{{integer(0, 50)}}"
          }
        }
      ],

      eye_color: '{{random("blue", "brown", "green")}}',
      friends: [
        {
          "repeat(3)": {
            id: "{{index()}}",
            name: "{{firstName()}} {{surname()}}"
          }
        }
      ],
      about: '{{lorem(1, "paragraphs")}}',
      latitude: "{{floating(-90.000001, 90)}}",
      longitude: "{{floating(-180.000001, 180)}}",
      tags: [
        {
          "repeat(5)": '{{lorem(1, "words")}}'
        }
      ],
      range: range(10),
      greeting(tags) {
        return `Hello, ${this.name.first}! You have ${tags.integer(
          5,
          10
        )} unread messages.`;
      },
      favoriteFruit(tags) {
        const fruits = ["apple", "banana", "strawberry"];
        return fruits[tags.integer(0, fruits.length - 1)];
      },

      when_created:
        '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
      who_created: "{{integer(0, 200)}}"
    }
  }
];
