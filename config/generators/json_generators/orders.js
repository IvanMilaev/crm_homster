[
  {
    "repeat(100)": {
      _id: "{{index(900)}}",
      when_created:
        '{{moment(this.date(new Date(2018, 11, 1), new Date(2018, 12, 1))).format("LLLL")}}',
      who_created: "{{integer(0, 100)}}",
      when_edit:
        '{{moment(this.date(new Date(2018, 11, 1), new Date(2018, 12, 1))).format("LLLL")}}',
      who_edit: "{{integer(0, 100)}}",
      deleted: "{{bool()}}",
      when_deleted:
        '{{moment(this.date(new Date(2018, 11, 1), new Date(2018, 12, 1))).format("LLLL")}}',
      who_deleted: "{{integer(0, 100)}}",
      customer: "{{integer(0, 1000)}} ",
      stage: "{{integer(0, 20)}} ",
      documents: [
        {
          "repeat(0,3)": "{{integer(0, 1000)}}"
        }
      ],
      responsibles: [
        {
          "repeat(1,5)": "{{integer(0, 100)}}"
        }
      ],
      planings: [
        {
          "repeat(0,4)": "{{integer(0, 4)}}"
        }
      ],
      tasks: [
        {
          "repeat(1,20)": "{{integer(0, 10000)}}"
        }
      ],
      orderitems: [
        {
          "repeat(1,3)": "{{integer(0, 10000)}}"
        }
      ],
      comments: [
        {
          "repeat(1,4)": {
            text: '{{lorem(1, "paragraphs")}}',
            date:
              '{{moment(this.date(new Date(2018, 11, 1), new Date(2018, 12, 1))).format("LLLL")}}',
            author: "{{integer(0, 100)}}"
          }
        }
      ]
    }
  }
];
