import React from 'react';
import { Table } from 'antd';
import './employees.css';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: (a, b) => a.id - b.id,
  },
  {
    title: 'First Name',
    dataIndex: 'firstName',
    sorter: (a, b) => a.firstName.localeCompare(b.firstName),
  },
  {
    title: 'Last Name',
    dataIndex: 'lastName',
    sorter: (a, b) => a.lastName.localeCompare(b.lastName),
  },
  {
    title: 'Organization',
    dataIndex: 'organization',
    sorter: (a, b) => a.organization.localeCompare(b.organization),
  },
  {
    title: 'Role',
    dataIndex: 'role',
    sorter: (a, b) => a.role.localeCompare(b.role),
  },
];

const data = [
  {
    key: '0',
    id: '0',
    firstName: 'Matt',
    lastName: 'Mercer',
    organization: 'Critical Role',
    role: 'Dungeon Master',
  },
  {
    key: '1',
    id: '1',
    firstName: 'Laura',
    lastName: 'Bailey',
    organization: 'Critical Role',
    role: 'Cleric',
  },
  {
    key: '2',
    id: '2',
    firstName: 'Travis',
    lastName: 'Willingham',
    organization: 'Critical Role',
    role: 'Warlock',
  },
  {
    key: '3',
    id: '3',
    firstName: 'Philip',
    lastName: 'Defranco',
    organization: 'Rogue Rocket',
    role: 'Host',
  },
  {
    key: '4',
    id: '4',
    firstName: 'Liam',
    lastName: "O'Brian",
    organization: 'Critical Role',
    role: 'Wizard',
  },
];

export default function Employees() {
  return (
    <div className="card-ctn">
      <h2>Employees</h2>
      <Table columns={columns} dataSource={data}/>
    </div>
  );
}
