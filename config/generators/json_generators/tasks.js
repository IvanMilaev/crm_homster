[
  {
    "repeat(100)": {
      _id: "{{index()}}",
      when_created:
        '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',
      who_created: "{{integer(0, 100)}}",
      when_edit:
        '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',
      who_edit: "{{integer(0, 100)}}",
      is_active: "{{bool()}}",
      when_deleted:
        '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',
      who_deleted: "{{integer(0, 100)}}",
      type:
        '{{random("_order_CallToClient", "_order_MakeMeasurement", "_order_MakeDeliver", "_order_MakeInstallation", "_order_MakeContract", "_order_TakePrepayment", "_order_TakeSurcharge", "_order_DistributeMeasurements", "_order_DistributeDelivers", "_order_MakeInstallationQualityControl", "_misc_" )}}',
      order: "{{integer(0, 1000)}}",
      start:
        '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',
      end:
        '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',
      responsibles: [
        {
          "repeat(0,5)": "{{integer(0, 100)}}"
        }
      ],
      header: '{{lorem(1, "sentences")}}',
      description: '{{lorem(1, "paragraphs")}}',

      need_controller: "{{bool()}}",
      controller: "{{integer(0, 100)}}",
      is_accepted: "{{bool()}}",
      when_closed:
        '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',
      who_closed: "{{integer(0, 100)}}",
      when_accepted:
        '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',

      comments: [
        {
          "repeat(1,20)": {
            text: '{{lorem(1, "paragraphs")}}',
            date:
              '{{moment(this.date(new Date(2018, 11, 1), new Date())).format("LLLL")}}',
            author: "{{integer(0, 100)}}"
          }
        }
      ]
    }
  }
];
