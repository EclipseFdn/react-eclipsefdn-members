import React, { useState } from 'react';
import FloatingInput from '../../sharedComponents/FloatingInput';
import { Card } from 'antd';
import './organization.css';

const organizationBasic = [
  {
    label: 'Organization Name',
    tagName: 'organization-name',
    description: 'Legal name of the organization',
  },
  {
    label: 'Organization ID',
    tagName: 'organization-id',
    description: 'The internal ID of the organization',
  },
];

const organizationLocation = [
  {
    label: 'Organization Street Address',
    tagName: 'organization-street-address',
    description: 'The physical location of the organization',
  },
  {
    label: 'Organization Postal/ZIP code',
    tagName: 'organization-postal-code',
    description: 'The postal or Zip code for the organization',
  },
  {
    label: 'Organization City',
    tagName: 'organization-city',
    description: 'The origin city of the organization',
  },
];

export default function Organization() {
  const { Meta } = Card;
  const renderInputList = (inputList) => {
    return inputList.map((input, index) => (
      <FloatingInput
        label={input.label}
        tagName={input.tagName}
        description={input.description}
        key={index}
      />
    ));
  };

  return (
    <div className="card-ctn organization-card">
      <h2>Organization</h2>
      <div className="organization-main-content">
        <div className="organization-form">
          <div className="organization-basic">
            {renderInputList(organizationBasic)}
          </div>

          <p className="cut-off-line"></p>

          <div className="organization-location">
            {renderInputList(organizationLocation)}
          </div>
        </div>

        <div className="organization-logo">
          <Card
            hoverable
            style={{ width: 'clamp(200px, 100%, 300px)' }}
            cover={<img alt="example" src="https://via.placeholder.com/512" />}
          >
            <Meta title="Logo" description="lorem lorem" />
          </Card>
        </div>
      </div>
    </div>
  );
}
