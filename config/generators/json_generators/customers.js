[
  {
    "repeat(100)": {
      _id: "{{index()}}",
      name: {
        first: "{{firstName()}}",
        last: "{{surname()}}"
      },
      is_active: "{{bool()}}",
      balance: '{{floating(1000, 4000, 2, "$0,0.00")}}',
      picture: "http://placehold.it/32x32",
      age: "{{integer(20, 40)}}",

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
      company: "{{company().toUpperCase()}}",

      comments: [
        {
          "repeat(1,4)": {
            text: '{{lorem(1, "paragraphs")}}',
            date:
              '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
            author: "{{integer(0, 200)}}"
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
      who_created: "{{integer(0, 200)}}",
      ips: [],
      orders: []
    }
  }
];
