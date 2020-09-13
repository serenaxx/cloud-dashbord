import React from "react";

export const defaultWidgets = [
    {
      name: "billing_overview",
      alias: "Billing Overview",
      w: 4,
      h: 3,
      x: 0,
      y: 0,
    },
    {
      name: "resource_group",
      alias: "Resource Group",
      w: 4,
      h: 4,
      x: 4,
      y: 0,
    },
    {
      name: "cloud_products",
      alias: "My cloud products",
      w: 4,
      h: 3,
      x: 8,
      y: 0,
    },
    {
      name: "to_do_tasks",
      alias: "To Do Tasks",
      w: 5,
      h: 3,
      x: 0,
      y: 4,
    },
    {
      name: "resource_warning",
      alias: "Resource Warning",
      w: 6,
      h: 3,
      x: 5,
      y: 4,
    },
]
export const dataMap1 = {
    billing_overview: [
      [
        {
          name: "Account Balance",
          value: "CNY 10.00",
        },
        {
          name: "Available Quota",
          value: "CNY 20.00",
        },
      ],
      [
        {
          name: "Coupon",
          value: "5",
          type: "card",
        },
        {
          name: "Resource Pack",
          value: "10",
          type: "card",
        },
      ],
    ],
    resource_group: [
      [
        {
          type: "description",
          data: [{
            name: "account number",
            value: "serena.cloud.com",
          }],
        },
      ],
      [
        {
          type: "table",
          data: [
            {
              key: '1',
              name: 'Website record',
              count: 3,
              status: 'available',
            },
            {
              key: '2',
              name: 'Cloud Function',
              count: 8,
              status: 'available',
            },
            {
              key: '3',
              name: 'resource name',
              count: 0,
              status: '-',
            },
          ],
          columns: [
            {
              title: 'Resource Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Resource Count',
              dataIndex: 'count',
              key: 'count',
              render: text => text ? <a>{text}</a> : text,
            },
            {
              title: 'Resource Status',
              dataIndex: 'status',
              key: 'status',
            },
          ],
        },
      ],
    ],
    to_do_tasks: [
      [
        {
          name: "To Be Renewed",
          value: 1,
          type: "card",
        },
        {
          name: "To Be Paid",
          value: 0,
          type: "card",
        },
        {
          name: "To Do Ticket",
          value: 2,
          type: "card",
        },
      ],
    ],
    resource_warning: [
      [
        {
          name: "Safety Rating",
          value: "90/100",
          type: "card",
          plain: true,
        },
        {
          name: "Monitoring Alarm",
          value: 0,
          type: "card",
        },
        {
          name: "Loophole",
          value: 2,
          type: "card",
        },
      ],
    ],
    cloud_products: [
      [
        {
          name: "Cloud Server",
          type: "block",
        },
        {
          name: "Cloud Redis",
          type: "block",
        },
        {
          name: "Cloud MongoDB",
          type: "block",
        },
      ],
      [
        {
          name: "Cloud Hbase",
          type: "block",
        },
        {
          name: "Load balancing",
          type: "block",
        },
        {
          name: "Cloud monitoring",
          type: "block",
        },
      ],
      [
        {
          name: "Cloud Elasticsearch",
          type: "block",
        },
      ]
    ]
};

export const dataMap2 = {
    billing_overview: [
      [
        {
          name: "Account Balance",
          value: "CNY 50.00",
        },
        {
          name: "Available Quota",
          value: "CNY 10.00",
        },
      ],
      [
        {
          name: "Coupon",
          value: "0",
          type: "card",
        },
        {
          name: "Resource Pack",
          value: "7",
          type: "card",
        },
      ],
    ],
    resource_group: [
      [
        {
          type: "description",
          data: [{
            name: "account number",
            value: "serena2.cloud.com",
          }],
        },
      ],
      [
        {
          type: "table",
          data: [
            {
              key: '1',
              name: 'Website record',
              count: 5,
              status: 'available',
            },
            {
              key: '2',
              name: 'Cloud Function',
              count: 3,
              status: 'available',
            },
            {
              key: '3',
              name: 'resource name',
              count: 8,
              status: '-',
            },
          ],
          columns: [
            {
              title: 'Resource Name',
              dataIndex: 'name',
              key: 'name',
            },
            {
              title: 'Resource Count',
              dataIndex: 'count',
              key: 'count',
              render: text => text ? <a>{text}</a> : text,
            },
            {
              title: 'Resource Status',
              dataIndex: 'status',
              key: 'status',
            },
          ],
        },
      ],
    ],
    to_do_tasks: [
      [
        {
          name: "To Be Renewed",
          value: 3,
          type: "card",
        },
        {
          name: "To Be Paid",
          value: 1,
          type: "card",
        },
        {
          name: "To Do Ticket",
          value: 6,
          type: "card",
        },
      ],
    ],
    resource_warning: [
      [
        {
          name: "Safety Rating",
          value: "88/100",
          type: "card",
          plain: true,
        },
        {
          name: "Monitoring Alarm",
          value: 3,
          type: "card",
        },
        {
          name: "Loophole",
          value: 4,
          type: "card",
        },
      ],
    ],
    cloud_products: [
      [
        {
          name: "Cloud Server",
          type: "block",
        },
        {
          name: "Cloud Redis",
          type: "block",
        },
        {
          name: "Cloud MongoDB",
          type: "block",
        },
      ],
      [
        {
          name: "Cloud Hbase",
          type: "block",
        },
        {
          name: "Load balancing",
          type: "block",
        },
        {
          name: "Cloud monitoring",
          type: "block",
        },
      ],
    ]
};

export const defaultWidgetKeys1 = ['billing_overview','resource_group','cloud_products']

export const defaultWidgetKeys2 = ['billing_overview','resource_group','cloud_products']

export const defaultProducts = [
  {
    id: '1',
    name: 'project1',
  },
  {
    id: '2',
    name: "project2",
  }
]

export const projectWidgets = {
    '1': {
      defaultWidgets,
      dataMap: dataMap1,
      defaultWidgetKeys: defaultWidgetKeys1,
    },
    '2': {
      defaultWidgets,
      dataMap: dataMap2,
      defaultWidgetKeys: defaultWidgetKeys2,
    }
}
